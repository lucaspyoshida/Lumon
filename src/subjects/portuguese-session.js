/**
 * Sessão da Etapa 1 de Português.
 *
 * O núcleo de sessão existente é específico de matemática — ele chama os
 * geradores. Português não gera conteúdo: sorteia itens de um pacote
 * aprovado. Por isso a sessão é própria, mas o formato de tentativa é o
 * mesmo, para que a progressão e a revisão já existentes continuem valendo.
 *
 * Itens de transferência ficam de fora das duas primeiras sessões. Domínio
 * exige acertar pelo menos cinco deles, e só faz sentido chamar de domínio
 * o que a criança acerta em item que não praticou à exaustão.
 */

import { createSeededRandom, shuffle } from '../generators/random.js';

const SESSOES_ANTES_DE_TRANSFERIR = 2;

export function createPortugueseSession({
  pacote,
  skillId = 'P1.oral-vocabulary',
  count = 8,
  seed,
  sessoesConcluidas = 0,
  now = () => new Date().toISOString(),
}) {
  const random = createSeededRandom(seed);
  const doSkill = pacote.items.filter((item) => item.skillId === skillId);
  const permiteTransferencia = sessoesConcluidas >= SESSOES_ANTES_DE_TRANSFERIR;
  const elegiveis = permiteTransferencia
    ? doSkill
    : doSkill.filter((item) => item.transferRole !== 'transfer-candidate');

  const escolhidos = shuffle(random, elegiveis.length >= count ? elegiveis : doSkill).slice(0, count);
  const questoes = escolhidos.map((item) => ({
    item,
    options: shuffle(random, item.response.options),
  }));

  return {
    skillId,
    subjectId: 'portugues',
    seed,
    startedAt: now(),
    completed: false,
    source: 'lumon',
    packageVersion: pacote.packageVersion,
    contentVersion: pacote.contentVersion,
    index: 0,
    questoes,
    attempts: [],
    attemptNumber: 1,
  };
}

export const currentQuestion = (sessao) => sessao.questoes[sessao.index] ?? null;

/**
 * Registra uma tentativa já avaliada por `evaluatePortugueseAttempt`.
 * Uma questão só vira tentativa contabilizada uma vez: repetir depois de
 * errar é aprendizado, não uma nova chance de pontuar.
 */
export function recordAttempt(sessao, avaliacao) {
  const questao = currentQuestion(sessao);
  if (!questao) return sessao;
  sessao.attempts.push({
    itemId: questao.item.id,
    skillId: sessao.skillId,
    correct: avaliacao.status === 'correct',
    countsForMastery: avaliacao.countsForMastery,
    countsForReview: avaliacao.countsForReview,
    transferRole: questao.item.transferRole,
    errorCode: avaliacao.errorCode ?? null,
    attemptNumber: sessao.attemptNumber,
  });
  return sessao;
}

export function moveToNext(sessao) {
  sessao.index += 1;
  sessao.attemptNumber = 1;
  return sessao;
}

export function completeSession(sessao, { now = () => new Date().toISOString() } = {}) {
  sessao.completed = true;
  sessao.finishedAt = now();
  return sessao;
}

export function summarize(sessao) {
  const primeiraTentativa = new Map();
  for (const tentativa of sessao.attempts) {
    if (!primeiraTentativa.has(tentativa.itemId)) primeiraTentativa.set(tentativa.itemId, tentativa);
  }
  const lista = [...primeiraTentativa.values()];
  return {
    total: sessao.questoes.length,
    acertos: lista.filter((t) => t.correct).length,
    erros: lista.filter((t) => !t.correct).length,
  };
}
