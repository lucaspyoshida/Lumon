export const PORTUGUESE_SUBJECT_ID = 'portugues';
export const PORTUGUESE_STAGE_ONE_ID = 'palavra-imagem-som';
export const PORTUGUESE_PACKAGE_ID = 'portugues-etapa-1';

export const PORTUGUESE_SKILLS = Object.freeze([
  Object.freeze({ id: 'P1.oral-vocabulary', stageId: PORTUGUESE_STAGE_ONE_ID }),
  Object.freeze({ id: 'P1.visual-word', stageId: PORTUGUESE_STAGE_ONE_ID }),
  Object.freeze({ id: 'P1.letter-in-context', stageId: PORTUGUESE_STAGE_ONE_ID }),
  Object.freeze({ id: 'P1.supported-typing', stageId: PORTUGUESE_STAGE_ONE_ID }),
]);

export const PORTUGUESE_CONTENT_BLOCK = Object.freeze({
  state: 'blocked-content',
  packageId: PORTUGUESE_PACKAGE_ID,
  packageVersion: null,
  contentVersion: null,
  reasons: Object.freeze([
    'audio-editorial-pt-br-nao-aprovado',
    'imagens-pedagogicas-nao-aprovadas',
    'microcorpus-etapa-1-nao-publicado',
  ]),
});

export function createPortugueseProgress() {
  return {
    completedSessions: [],
    skillMastery: {},
    weakItems: {},
    reviewQueue: [],
    unlockedSkills: ['P1.oral-vocabulary'],
    manualUnlocked: [],
    masteryRulesVersion: 'pt-stage1-v1',
  };
}

export function createPortugueseSubjectState() {
  return {
    progressSchemaVersion: 1,
    moduleContractVersion: 1,
    contentStatus: { ...PORTUGUESE_CONTENT_BLOCK, reasons: [...PORTUGUESE_CONTENT_BLOCK.reasons] },
    progress: createPortugueseProgress(),
    activeSession: null,
  };
}

export function canStartPortugueseSession(subjectState) {
  return subjectState?.contentStatus?.state === 'ready'
    && typeof subjectState.contentStatus.packageVersion === 'string'
    && typeof subjectState.contentStatus.contentVersion === 'string';
}

function normalizeText(value, rules = {}) {
  if (typeof value !== 'string') return null;
  let normalized = value.normalize('NFC');
  if (rules.trim !== false) normalized = normalized.trim();
  if (rules.collapseSpaces) normalized = normalized.replace(/\s+/g, ' ');
  if (rules.caseSensitive !== true) normalized = normalized.toLocaleLowerCase('pt-BR');
  return normalized;
}

export function evaluatePortugueseAttempt({
  item,
  rawResponse,
  attemptNumber = 1,
  supportLevel = 'none',
  assetState = 'available',
} = {}) {
  if (!item || item.approvalState !== 'approved' || assetState !== 'available') {
    return {
      status: 'invalid',
      errorCode: assetState === 'available' ? 'E-CONT' : 'E-AUDIO',
      countsForMastery: false,
      countsForReview: false,
      feedbackEvent: 'technical-unavailable',
    };
  }
  const responseType = item.response?.type;
  let correct = false;
  let normalizedResponse = rawResponse;
  if (responseType === 'choice') {
    correct = typeof rawResponse === 'string' && rawResponse === item.answer;
  } else if (responseType === 'text-input') {
    normalizedResponse = normalizeText(rawResponse, item.normalization);
    correct = normalizedResponse !== null
      && item.acceptedAnswers.some((answer) => normalizeText(answer, item.normalization) === normalizedResponse);
  } else {
    return {
      status: 'invalid', errorCode: 'E-CONT', countsForMastery: false,
      countsForReview: false, feedbackEvent: 'technical-unavailable',
    };
  }
  const independent = supportLevel === 'none' && attemptNumber <= 2;
  return {
    status: correct ? 'correct' : 'incorrect',
    normalizedResponse,
    dimensions: responseType === 'choice'
      ? { meaning: correct ? 'met' : 'not-met', typing: 'not-evaluated' }
      : { meaning: correct ? 'met' : 'not-met', typing: 'met' },
    errorCode: correct ? undefined : responseType === 'choice' ? 'E-SEM' : 'E-ORT',
    countsForMastery: correct && independent,
    countsForReview: !correct || !independent,
    feedbackEvent: correct ? 'celebrate' : attemptNumber === 1 ? 'retry' : 'hint',
  };
}

export function evaluatePortugueseMastery(sessions, skillId) {
  const recent = sessions.filter((session) => (
    session.skillId === skillId && session.completed && session.source === 'lumon'
  )).slice(-3);
  const attempts = recent.flatMap((session) => session.attempts ?? [])
    .filter((attempt) => attempt.countsForMastery);
  const distinctTransfers = new Set(attempts
    .filter((attempt) => attempt.transferRole === 'transfer-candidate' && attempt.correct)
    .map((attempt) => attempt.itemId));
  const accuracy = attempts.length
    ? attempts.filter((attempt) => attempt.correct).length / attempts.length
    : 0;
  return {
    mastered: recent.length >= 3 && attempts.length >= 20 && distinctTransfers.size >= 5 && accuracy >= 0.9,
    completedSessions: recent.length,
    eligibleAttempts: attempts.length,
    transferItems: distinctTransfers.size,
    accuracy,
    masteryRulesVersion: 'pt-stage1-v1',
  };
}

export function planPortugueseReview(attempt, now = Date.now()) {
  if (!attempt || attempt.status === 'invalid' || attempt.status === 'inconclusive') return null;
  if (attempt.status === 'correct' && attempt.supportLevel === 'none') return null;
  return {
    skillId: attempt.skillId,
    itemId: attempt.itemId,
    errorCode: attempt.errorCode ?? 'E-SEM',
    dueAt: new Date(now + 24 * 60 * 60 * 1000).toISOString(),
    step: '1d',
    state: 'due',
  };
}
