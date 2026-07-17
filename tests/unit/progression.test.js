import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createProgress,
  evaluateMastery,
  getRecommendation,
  getReviewItems,
  isSkillUnlocked,
  manuallyUnlock,
  recordSession,
} from '../../src/core/progression.js';

function session(skillId, index, results, { abandoned = false } = {}) {
  return {
    id: `${skillId}-${index}`,
    skillId,
    answers: results.map((correct, answerIndex) => ({ questionId: `${index}-${answerIndex}`, itemKey: 'item-repetido', correct })),
    startedAt: `2026-07-17T00:0${index}:00Z`,
    finishedAt: `2026-07-17T00:0${index}:30Z`,
    completed: !abandoned,
    abandoned,
  };
}

test('domínio exige três sessões recentes e média mínima', () => {
  let progress = createProgress();
  progress = recordSession(progress, session('number.find.1-10', 1, Array(10).fill(true)));
  progress = recordSession(progress, session('number.find.1-10', 2, Array(10).fill(true)));
  assert.equal(evaluateMastery(progress, 'number.find.1-10').mastered, false);
  progress = recordSession(progress, session('number.find.1-10', 3, [false, ...Array(9).fill(true)]));
  const mastery = evaluateMastery(progress, 'number.find.1-10');
  assert.equal(mastery.mastered, true);
  assert.ok(mastery.averageAccuracy >= 0.9);
  assert.ok(mastery.maxItemErrorRate <= 0.3);
});

test('erro frequente em um item bloqueia avanço mesmo com 90%', () => {
  let progress = createProgress();
  for (let index = 1; index <= 3; index += 1) {
    const answers = Array.from({ length: 10 }, (_, answerIndex) => ({
      questionId: `${index}-${answerIndex}`,
      itemKey: answerIndex === 0 ? 'fraco' : `${index}-${answerIndex}`,
      correct: answerIndex !== 0,
    }));
    progress = recordSession(progress, {
      id: `s-${index}`, skillId: 'number.find.1-10', answers,
      startedAt: 'a', finishedAt: 'b', completed: true, abandoned: false,
    });
  }
  const mastery = evaluateMastery(progress, 'number.find.1-10');
  assert.equal(mastery.averageAccuracy, 0.9);
  assert.equal(mastery.mastered, false);
  assert.equal(mastery.maxItemErrorRate, 1);
});

test('abandono recorrente impede domínio', () => {
  let progress = createProgress();
  for (let index = 1; index <= 3; index += 1) progress = recordSession(progress, session('number.find.1-10', index, Array(10).fill(true)));
  progress = recordSession(progress, session('number.find.1-10', 4, [], { abandoned: true }));
  progress = recordSession(progress, session('number.find.1-10', 5, [], { abandoned: true }));
  assert.equal(evaluateMastery(progress, 'number.find.1-10').mastered, false);
});

test('desbloqueio manual prevalece e recomendações usam linguagem de avanço ou revisão', () => {
  let progress = createProgress();
  assert.equal(isSkillUnlocked(progress, 'subtraction.minus-1'), false);
  progress = manuallyUnlock(progress, 'subtraction.minus-1');
  assert.equal(isSkillUnlocked(progress, 'subtraction.minus-1'), true);
  progress = recordSession(progress, session('subtraction.minus-1', 1, [false, true, true]));
  assert.deepEqual(getReviewItems(progress, 'subtraction.minus-1'), ['item-repetido']);
  assert.equal(getRecommendation(progress, 'subtraction.minus-1').type, 'review');
});
