import test from 'node:test';
import assert from 'node:assert/strict';
import { createProgress, evaluateMastery, isSkillUnlocked, recordSession } from '../../src/core/progression.js';
import { answerCurrentQuestion, completeSession, createSession, moveToNextQuestion } from '../../src/core/session.js';

test('sessão percorre resposta, avanço e conclusão sem aceitar clique repetido', () => {
  let session = createSession({ skillId: 'number.find.1-10', count: 5, seed: 'integracao' });
  const firstAnswer = session.questions[0].answer;
  session = answerCurrentQuestion(session, firstAnswer, 100);
  session = answerCurrentQuestion(session, -999, 200);
  assert.equal(session.answers.length, 1);
  assert.equal(session.answers[0].correct, true);
  session = moveToNextQuestion(session);
  assert.equal(session.currentIndex, 1);
  const abandoned = completeSession(session, { abandoned: true, now: () => 'fim' });
  assert.equal(abandoned.completed, false);
  assert.equal(abandoned.abandoned, true);
});

test('três sessões excelentes desbloqueiam a habilidade seguinte', () => {
  let progress = createProgress();
  for (let run = 0; run < 3; run += 1) {
    let session = createSession({ skillId: 'number.find.1-10', count: 10, seed: `run-${run}` });
    for (let index = 0; index < session.questions.length; index += 1) {
      session = answerCurrentQuestion(session, session.questions[index].answer);
      if (index < session.questions.length - 1) session = moveToNextQuestion(session);
    }
    progress = recordSession(progress, completeSession(session, { now: () => `fim-${run}` }));
  }
  assert.equal(evaluateMastery(progress, 'number.find.1-10').mastered, true);
  assert.equal(isSkillUnlocked(progress, 'number.quantity.1-10'), true);
});
