import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CORRUPT_BACKUP_KEY,
  LEGACY_BACKUP_KEY,
  LEGACY_KEY,
  STORAGE_KEY,
  clearLumonData,
  createDefaultState,
  importState,
  loadState,
  saveState,
} from '../../src/storage/repository.js';

class MemoryStorage {
  constructor(initial = {}) { this.values = new Map(Object.entries(initial)); }
  get length() { return this.values.size; }
  key(index) { return [...this.values.keys()][index] ?? null; }
  getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

const now = () => '2026-07-17T00:30:00.000Z';

test('estado válido é salvo e recuperado', () => {
  const storage = new MemoryStorage();
  const expected = createDefaultState(now);
  saveState(expected, storage);
  assert.deepEqual(loadState(storage, now), expected);
});

test('JSON corrompido gera backup e padrão seguro', () => {
  const storage = new MemoryStorage({ [STORAGE_KEY]: '{não-json' });
  const loaded = loadState(storage, now);
  assert.equal(loaded.schemaVersion, 1);
  assert.equal(loaded.profile.currentSkillId, 'number.find.1-10');
  assert.equal(storage.getItem(CORRUPT_BACKUP_KEY), '{não-json');
});

test('migração preserva configuração legada e mantém backup', () => {
  const legacy = JSON.stringify({ atividade: 'somas', modo: 'aleatorio', nivel: { id: 'mais1' } });
  const storage = new MemoryStorage({ [LEGACY_KEY]: legacy });
  const loaded = loadState(storage, now);
  assert.equal(loaded.profile.currentSkillId, 'addition.plus-1');
  assert.ok(loaded.progress.manualUnlocked.includes('addition.plus-1'));
  assert.equal(storage.getItem(LEGACY_BACKUP_KEY), legacy);
});

test('importação rejeita schema inválido sem sobrescrever dados', () => {
  const storage = new MemoryStorage();
  const valid = createDefaultState(now);
  saveState(valid, storage);
  assert.throws(() => importState('{"schemaVersion":99}', storage), /incompatível/);
  assert.deepEqual(JSON.parse(storage.getItem(STORAGE_KEY)), valid);
});

test('sessão ativa inválida é descartada com recuperação segura', () => {
  const invalid = createDefaultState(now);
  invalid.activeSession = { skillId: 'skill-inexistente', questions: [], currentIndex: -1, answers: [] };
  const storage = new MemoryStorage({ [STORAGE_KEY]: JSON.stringify(invalid) });
  const loaded = loadState(storage, now);
  assert.equal(loaded.activeSession, null);
  assert.equal(storage.getItem(CORRUPT_BACKUP_KEY), JSON.stringify(invalid));
});

test('exclusão remove a allowlist histórica do Lumon e preserva chave externa', () => {
  const storage = new MemoryStorage({
    [STORAGE_KEY]: 'state',
    [CORRUPT_BACKUP_KEY]: 'corrupt',
    [LEGACY_BACKUP_KEY]: 'legacy-backup',
    [LEGACY_KEY]: 'legacy',
    outro: 'preservar',
  });
  clearLumonData(storage);
  assert.equal(storage.getItem(STORAGE_KEY), null);
  assert.equal(storage.getItem(CORRUPT_BACKUP_KEY), null);
  assert.equal(storage.getItem(LEGACY_BACKUP_KEY), null);
  assert.equal(storage.getItem(LEGACY_KEY), null);
  assert.equal(storage.getItem('outro'), 'preservar');
});
