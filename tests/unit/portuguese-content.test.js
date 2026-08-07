import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { audioRef, loadPortugueseContent } from '../../src/subjects/portuguese-content.js';
import { evaluatePortugueseAttempt, evaluatePortugueseMastery } from '../../src/subjects/portuguese.js';
import {
  completeSession,
  createPortugueseSession,
  currentQuestion,
  moveToNext,
  recordAttempt,
  summarize,
} from '../../src/subjects/portuguese-session.js';

const pacoteReal = JSON.parse(await readFile('content/portugues/etapa-1/package.json', 'utf8'));
const fetchDe = (corpo, ok = true) => async () => ({ ok, json: async () => corpo });
const carregar = (corpo, ok = true) => loadPortugueseContent(fetchDe(corpo, ok), 'https://exemplo/Lumon/');

test('o pacote publicado é aceito e destrava a etapa', async () => {
  const { contentStatus, pacote } = await carregar(pacoteReal);
  assert.equal(contentStatus.state, 'ready');
  assert.equal(contentStatus.reasons.length, 0);
  assert.equal(typeof contentStatus.packageVersion, 'string');
  assert.equal(typeof contentStatus.contentVersion, 'string');
  assert.ok(pacote.items.length >= 12);
});

test('pacote ausente mantém a etapa bloqueada com motivo declarado', async () => {
  const { contentStatus, pacote } = await carregar(null, false);
  assert.equal(contentStatus.state, 'blocked-content');
  assert.deepEqual(contentStatus.reasons, ['microcorpus-etapa-1-nao-publicado']);
  assert.equal(pacote, null);
});

test('item sem aprovação é descartado e pode bloquear a etapa', async () => {
  const adulterado = { ...pacoteReal, items: pacoteReal.items.map((i) => ({ ...i, approvalState: 'draft' })) };
  const { contentStatus } = await carregar(adulterado);
  assert.equal(contentStatus.state, 'blocked-content');
  assert.ok(contentStatus.reasons.includes('microcorpus-etapa-1-nao-publicado'));
});

test('áudio sem licença declarada bloqueia por motivo editorial', async () => {
  const { contentStatus } = await carregar({ ...pacoteReal, voice: { origin: 'sintetizado' } });
  assert.ok(contentStatus.reasons.includes('audio-editorial-pt-br-nao-aprovado'));
});

test('imagens sem licença declarada bloqueiam a etapa', async () => {
  const { contentStatus } = await carregar({ ...pacoteReal, images: {} });
  assert.ok(contentStatus.reasons.includes('imagens-pedagogicas-nao-aprovadas'));
});

test('todo item tem a resposta entre as alternativas', () => {
  for (const item of pacoteReal.items) {
    assert.ok(
      item.response.options.some((o) => o.id === item.answer),
      `item ${item.id} não oferece a própria resposta`,
    );
    assert.equal(new Set(item.response.options.map((o) => o.id)).size, item.response.options.length);
  }
});

test('a referência de áudio sai no formato que o controlador exige', () => {
  const ref = audioRef(pacoteReal, 'palavra/bola', 'https://exemplo/Lumon/');
  assert.equal(ref.approvalState, 'approved');
  assert.equal(ref.url, 'https://exemplo/Lumon/audio/pt/palavra/bola.m4a');
});

test('as duas primeiras sessões não usam itens de transferência', () => {
  for (const concluidas of [0, 1]) {
    const sessao = createPortugueseSession({
      pacote: pacoteReal, count: 8, seed: 'x', sessoesConcluidas: concluidas,
    });
    const transferidos = sessao.questoes.filter((q) => q.item.transferRole === 'transfer-candidate');
    assert.equal(transferidos.length, 0, `sessão ${concluidas} usou item de transferência`);
  }
});

test('a partir da terceira sessão os itens de transferência entram', () => {
  const sessao = createPortugueseSession({
    pacote: pacoteReal, count: 24, seed: 'y', sessoesConcluidas: 3,
  });
  assert.ok(sessao.questoes.some((q) => q.item.transferRole === 'transfer-candidate'));
});

test('a mesma semente produz a mesma sessão', () => {
  const base = { pacote: pacoteReal, count: 8, seed: 'igual', sessoesConcluidas: 0 };
  const a = createPortugueseSession(base);
  const b = createPortugueseSession(base);
  assert.deepEqual(a.questoes.map((q) => q.item.id), b.questoes.map((q) => q.item.id));
  assert.deepEqual(
    a.questoes.map((q) => q.options.map((o) => o.id)),
    b.questoes.map((q) => q.options.map((o) => o.id)),
  );
});

test('acerto na primeira tentativa conta para domínio; na terceira, não', () => {
  const item = pacoteReal.items[0];
  const primeira = evaluatePortugueseAttempt({ item, rawResponse: item.answer, attemptNumber: 1 });
  assert.equal(primeira.status, 'correct');
  assert.equal(primeira.countsForMastery, true);

  const terceira = evaluatePortugueseAttempt({ item, rawResponse: item.answer, attemptNumber: 3 });
  assert.equal(terceira.status, 'correct');
  assert.equal(terceira.countsForMastery, false);
});

test('uma sessão inteira acumula tentativas e resume acertos', () => {
  const sessao = createPortugueseSession({ pacote: pacoteReal, count: 4, seed: 'z', sessoesConcluidas: 0 });
  while (currentQuestion(sessao)) {
    const questao = currentQuestion(sessao);
    const avaliacao = evaluatePortugueseAttempt({
      item: questao.item, rawResponse: questao.item.answer, attemptNumber: 1,
    });
    recordAttempt(sessao, avaliacao);
    if (sessao.index === sessao.questoes.length - 1) break;
    moveToNext(sessao);
  }
  completeSession(sessao);
  const resumo = summarize(sessao);
  assert.equal(resumo.total, 4);
  assert.equal(resumo.acertos, 4);
  assert.equal(sessao.completed, true);
});

test('domínio exige três sessões, vinte tentativas e cinco transferências', () => {
  const fazerSessao = (itens) => ({
    skillId: 'P1.oral-vocabulary', completed: true, source: 'lumon',
    attempts: itens.map((item) => ({
      itemId: item.id, correct: true, countsForMastery: true, transferRole: item.transferRole,
    })),
  });
  const nucleo = pacoteReal.items.filter((i) => i.transferRole === 'core').slice(0, 8);
  const transfer = pacoteReal.items.filter((i) => i.transferRole === 'transfer-candidate').slice(0, 8);

  const insuficiente = [fazerSessao(nucleo), fazerSessao(nucleo), fazerSessao(nucleo)];
  assert.equal(evaluatePortugueseMastery(insuficiente, 'P1.oral-vocabulary').mastered, false);

  const suficiente = [fazerSessao(nucleo), fazerSessao(transfer), fazerSessao([...nucleo, ...transfer])];
  const resultado = evaluatePortugueseMastery(suficiente, 'P1.oral-vocabulary');
  assert.equal(resultado.mastered, true);
  assert.ok(resultado.transferItems >= 5);
});
