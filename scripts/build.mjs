import { access, readFile } from 'node:fs/promises';
import { ALL_SKILLS, STAGES } from '../src/config/levels.js';
import { generateQuestions } from '../src/generators/index.js';

const requiredFiles = [
  'index.htm', 'manifest.json', 'service-worker.js',
  'images/icon-192x192.png', 'images/icon-512x512.png',
  'styles/tokens.css', 'styles/base.css', 'styles/components.css', 'styles/screens.css', 'styles/accessibility.css',
];
await Promise.all(requiredFiles.map((file) => access(file)));

const manifest = JSON.parse(await readFile('manifest.json', 'utf8'));
if (manifest.scope !== './' || manifest.start_url !== './index.htm' || manifest.icons.length < 2) {
  throw new Error('Manifesto PWA incompleto ou fora do escopo relativo do Lumon.');
}
if (STAGES.length !== 5) throw new Error('A trilha deve conter exatamente cinco etapas.');
for (const skill of ALL_SKILLS) {
  const questions = generateQuestions({ skillId: skill.id, count: 5, seed: `build-${skill.id}` });
  if (questions.length !== 5) throw new Error(`Sessão inválida para ${skill.id}`);
}
console.log(`Build estático validado: 5 etapas, ${ALL_SKILLS.length} habilidades e PWA íntegra.`);
