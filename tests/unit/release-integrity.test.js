import test from 'node:test';
import assert from 'node:assert/strict';
import '../../src/pwa/release-integrity.js';

const { canonicalReleasePayload, fetchVerifiedRelease, sha256Hex } = globalThis.LumonReleaseIntegrity;

async function manifestFor(entries) {
  const assets = [];
  for (const [path, body] of entries) assets.push({ path, sha256: await sha256Hex(new TextEncoder().encode(body)) });
  assets.sort((left, right) => left.path.localeCompare(right.path));
  return {
    schemaVersion: 1,
    releaseId: await sha256Hex(canonicalReleasePayload(assets)),
    assets,
  };
}

test('release íntegro aceita somente os bytes declarados', async () => {
  const manifest = await manifestFor([['./index.htm', '<main>r1</main>'], ['./src/app.js', 'export const r = 1;']]);
  const bodies = new Map([
    ['https://lumon.test/release-manifest.json', JSON.stringify(manifest)],
    ['https://lumon.test/index.htm', '<main>r1</main>'],
    ['https://lumon.test/src/app.js', 'export const r = 1;'],
  ]);
  const release = await fetchVerifiedRelease({
    manifestUrl: 'https://lumon.test/release-manifest.json',
    expectedReleaseId: manifest.releaseId,
    fetchImpl: async (url) => new Response(bodies.get(url), { status: bodies.has(url) ? 200 : 404 }),
  });
  assert.equal(release.responses.size, 2);
});

test('mistura de bytes de outro release bloqueia a instalação', async () => {
  const manifest = await manifestFor([['./index.htm', '<main>r1</main>'], ['./src/app.js', 'export const r = 1;']]);
  const bodies = new Map([
    ['https://lumon.test/release-manifest.json', JSON.stringify(manifest)],
    ['https://lumon.test/index.htm', '<main>r1</main>'],
    ['https://lumon.test/src/app.js', 'export const r = 2;'],
  ]);
  await assert.rejects(fetchVerifiedRelease({
    manifestUrl: 'https://lumon.test/release-manifest.json',
    expectedReleaseId: manifest.releaseId,
    fetchImpl: async (url) => new Response(bodies.get(url), { status: bodies.has(url) ? 200 : 404 }),
  }), /Shell híbrido detectado: \.\/src\/app\.js/);
});
