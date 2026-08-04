import { STORAGE_KEY, isValidState as isValidV1State } from './repository.js';
import {
  createDefaultV2State,
  createResetV2State,
  isValidV2State,
  migrateV1ToV2,
} from './schema-v2.js';

export const DATABASE_NAME = 'lumon-local-v2';
export const DATABASE_VERSION = 1;
export const STATE_STORE = 'learnerState';
export const MIGRATION_STORE = 'migrationJournal';

const CURRENT_STATE_ID = 'current';
const BACKUP_ID = 'v1-backup';
const JOURNAL_ID = 'v1-v2';

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.addEventListener('success', () => resolve(request.result), { once: true });
    request.addEventListener('error', () => reject(request.error), { once: true });
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.addEventListener('complete', resolve, { once: true });
    transaction.addEventListener('abort', () => reject(transaction.error ?? new Error('Transação abortada')), { once: true });
    transaction.addEventListener('error', () => reject(transaction.error), { once: true });
  });
}

export async function sha256Hex(raw, cryptoApi = globalThis.crypto) {
  if (!cryptoApi?.subtle) throw new Error('SHA-256 indisponível');
  const bytes = new TextEncoder().encode(raw);
  const digest = await cryptoApi.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function openLumonDatabase(indexedDBFactory = globalThis.indexedDB) {
  if (!indexedDBFactory) return Promise.reject(new Error('IndexedDB indisponível'));
  return new Promise((resolve, reject) => {
    const request = indexedDBFactory.open(DATABASE_NAME, DATABASE_VERSION);
    request.addEventListener('upgradeneeded', () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STATE_STORE)) database.createObjectStore(STATE_STORE, { keyPath: 'id' });
      if (!database.objectStoreNames.contains(MIGRATION_STORE)) database.createObjectStore(MIGRATION_STORE, { keyPath: 'id' });
    });
    request.addEventListener('success', () => resolve(request.result), { once: true });
    request.addEventListener('error', () => reject(request.error), { once: true });
    request.addEventListener('blocked', () => reject(new Error('Atualização do armazenamento bloqueada')), { once: true });
  });
}

async function readStoredState(database) {
  const transaction = database.transaction(STATE_STORE, 'readonly');
  const record = await requestResult(transaction.objectStore(STATE_STORE).get(CURRENT_STATE_ID));
  await transactionDone(transaction);
  return record?.state ?? null;
}

async function commitInitialState(database, state, { rawV1 = null, sourceSha256 = null, sourceValid = false } = {}) {
  const transaction = database.transaction([STATE_STORE, MIGRATION_STORE], 'readwrite');
  const stateStore = transaction.objectStore(STATE_STORE);
  const migrationStore = transaction.objectStore(MIGRATION_STORE);
  const existingBackup = await requestResult(migrationStore.get(BACKUP_ID));
  if (existingBackup && existingBackup.sourceSha256 !== sourceSha256) {
    transaction.abort();
    throw new Error('Backup V1 divergente; migração bloqueada');
  }
  if (rawV1 !== null && !existingBackup) {
    migrationStore.put({ id: BACKUP_ID, raw: rawV1, sourceSha256, immutable: true });
  }
  migrationStore.put({
    id: JOURNAL_ID,
    migrationId: 'lumon-v1-to-v2',
    migratorVersion: 1,
    sourceKey: STORAGE_KEY,
    sourceSha256,
    sourceValid,
    targetSchemaVersion: 2,
    status: 'committed',
    targetRevision: state.revision,
    committedAt: state.updatedAt,
  });
  stateStore.put({ id: CURRENT_STATE_ID, state });
  await transactionDone(transaction);
  return state;
}

export async function loadV2State({
  indexedDBFactory = globalThis.indexedDB,
  storage = globalThis.localStorage,
  now = () => new Date().toISOString(),
  cryptoApi = globalThis.crypto,
} = {}) {
  const database = await openLumonDatabase(indexedDBFactory);
  try {
    const existing = await readStoredState(database);
    if (existing) {
      if (!isValidV2State(existing)) throw new Error('Estado V2 armazenado é inválido');
      return existing;
    }
    const rawV1 = storage?.getItem(STORAGE_KEY) ?? null;
    if (rawV1 === null) return await commitInitialState(database, createDefaultV2State(now));
    const sourceSha256 = await sha256Hex(rawV1, cryptoApi);
    let v1 = null;
    try {
      const candidate = JSON.parse(rawV1);
      if (isValidV1State(candidate)) v1 = candidate;
    } catch {
      v1 = null;
    }
    const state = v1
      ? migrateV1ToV2(v1, { now, sourceSha256 })
      : {
          ...createDefaultV2State(now),
          migration: {
            migrationId: 'lumon-v1-to-v2', migratorVersion: 1, sourceKey: STORAGE_KEY,
            sourceSchemaVersion: null, sourceSha256, targetSchemaVersion: 2,
            status: 'source-invalid', migratedAt: now(),
          },
        };
    return await commitInitialState(database, state, { rawV1, sourceSha256, sourceValid: Boolean(v1) });
  } finally {
    database.close();
  }
}

export async function saveV2State(next, {
  indexedDBFactory = globalThis.indexedDB,
  now = () => new Date().toISOString(),
} = {}) {
  if (!isValidV2State(next)) throw new TypeError('Estado V2 do Lumon inválido');
  const database = await openLumonDatabase(indexedDBFactory);
  try {
    const transaction = database.transaction(STATE_STORE, 'readwrite');
    const store = transaction.objectStore(STATE_STORE);
    const currentRecord = await requestResult(store.get(CURRENT_STATE_ID));
    const currentRevision = currentRecord?.state?.revision ?? -1;
    if (currentRevision !== next.revision) {
      transaction.abort();
      throw new Error(`Conflito de revisão: esperado ${next.revision}, encontrado ${currentRevision}`);
    }
    const stored = JSON.parse(JSON.stringify(next));
    stored.revision += 1;
    stored.updatedAt = now();
    if (!isValidV2State(stored)) {
      transaction.abort();
      throw new TypeError('Estado V2 resultante inválido');
    }
    store.put({ id: CURRENT_STATE_ID, state: stored });
    await transactionDone(transaction);
    return stored;
  } finally {
    database.close();
  }
}

export async function importV2State(raw, current, options = {}) {
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
  let candidate = parsed;
  if (isValidV1State(parsed)) candidate = migrateV1ToV2(parsed);
  if (!isValidV2State(candidate)) throw new TypeError('Backup incompatível com o Lumon');
  candidate.revision = current.revision;
  candidate.migration = current.migration;
  return saveV2State(candidate, options);
}

export async function resetV2State(current, options = {}) {
  return saveV2State(createResetV2State(current), options);
}
