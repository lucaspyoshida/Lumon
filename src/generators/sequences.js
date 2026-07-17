import { buildNumericOptions } from './options.js';
import { randomInteger, shuffle } from './random.js';

function makeSequence(skill, random, forcedItem) {
  const length = skill.sequenceLength;
  const largestStart = Math.max(skill.min, skill.max - length + 1);
  const forcedValues = String(forcedItem ?? '').split(',').map(Number).filter(Number.isInteger);
  const forcedStart = forcedValues.length
    ? Math.min(largestStart, Math.max(skill.min, forcedValues[0] - Math.floor(length / 2)))
    : null;
  const start = forcedStart ?? randomInteger(random, skill.min, largestStart);
  return Array.from({ length }, (_, index) => start + index);
}

export function generateSequenceQuestion({ skill, random, index, forcedItem }) {
  const sequence = makeSequence(skill, random, forcedItem);
  const gapCount = skill.generator === 'sequence-two' ? 2 : 1;
  const candidates = Array.from({ length: sequence.length }, (_, value) => value);
  const forcedValues = String(forcedItem ?? '').split(',').map(Number).filter((value) => sequence.includes(value));
  const forcedIndexes = forcedValues.map((value) => sequence.indexOf(value));
  const remainingIndexes = shuffle(random, candidates.filter((value) => !forcedIndexes.includes(value)));
  const gapIndexes = [...forcedIndexes, ...remainingIndexes].slice(0, gapCount).sort((a, b) => a - b);
  const answer = gapIndexes.map((gapIndex) => sequence[gapIndex]);
  const visible = sequence.map((value, valueIndex) => (gapIndexes.includes(valueIndex) ? null : value));

  if (skill.generator === 'sequence-input') {
    const onlyAnswer = answer[0];
    return {
      id: `${skill.id}-${index}`,
      skill: skill.id,
      difficulty: skill.max,
      prompt: { type: 'sequence', values: visible },
      response: { type: 'numeric-input' },
      answer: onlyAnswer,
      metadata: { stage: skill.stageId, sourceGenerator: skill.generator, itemKey: String(onlyAnswer), tags: [skill.id] },
    };
  }

  let options;
  let finalAnswer;
  if (answer.length === 1) {
    finalAnswer = answer[0];
    options = buildNumericOptions({ answer: finalAnswer, min: skill.min, max: skill.max, random });
  } else {
    finalAnswer = answer;
    const pairs = new Map([[answer.join('|'), answer]]);
    const offsets = [[-1, -1], [1, 1], [-1, 1], [1, -1], [-2, -1], [1, 2], [-2, 2], [2, -2]];
    for (const [leftOffset, rightOffset] of offsets) {
      if (pairs.size >= 4) break;
      const candidate = [
        Math.min(skill.max, Math.max(skill.min, answer[0] + leftOffset)),
        Math.min(skill.max, Math.max(skill.min, answer[1] + rightOffset)),
      ];
      pairs.set(candidate.join('|'), candidate);
    }
    options = shuffle(random, [...pairs.values()]);
  }

  return {
    id: `${skill.id}-${index}`,
    skill: skill.id,
    difficulty: skill.max,
    prompt: { type: skill.generator === 'neighbor' ? 'neighbor' : 'sequence', values: visible },
    response: { type: 'choice', options },
    answer: finalAnswer,
    metadata: { stage: skill.stageId, sourceGenerator: skill.generator, itemKey: answer.join(','), tags: [skill.id] },
  };
}

export function generateNeighborQuestion({ skill, random, index, forcedItem }) {
  const parsed = Number.parseInt(String(forcedItem ?? ''), 10);
  const center = Number.isInteger(parsed) && parsed > skill.min && parsed < skill.max
    ? parsed
    : randomInteger(random, Math.max(2, skill.min + 1), skill.max - 1);
  const hidePrevious = random() < 0.5;
  const answer = hidePrevious ? center - 1 : center + 1;
  const values = hidePrevious ? [null, center, center + 1] : [center - 1, center, null];
  return {
    id: `${skill.id}-${index}`,
    skill: skill.id,
    difficulty: skill.max,
    prompt: { type: 'neighbor', values },
    response: { type: 'choice', options: buildNumericOptions({ answer, min: skill.min, max: skill.max, random }) },
    answer,
    metadata: { stage: skill.stageId, sourceGenerator: skill.generator, itemKey: String(center), tags: [skill.id] },
  };
}
