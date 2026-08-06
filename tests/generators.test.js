/**
 * Testes dos geradores.
 *
 * Cobrem as garantias pedagógicas que o código antigo não tinha como
 * assegurar: nada de resultado negativo, nada acima do teto combinado,
 * exatamente uma alternativa correta, e a mesma semente produzindo a mesma
 * sessão — sem o que nenhum erro relatado seria reproduzível.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { criarRandom, embaralhar } from '../src/core/rng.js';
import {
  gerarLetras,
  gerarNumeros,
  gerarSomas,
  gerarSubtracoes,
  gerarVogaisAuditivas,
} from '../src/generators/index.js';

const semente = () => criarRandom(20260805);

test('números respeitam mínimo e máximo, ambos inclusivos', () => {
  const q = gerarNumeros({ min: 1, max: 5, modo: 'sequencial', limite: 99, random: semente() });
  assert.deepEqual(q.map((x) => x.valor), [1, 2, 3, 4, 5]);
});

test('a sessão nunca passa do limite pedido', () => {
  const q = gerarNumeros({ min: 1, max: 30, modo: 'sequencial', limite: 8, random: semente() });
  assert.equal(q.length, 8);
});

test('modo sequencial preserva a ordem; aleatório embaralha', () => {
  const base = { min: 1, max: 10, limite: 10 };
  const seq = gerarNumeros({ ...base, modo: 'sequencial', random: semente() });
  const ale = gerarNumeros({ ...base, modo: 'aleatorio', random: semente() });
  assert.deepEqual(seq.map((x) => x.valor), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.notDeepEqual(ale.map((x) => x.valor), seq.map((x) => x.valor));
  assert.deepEqual([...ale.map((x) => x.valor)].sort((a, b) => a - b), seq.map((x) => x.valor));
});

test('adição calcula o resultado sem eval e nunca passa de 10', () => {
  for (const op of [1, 2, 3, 'misto']) {
    for (const q of gerarSomas({ op, modo: 'sequencial', limite: 99, random: semente() })) {
      const { esquerda, direita } = q.enunciado;
      assert.equal(q.valor, esquerda + direita);
      assert.ok(q.valor <= 10, `resultado ${q.valor} passou de 10`);
    }
  }
});

test('subtração nunca produz resultado negativo', () => {
  for (const op of [1, 2, 3, 'misto']) {
    for (const q of gerarSubtracoes({ op, modo: 'sequencial', limite: 99, random: semente() })) {
      const { esquerda, direita } = q.enunciado;
      assert.equal(q.valor, esquerda - direita);
      assert.ok(q.valor >= 0, `resultado ${q.valor} ficou negativo`);
    }
  }
});

test('toda questão declara habilidade e áudio', () => {
  const todas = [
    ...gerarNumeros({ min: 1, max: 5, modo: 'sequencial', limite: 5, random: semente() }),
    ...gerarSomas({ op: 1, modo: 'sequencial', limite: 5, random: semente() }),
    ...gerarSubtracoes({ op: 1, modo: 'sequencial', limite: 5, random: semente() }),
    ...gerarLetras({ nivelId: 'vogais', modo: 'sequencial', limite: 5, random: semente() }),
    ...gerarVogaisAuditivas({ limite: 5, random: semente() }),
  ];
  for (const q of todas) {
    assert.ok(q.habilidade, 'questão sem habilidade');
    assert.ok(Array.isArray(q.audio) && q.audio.length > 0, 'questão sem áudio');
    assert.notEqual(q.valor, undefined, 'questão sem resposta');
  }
});

test('vogais auditivas têm 3 alternativas e exatamente uma correta', () => {
  const q = gerarVogaisAuditivas({ limite: 12, random: semente() });
  assert.equal(q.length, 12);
  for (const item of q) {
    const { opcoes } = item.resposta;
    assert.equal(opcoes.length, 3);
    assert.equal(new Set(opcoes).size, 3, 'alternativa repetida');
    assert.equal(opcoes.filter((o) => o === item.valor).length, 1);
  }
});

test('vogais auditivas cobrem as cinco antes de repetir qualquer uma', () => {
  const q = gerarVogaisAuditivas({ limite: 5, random: semente() });
  assert.equal(new Set(q.map((x) => x.valor)).size, 5);
});

test('a mesma semente produz a mesma sessão', () => {
  const a = gerarVogaisAuditivas({ limite: 8, random: criarRandom(42) });
  const b = gerarVogaisAuditivas({ limite: 8, random: criarRandom(42) });
  assert.deepEqual(a.map((x) => x.valor), b.map((x) => x.valor));
  assert.deepEqual(a.map((x) => x.resposta.opcoes), b.map((x) => x.resposta.opcoes));
});

test('embaralhar não perde nem duplica itens', () => {
  const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const misturado = embaralhar(original, criarRandom(7));
  assert.equal(misturado.length, original.length);
  assert.deepEqual([...misturado].sort((a, b) => a - b), original);
  assert.deepEqual(original, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'a lista original foi modificada');
});

test('embaralhar não é enviesado como o sort antigo', () => {
  // Com sort(() => Math.random() - 0.5) a identidade aparece muito mais que o
  // esperado. Fisher-Yates deve manter a primeira posição bem distribuída.
  const contagem = new Map();
  for (let s = 0; s < 3000; s++) {
    const primeiro = embaralhar([1, 2, 3, 4, 5], criarRandom(s))[0];
    contagem.set(primeiro, (contagem.get(primeiro) ?? 0) + 1);
  }
  for (const [, n] of contagem) {
    assert.ok(n > 450 && n < 750, `distribuição desequilibrada: ${n} de 3000 (esperado ~600)`);
  }
});
