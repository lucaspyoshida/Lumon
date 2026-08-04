import { ALL_SKILLS, STAGES } from '../config/levels.js';
import {
  PORTUGUESE_SKILLS,
  PORTUGUESE_SUBJECT_ID,
  canStartPortugueseSession,
  createPortugueseSubjectState,
  evaluatePortugueseAttempt,
  evaluatePortugueseMastery,
  planPortugueseReview,
} from './portuguese.js';

export const MATHEMATICS_SUBJECT_ID = 'matematica';

const mathematics = Object.freeze({
  subjectId: MATHEMATICS_SUBJECT_ID,
  moduleContractVersion: 1,
  progressSchemaVersion: 1,
  contentVersion: 'math-v1-preserved',
  listStages: () => STAGES,
  getSkill: (skillId) => ALL_SKILLS.find((skill) => skill.id === skillId) ?? null,
});

const portuguese = Object.freeze({
  subjectId: PORTUGUESE_SUBJECT_ID,
  moduleContractVersion: 1,
  progressSchemaVersion: 1,
  contentVersion: null,
  listStages: () => [{ id: 'palavra-imagem-som', skills: PORTUGUESE_SKILLS }],
  getSkill: (skillId) => PORTUGUESE_SKILLS.find((skill) => skill.id === skillId) ?? null,
  createInitialState: createPortugueseSubjectState,
  canStartSession: canStartPortugueseSession,
  evaluate: evaluatePortugueseAttempt,
  evaluateMastery: evaluatePortugueseMastery,
  planReview: planPortugueseReview,
});

const MODULES = new Map([
  [mathematics.subjectId, mathematics],
  [portuguese.subjectId, portuguese],
]);

export function getSubjectModule(subjectId) {
  return MODULES.get(subjectId) ?? null;
}

export function listSubjectModules() {
  return [...MODULES.values()];
}
