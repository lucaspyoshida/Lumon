import { FIRST_SKILL_ID } from '../config/levels.js';
import { createProgress } from '../core/progression.js';
import { createPortugueseSubjectState } from '../subjects/portuguese.js';
import { createDefaultState as createDefaultV1State, isValidState as isValidV1State } from './repository.js';

export const SCHEMA_VERSION_V2 = 2;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mathEnvelopeFromV1(value) {
  return {
    schemaVersion: 1,
    profile: {
      id: value.profile.id,
      displayName: value.profile.displayName,
      currentSkillId: value.profile.currentSkillId,
      createdAt: value.profile.createdAt,
    },
    progress: value.progress,
    preferences: value.preferences,
    activeSession: value.activeSession,
  };
}

export function createDefaultV2State(now = () => new Date().toISOString()) {
  return migrateV1ToV2(createDefaultV1State(now), { now, sourceSha256: null });
}

export function migrateV1ToV2(v1, {
  now = () => new Date().toISOString(),
  sourceSha256 = null,
} = {}) {
  if (!isValidV1State(v1)) throw new TypeError('Estado V1 inválido para migração');
  const migratedAt = now();
  return {
    schemaVersion: SCHEMA_VERSION_V2,
    revision: 0,
    profile: {
      id: v1.profile.id,
      displayName: v1.profile.displayName,
      createdAt: v1.profile.createdAt,
      currentSubjectId: 'matematica',
      currentSkillBySubject: {
        matematica: v1.profile.currentSkillId,
        portugues: null,
      },
    },
    subjects: {
      matematica: {
        progressSchemaVersion: 1,
        moduleContractVersion: 1,
        progress: clone(v1.progress),
        activeSession: clone(v1.activeSession),
      },
      portugues: createPortugueseSubjectState(),
    },
    preferences: clone(v1.preferences),
    migration: {
      migrationId: 'lumon-v1-to-v2',
      migratorVersion: 1,
      sourceKey: 'lumon-state-v1',
      sourceSchemaVersion: 1,
      sourceSha256,
      targetSchemaVersion: SCHEMA_VERSION_V2,
      status: 'committed',
      migratedAt,
    },
    updatedAt: migratedAt,
  };
}

export function mathematicsAsV1(state) {
  if (!state?.subjects?.matematica) return null;
  return mathEnvelopeFromV1({
    profile: {
      id: state.profile.id,
      displayName: state.profile.displayName,
      createdAt: state.profile.createdAt,
      currentSkillId: state.profile.currentSkillBySubject.matematica,
    },
    progress: state.subjects.matematica.progress,
    preferences: state.preferences,
    activeSession: state.subjects.matematica.activeSession,
  });
}

export function isValidV2State(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  if (value.schemaVersion !== SCHEMA_VERSION_V2 || !Number.isInteger(value.revision) || value.revision < 0) return false;
  if (!value.profile || value.profile.id !== 'local-child') return false;
  if (!['matematica', 'portugues'].includes(value.profile.currentSubjectId)) return false;
  if (!value.profile.currentSkillBySubject || value.profile.currentSkillBySubject.portugues !== null) return false;
  const mathV1 = mathematicsAsV1(value);
  if (!mathV1 || !isValidV1State(mathV1)) return false;
  const portuguese = value.subjects?.portugues;
  return Boolean(
    portuguese
    && portuguese.progressSchemaVersion === 1
    && portuguese.moduleContractVersion === 1
    // O estado de conteúdo deixou de ser sempre "bloqueado": a Etapa 1 tem
    // pacote publicado. Os dois valores continuam válidos porque o aparelho
    // da criança já tem estado salvo com "blocked-content", e recusá-lo aqui
    // apagaria o progresso de matemática junto.
    && ['blocked-content', 'ready'].includes(portuguese.contentStatus?.state)
    && Array.isArray(portuguese.contentStatus.reasons)
    && Array.isArray(portuguese.progress?.completedSessions)
    && Array.isArray(portuguese.progress?.reviewQueue)
  );
}

export function createResetV2State(current, now = () => new Date().toISOString()) {
  const reset = createDefaultV2State(now);
  reset.revision = current.revision;
  reset.profile.createdAt = current.profile.createdAt;
  reset.preferences = clone(current.preferences);
  reset.subjects.matematica.progress = createProgress();
  reset.profile.currentSkillBySubject.matematica = FIRST_SKILL_ID;
  reset.migration = clone(current.migration);
  return reset;
}
