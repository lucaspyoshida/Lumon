import { readFile, writeFile } from 'node:fs/promises';
import { createReleaseManifest } from './release-manifest.mjs';

const manifest = await createReleaseManifest();
await writeFile('release-manifest.json', `${JSON.stringify(manifest, null, 2)}\n`);

const serviceWorkerPath = 'service-worker.js';
const serviceWorker = await readFile(serviceWorkerPath, 'utf8');
const updatedServiceWorker = serviceWorker.replace(
  /const EXPECTED_RELEASE_ID = '(?:[a-f0-9]{64}|pending)';/,
  `const EXPECTED_RELEASE_ID = '${manifest.releaseId}';`,
);
if (updatedServiceWorker === serviceWorker && !serviceWorker.includes(`const EXPECTED_RELEASE_ID = '${manifest.releaseId}';`)) {
  throw new Error('Marcador EXPECTED_RELEASE_ID não encontrado no service worker');
}
await writeFile(serviceWorkerPath, updatedServiceWorker);
console.log(`Release sincronizado: ${manifest.releaseId}`);
