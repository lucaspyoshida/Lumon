import { access, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { ALL_SKILLS, STAGES } from '../src/config/levels.js';
import { generateQuestions } from '../src/generators/index.js';

const requiredFiles = [
  'index.htm', 'manifest.json', 'service-worker.js',
  'images/icon-192x192.png', 'images/icon-512x512.png',
  'images/favicon-48.png', 'images/capybara/welcome.webp',
  'images/capybara/complete.webp', 'images/capybara/trail-marker-256.png',
  'styles/tokens.css', 'styles/base.css', 'styles/components.css', 'styles/screens.css', 'styles/accessibility.css',
];
await Promise.all(requiredFiles.map((file) => access(file)));

const approvedAssets = new Map([
  ['images/icon-512x512.png', 'c7ba4443b5985f8b598cad6b4741b94c18d6ffea943b8d4f69d2545371ffb93a'],
  ['images/icon-192x192.png', '0137c76297efbbd7914d692da43948bda8a975344ea468b71a8bf463cab3d1d6'],
  ['images/favicon-48.png', '474b80acd536522000689d6d9009bb4434ea997af157e378711668c9583566d0'],
  ['images/capybara/welcome.webp', '7bf4e244dff15570716d0d899f00e4ed19bea8f23a40b7d793caa345604111a0'],
  ['images/capybara/complete.webp', '97c95a84eab6e5684fdb38d85a4d7d9696609af83c82c8da23c801f8659e0a60'],
  ['images/capybara/trail-marker-256.png', '5281e51df7dcdfc0e1f531a520cd7dc905ee6bf83cb0ad7949a514904ae79613'],
]);
for (const [file, expectedHash] of approvedAssets) {
  const bytes = await readFile(file);
  const hash = createHash('sha256').update(bytes).digest('hex');
  if (hash !== expectedHash) throw new Error(`Asset sem hash aprovado: ${file}`);
  if (bytes.length > 150_000) throw new Error(`Asset visual excede 150.000 bytes: ${file}`);
}

const shellFiles = [
  'index.htm', 'index.htm', 'manifest.json', 'images/favicon-48.png',
  'images/icon-192x192.png', 'images/icon-512x512.png',
  'images/capybara/welcome.webp', 'images/capybara/complete.webp', 'images/capybara/trail-marker-256.png',
  'styles/tokens.css', 'styles/base.css', 'styles/components.css', 'styles/screens.css', 'styles/accessibility.css',
  'src/app.js', 'src/config/levels.js', 'src/core/progression.js', 'src/core/session.js',
  'src/generators/index.js', 'src/generators/random.js', 'src/generators/options.js',
  'src/generators/numbers.js', 'src/generators/sequences.js', 'src/generators/operations.js',
  'src/storage/repository.js', 'src/storage/schema-v2.js', 'src/storage/repository-v2.js',
  'src/subjects/portuguese.js', 'src/subjects/registry.js', 'src/media/audio-controller.js',
  'src/pwa/registration.js',
];
let compressedShellBytes = 0;
for (const file of shellFiles) compressedShellBytes += gzipSync(await readFile(file), { level: 9 }).length;
if (compressedShellBytes > 500_000) throw new Error(`Shell estimado excede 500.000 bytes: ${compressedShellBytes}`);

const manifest = JSON.parse(await readFile('manifest.json', 'utf8'));
if (manifest.scope !== './' || manifest.start_url !== './index.htm' || manifest.icons.length < 2) {
  throw new Error('Manifesto PWA incompleto ou fora do escopo relativo do Lumon.');
}
if (STAGES.length !== 5) throw new Error('A trilha deve conter exatamente cinco etapas.');
for (const skill of ALL_SKILLS) {
  const questions = generateQuestions({ skillId: skill.id, count: 5, seed: `build-${skill.id}` });
  if (questions.length !== 5) throw new Error(`Sessão inválida para ${skill.id}`);
}
console.log(`Build estático validado: 5 etapas, ${ALL_SKILLS.length} habilidades, assets aprovados e shell gzip estimado em ${compressedShellBytes} bytes.`);
