import { getSkill, getStageForSkill } from '../config/levels.js';
import { createSeededRandom } from './random.js';
import { generateNumberQuestion } from './numbers.js';
import { generateNeighborQuestion, generateSequenceQuestion } from './sequences.js';
import {
  generateAdditionQuestion,
  generateInverseQuestion,
  generateMixedOperationQuestion,
  generateSubtractionQuestion,
} from './operations.js';

function signature(question) {
  return JSON.stringify([question.prompt, question.answer]);
}

function questionFor({ skill, random, index, forcedItem }) {
  if (['find-number', 'quantity-choice', 'number-to-quantity', 'quantity-input', 'place-value', 'ordering'].includes(skill.generator)) {
    return generateNumberQuestion({ skill, random, index, forcedItem });
  }
  if (['sequence-one', 'sequence-two', 'sequence-input'].includes(skill.generator)) {
    return generateSequenceQuestion({ skill, random, index, forcedItem });
  }
  if (skill.generator === 'neighbor') return generateNeighborQuestion({ skill, random, index, forcedItem });
  if (skill.generator === 'addition') return generateAdditionQuestion({ skill, random, index, forcedItem });
  if (skill.generator === 'subtraction') return generateSubtractionQuestion({ skill, random, index, forcedItem });
  if (skill.generator === 'mixed-operation') return generateMixedOperationQuestion({ skill, random, index });
  if (skill.generator === 'inverse-operation') return generateInverseQuestion({ skill, random, index });
  throw new Error(`Gerador não implementado: ${skill.generator}`);
}

export function generateQuestions({ skillId, count = 10, seed = skillId, reviewItems = [], unique = true }) {
  const configuredSkill = getSkill(skillId);
  if (!configuredSkill) throw new Error(`Habilidade desconhecida: ${skillId}`);
  const stage = getStageForSkill(skillId);
  const skill = { ...configuredSkill, stageId: stage.id };
  const random = createSeededRandom(seed);
  const desiredCount = Math.min(15, Math.max(5, Number(count) || 10));
  const questions = [];
  const signatures = new Set();
  let attempts = 0;

  while (questions.length < desiredCount && attempts < desiredCount * 80) {
    const forcedItem = reviewItems.length > 0 && questions.length < Math.ceil(desiredCount / 2)
      ? reviewItems[questions.length % reviewItems.length]
      : null;
    const question = questionFor({ skill, random, index: questions.length, forcedItem });
    const key = signature(question);
    attempts += 1;
    if (unique && !forcedItem && signatures.has(key)) continue;
    signatures.add(key);
    questions.push(question);
  }

  while (questions.length < desiredCount) {
    questions.push(questionFor({ skill, random, index: questions.length, forcedItem: null }));
  }

  return questions;
}
