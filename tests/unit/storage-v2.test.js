import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession } from '../../src/core/session.js';
import { createDefaultState } from '../../src/storage/repository.js';
import {
  createDefaultV2State,
  isValidV2State,
  mathematicsAsV1,
  migrateV1ToV2,
} from '../../src/storage/schema-v2.js';
import { sha256Hex } from '../../src/storage/repository-v2.js';

const now = () => '2026-08-04T10:00:00.000Z';

test('migração V1 para V2 preserva Matemática byte por byte no payload', () => {
  const v1 = createDefaultState(now);
  v1.preferences.sessionLength = 5;
  v1.progress.manualUnlocked = ['addition.plus-1'];
  v1.profile.currentSkillId = 'addition.plus-1';
  v1.activeSession = createSession({ skillId: 'addition.plus-1', count: 5, seed: 'seed-preservada', now });
  const v2 = migrateV1ToV2(v1, { now, sourceSha256: 'abc' });
  assert.equal(isValidV2State(v2), true);
  assert.deepEqual(mathematicsAsV1(v2), v1);
  assert.equal(v2.profile.currentSubjectId, 'matematica');
  assert.equal(v2.subjects.portugues.activeSession, null);
});

test('migração pura é idempotente para a mesma fonte e relógio', () => {
  const v1 = createDefaultState(now);
  assert.deepEqual(
    migrateV1ToV2(v1, { now, sourceSha256: 'fonte' }),
    migrateV1ToV2(v1, { now, sourceSha256: 'fonte' }),
  );
});

test('estado Português nasce fail-closed e sem mídia no armazenamento', () => {
  const state = createDefaultV2State(now);
  assert.equal(state.subjects.portugues.contentStatus.state, 'blocked-content');
  assert.equal(state.subjects.portugues.activeSession, null);
  assert.equal(state.subjects.portugues.progress.completedSessions.length, 0);
  const serialized = JSON.stringify(state);
  assert.doesNotMatch(serialized, /data:audio|data:image|\.mp3|\.webp|Blob/);
});

test('SHA-256 usa bytes UTF-8 estáveis', async () => {
  assert.equal(await sha256Hex('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});
