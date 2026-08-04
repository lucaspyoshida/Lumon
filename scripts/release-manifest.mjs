import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import '../src/pwa/release-integrity.js';
import { NORMATIVE_SHELL_FILES } from './release-files.mjs';

export async function createReleaseManifest() {
  const assets = [];
  for (const file of NORMATIVE_SHELL_FILES) {
    const bytes = await readFile(file);
    assets.push({ path: `./${file}`, sha256: createHash('sha256').update(bytes).digest('hex') });
  }
  const canonical = globalThis.LumonReleaseIntegrity.canonicalReleasePayload(assets);
  return {
    schemaVersion: 1,
    releaseId: createHash('sha256').update(canonical, 'utf8').digest('hex'),
    assets,
  };
}
