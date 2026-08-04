import test from 'node:test';
import assert from 'node:assert/strict';
import {
  canStartPortugueseSession,
  createPortugueseSubjectState,
  evaluatePortugueseAttempt,
  evaluatePortugueseMastery,
  planPortugueseReview,
} from '../../src/subjects/portuguese.js';

const approvedChoice = {
  approvalState: 'approved', response: { type: 'choice' }, answer: 'imagem-gato',
};
const approvedTyping = {
  approvalState: 'approved', response: { type: 'text-input' }, acceptedAnswers: ['café'],
  normalization: { trim: true, caseSensitive: false },
};

test('conteúdo ausente bloqueia sessão e nunca vira erro infantil', () => {
  const state = createPortugueseSubjectState();
  assert.equal(canStartPortugueseSession(state), false);
  assert.deepEqual(evaluatePortugueseAttempt({ item: approvedChoice, rawResponse: 'imagem-gato', assetState: 'missing' }), {
    status: 'invalid', errorCode: 'E-AUDIO', countsForMastery: false,
    countsForReview: false, feedbackEvent: 'technical-unavailable',
  });
});

test('seleção e digitação têm avaliadores separados sem remover acento', () => {
  assert.equal(evaluatePortugueseAttempt({ item: approvedChoice, rawResponse: 'imagem-gato' }).status, 'correct');
  assert.equal(evaluatePortugueseAttempt({ item: approvedTyping, rawResponse: ' Café ' }).status, 'correct');
  const withoutAccent = evaluatePortugueseAttempt({ item: approvedTyping, rawResponse: 'cafe' });
  assert.equal(withoutAccent.status, 'incorrect');
  assert.equal(withoutAccent.errorCode, 'E-ORT');
});

test('ajuda não conta domínio e abre revisão em 1 dia', () => {
  const result = evaluatePortugueseAttempt({
    item: approvedTyping, rawResponse: 'café', attemptNumber: 3, supportLevel: 'hint',
  });
  assert.equal(result.status, 'correct');
  assert.equal(result.countsForMastery, false);
  assert.equal(result.countsForReview, true);
  const review = planPortugueseReview({
    ...result, skillId: 'P1.supported-typing', itemId: 'palavra-1', supportLevel: 'hint',
  }, Date.UTC(2026, 7, 4));
  assert.equal(review.step, '1d');
  assert.equal(review.dueAt, '2026-08-05T00:00:00.000Z');
});

test('uma sessão nunca libera domínio de Português', () => {
  const attempts = Array.from({ length: 20 }, (_, index) => ({
    itemId: `item-${index}`, correct: true, countsForMastery: true,
    transferRole: index < 5 ? 'transfer-candidate' : 'practiced',
  }));
  const oneSession = [{ skillId: 'P1.oral-vocabulary', completed: true, source: 'lumon', attempts }];
  assert.equal(evaluatePortugueseMastery(oneSession, 'P1.oral-vocabulary').mastered, false);
});
