import { buildNumericOptions } from './options.js';
import { randomInteger, shuffle } from './random.js';

function forcedNumber(forcedItem, min, max) {
  const parsed = Number.parseInt(String(forcedItem ?? ''), 10);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max ? parsed : null;
}

function baseQuestion({ skill, index, prompt, response, answer, itemKey = answer }) {
  return {
    id: `${skill.id}-${index}`,
    skill: skill.id,
    difficulty: skill.max ?? skill.maxResult ?? 1,
    prompt,
    response,
    answer,
    metadata: {
      stage: skill.stageId,
      sourceGenerator: skill.generator,
      itemKey: String(itemKey),
      tags: [skill.id],
    },
  };
}

function targetFor(skill, random, forcedItem) {
  return forcedNumber(forcedItem, skill.min, skill.max) ?? randomInteger(random, skill.min, skill.max);
}

export function generateNumberQuestion({ skill, random, index, forcedItem }) {
  const target = targetFor(skill, random, forcedItem);

  if (skill.generator === 'find-number') {
    return baseQuestion({
      skill,
      index,
      prompt: { type: 'find-number', value: target },
      response: { type: 'choice', options: buildNumericOptions({ answer: target, min: skill.min, max: skill.max, random }) },
      answer: target,
    });
  }

  if (skill.generator === 'quantity-choice') {
    return baseQuestion({
      skill,
      index,
      prompt: { type: 'dots', value: target },
      response: { type: 'choice', options: buildNumericOptions({ answer: target, min: skill.min, max: skill.max, random }) },
      answer: target,
    });
  }

  if (skill.generator === 'number-to-quantity') {
    return baseQuestion({
      skill,
      index,
      prompt: { type: 'number', value: target },
      response: {
        type: 'choice',
        optionDisplay: 'dots',
        options: buildNumericOptions({ answer: target, min: skill.min, max: skill.max, random, count: 3 }),
      },
      answer: target,
    });
  }

  if (skill.generator === 'quantity-input') {
    return baseQuestion({
      skill,
      index,
      prompt: { type: 'dots', value: target },
      response: { type: 'numeric-input' },
      answer: target,
    });
  }

  if (skill.generator === 'place-value') {
    return baseQuestion({
      skill,
      index,
      prompt: { type: 'place-value', tens: Math.floor(target / 10), ones: target % 10 },
      response: { type: 'numeric-input' },
      answer: target,
    });
  }

  if (skill.generator === 'ordering') {
    const forcedValues = String(forcedItem ?? '').split(',').map(Number);
    const hasValidForcedValues = forcedValues.length === skill.groupSize
      && new Set(forcedValues).size === skill.groupSize
      && forcedValues.every((value) => Number.isInteger(value) && value >= skill.min && value <= skill.max);
    const values = new Set(hasValidForcedValues ? forcedValues : []);
    while (values.size < skill.groupSize) values.add(randomInteger(random, skill.min, skill.max));
    const answer = [...values].sort((left, right) => left - right);
    const items = shuffle(random, answer);
    return baseQuestion({
      skill,
      index,
      prompt: { type: 'ordering', items },
      response: { type: 'ordering' },
      answer,
      itemKey: answer.join(','),
    });
  }

  throw new Error(`Gerador numérico desconhecido: ${skill.generator}`);
}
