import { randomInteger, shuffle } from './random.js';

export function buildNumericOptions({ answer, min, max, random, count = 4 }) {
  const options = new Set([answer]);
  const nearby = [answer - 1, answer + 1, answer - 2, answer + 2, answer - 10, answer + 10]
    .filter((value) => value >= min && value <= max && value !== answer);

  for (const value of shuffle(random, nearby)) {
    if (options.size >= count) break;
    options.add(value);
  }

  let guard = 0;
  while (options.size < count && guard < 100) {
    options.add(randomInteger(random, min, max));
    guard += 1;
  }

  return shuffle(random, [...options]);
}

export function serializeAnswer(value) {
  return Array.isArray(value) ? value.join('|') : String(value);
}
