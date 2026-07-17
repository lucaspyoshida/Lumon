import { readdir, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const roots = ['src', 'tests', 'scripts'];

async function javascriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const resolved = path.join(directory, entry.name);
    return entry.isDirectory() ? javascriptFiles(resolved) : resolved.endsWith('.js') || resolved.endsWith('.mjs') ? [resolved] : [];
  }));
  return nested.flat();
}

const files = (await Promise.all(roots.map(javascriptFiles))).flat().concat('service-worker.js');
const failures = [];
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) failures.push(`${file}: ${result.stderr.trim()}`);
}

const productionFiles = (await javascriptFiles('src')).concat('service-worker.js');
const unsafePatterns = [new RegExp('\\b' + 'eval\\s*\\('), new RegExp('new\\s+' + 'Function\\b')];
for (const file of productionFiles) {
  const source = await readFile(file, 'utf8');
  if (unsafePatterns.some((pattern) => pattern.test(source))) failures.push(`${file}: execução dinâmica proibida`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Lint concluído: ${files.length} arquivos JavaScript válidos e sem execução dinâmica.`);
}
