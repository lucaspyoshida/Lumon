import { buildNumericOptions } from './options.js';
import { pick, randomInteger } from './random.js';

function parseForced(forcedItem, operator) {
  const pattern = operator === '+' ? /^(\d+)\+(\d+)$/ : /^(\d+)-(\d+)$/;
  const match = String(forcedItem ?? '').match(pattern);
  return match ? [Number(match[1]), Number(match[2])] : null;
}

function operationQuestion({ skill, index, left, operator, right, answer, visual = false, missing = false }) {
  const responseAnswer = missing ? right : answer;
  const maximum = skill.maxResult ?? skill.maxStart ?? 10;
  const response = skill.responseType === 'numeric-input'
    ? { type: 'numeric-input' }
    : skill.responseType === 'self-assessment'
      ? { type: 'self-assessment' }
      : {
          type: 'choice',
          options: buildNumericOptions({ answer: responseAnswer, min: 0, max: maximum, random: skill.random }),
        };
  return {
    id: `${skill.id}-${index}`,
    skill: skill.id,
    difficulty: maximum,
    prompt: {
      type: visual ? 'visual-operation' : 'expression',
      left,
      operator,
      right: missing ? null : right,
      result: missing ? answer : null,
      removed: operator === '-' && visual ? right : 0,
    },
    response,
    answer: responseAnswer,
    metadata: {
      stage: skill.stageId,
      sourceGenerator: skill.generator,
      itemKey: `${left}${operator}${right}`,
      tags: [skill.id, `${operator}${right}`],
      visual,
    },
  };
}

export function generateAdditionQuestion({ skill, random, index, forcedItem }) {
  const forced = parseForced(forcedItem, '+');
  const right = forced?.[1] ?? pick(random, skill.addends);
  const maxLeft = Math.max(0, skill.maxResult - right);
  const left = forced?.[0] ?? randomInteger(random, 0, maxLeft);
  const answer = left + right;
  return operationQuestion({
    skill: { ...skill, random }, index, left, operator: '+', right, answer, visual: skill.visual, missing: skill.missing,
  });
}

export function generateSubtractionQuestion({ skill, random, index, forcedItem }) {
  const forced = parseForced(forcedItem, '-');
  const right = forced?.[1] ?? pick(random, skill.subtrahends);
  const left = forced?.[0] ?? randomInteger(random, right, skill.maxStart);
  const answer = left - right;
  return operationQuestion({
    skill: { ...skill, random }, index, left, operator: '-', right, answer, visual: skill.visual, missing: skill.missing,
  });
}

export function generateMixedOperationQuestion({ skill, random, index }) {
  if (random() < 0.5) {
    const additionSkill = { ...skill, generator: 'mixed-operation', addends: [1, 2, 3], maxResult: skill.maxResult };
    return generateAdditionQuestion({ skill: additionSkill, random, index });
  }
  const subtractionSkill = { ...skill, generator: 'mixed-operation', subtrahends: [1, 2, 3], maxStart: skill.maxResult };
  return generateSubtractionQuestion({ skill: subtractionSkill, random, index });
}

export function generateInverseQuestion({ skill, random, index }) {
  const right = randomInteger(random, 1, 3);
  const left = randomInteger(random, 0, skill.maxResult - right);
  const total = left + right;
  return {
    id: `${skill.id}-${index}`,
    skill: skill.id,
    difficulty: skill.maxResult,
    prompt: { type: 'inverse', addition: [left, right, total], subtraction: [total, null, left] },
    response: { type: 'choice', options: buildNumericOptions({ answer: right, min: 0, max: skill.maxResult, random }) },
    answer: right,
    metadata: { stage: skill.stageId, sourceGenerator: skill.generator, itemKey: `${left}+${right}=${total}`, tags: [skill.id, 'inverse'] },
  };
}
