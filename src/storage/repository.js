import { ALL_SKILLS, FIRST_SKILL_ID } from '../config/levels.js';
import { createProgress } from '../core/progression.js';

export const STORAGE_KEY = 'lumon-state-v1';
export const LEGACY_KEY = 'lumon-last-settings';
export const LEGACY_BACKUP_KEY = 'lumon-legacy-backup';
export const CORRUPT_BACKUP_KEY = 'lumon-corrupt-backup';
export const SCHEMA_VERSION = 1;

export function createDefaultState(now = () => new Date().toISOString()) {
  return {
    schemaVersion: SCHEMA_VERSION,
    profile: { id: 'local-child', displayName: '', currentSkillId: FIRST_SKILL_ID, createdAt: now() },
    progress: createProgress(),
    preferences: { sessionLength: 10, reducedMotion: false, highContrast: false, recordResponseTime: false },
    activeSession: null,
  };
}

function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function isValidState(value) {
  const knownSkillIds = new Set(ALL_SKILLS.map((skill) => skill.id));
  const validActiveSession = value?.activeSession === null || (
    isRecord(value?.activeSession)
    && knownSkillIds.has(value.activeSession.skillId)
    && Array.isArray(value.activeSession.questions)
    && value.activeSession.questions.length >= 5
    && value.activeSession.questions.length <= 15
    && Number.isInteger(value.activeSession.currentIndex)
    && value.activeSession.currentIndex >= 0
    && value.activeSession.currentIndex < value.activeSession.questions.length
    && Array.isArray(value.activeSession.answers)
    && value.activeSession.answers.length <= value.activeSession.questions.length
  );
  return isRecord(value)
    && value.schemaVersion === SCHEMA_VERSION
    && isRecord(value.profile)
    && knownSkillIds.has(value.profile.currentSkillId)
    && isRecord(value.progress)
    && Array.isArray(value.progress.completedSessions)
    && isRecord(value.progress.skillMastery)
    && isRecord(value.progress.weakItems)
    && Array.isArray(value.progress.unlockedSkills)
    && Array.isArray(value.progress.manualUnlocked)
    && value.progress.unlockedSkills.every((skillId) => knownSkillIds.has(skillId))
    && value.progress.manualUnlocked.every((skillId) => knownSkillIds.has(skillId))
    && isRecord(value.preferences)
    && [5, 10, 15].includes(Number(value.preferences.sessionLength))
    && validActiveSession;
}

function legacySkillId(settings) {
  if (!isRecord(settings)) return FIRST_SKILL_ID;
  if (settings.atividade === 'somas') return 'addition.plus-1';
  if (settings.atividade === 'subtracoes') return 'subtraction.minus-1';
  if (settings.atividade === 'numeros') {
    const maximum = Number(settings.nivel?.max ?? 10);
    if (maximum > 30) return 'number.find.31-50';
    if (maximum > 10) return 'number.find.11-30';
  }
  return FIRST_SKILL_ID;
}

function migrateLegacy(storage, defaults) {
  const raw = storage.getItem(LEGACY_KEY);
  if (!raw) return defaults;
  storage.setItem(LEGACY_BACKUP_KEY, raw);
  try {
    const settings = JSON.parse(raw);
    const skillId = legacySkillId(settings);
    defaults.profile.currentSkillId = ALL_SKILLS.some((skill) => skill.id === skillId) ? skillId : FIRST_SKILL_ID;
    defaults.progress.manualUnlocked = skillId === FIRST_SKILL_ID ? [] : [skillId];
    return defaults;
  } catch {
    storage.setItem(CORRUPT_BACKUP_KEY, raw);
    return defaults;
  }
}

export function loadState(storage = globalThis.localStorage, now = () => new Date().toISOString()) {
  const defaults = createDefaultState(now);
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return migrateLegacy(storage, defaults);
  try {
    const parsed = JSON.parse(raw);
    if (!isValidState(parsed)) throw new Error('schema inválido');
    return parsed;
  } catch {
    storage.setItem(CORRUPT_BACKUP_KEY, raw);
    return defaults;
  }
}

export function saveState(state, storage = globalThis.localStorage) {
  if (!isValidState(state)) throw new TypeError('Estado do Lumon inválido');
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

export function importState(raw, storage = globalThis.localStorage) {
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
  if (!isValidState(parsed)) throw new TypeError('Backup incompatível com o Lumon');
  saveState(parsed, storage);
  return parsed;
}

export function clearLumonData(storage = globalThis.localStorage) {
  const keys = [];
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (key?.startsWith('lumon-')) keys.push(key);
  }
  keys.forEach((key) => storage.removeItem(key));
}
