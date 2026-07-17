import { generateQuestions } from '../generators/index.js';

export function createSession({ skillId, count, seed, reviewItems = [], now = () => new Date().toISOString() }) {
  return {
    id: `${skillId}-${seed}`,
    skillId,
    mode: reviewItems.length ? 'review' : 'practice',
    seed: String(seed),
    questions: generateQuestions({ skillId, count, seed, reviewItems }),
    currentIndex: 0,
    answers: [],
    startedAt: now(),
    questionStartedAt: Date.now(),
  };
}

export function answerCurrentQuestion(session, response, durationMs = null) {
  if (!session || session.currentIndex >= session.questions.length) return session;
  if (session.answers.length > session.currentIndex) return session;
  const question = session.questions[session.currentIndex];
  const normalize = (value) => {
    if (Array.isArray(value)) return value.every((item) => Number.isFinite(Number(item))) ? value.map(Number).join('|') : 'invalid';
    if (value === '' || value === null || value === undefined || !Number.isFinite(Number(value))) return 'invalid';
    return String(Number(value));
  };
  const correct = normalize(response) === normalize(question.answer);
  return {
    ...session,
    answers: [...session.answers, {
      questionId: question.id,
      itemKey: question.metadata.itemKey,
      response,
      answer: question.answer,
      correct,
      durationMs: Number.isFinite(durationMs) ? Math.max(0, Math.round(durationMs)) : null,
    }],
  };
}

export function moveToNextQuestion(session) {
  return {
    ...session,
    currentIndex: Math.min(session.questions.length, session.currentIndex + 1),
    questionStartedAt: Date.now(),
  };
}

export function completeSession(session, { abandoned = false, now = () => new Date().toISOString() } = {}) {
  return {
    id: session.id,
    skillId: session.skillId,
    mode: session.mode,
    seed: session.seed,
    answers: session.answers,
    startedAt: session.startedAt,
    finishedAt: now(),
    completed: !abandoned && session.answers.length === session.questions.length,
    abandoned,
  };
}
