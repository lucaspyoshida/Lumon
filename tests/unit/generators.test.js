import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_SKILLS, STAGES, getSkill } from '../../src/config/levels.js';
import { generateQuestions } from '../../src/generators/index.js';

test('as cinco etapas e todas as progressões geram fixtures utilizáveis', () => {
  assert.equal(STAGES.length, 5);
  assert.ok(ALL_SKILLS.length >= 30);
  for (const skill of ALL_SKILLS) {
    const questions = generateQuestions({ skillId: skill.id, count: 5, seed: `fixture-${skill.id}` });
    assert.equal(questions.length, 5, skill.id);
    for (const question of questions) {
      assert.equal(question.skill, skill.id);
      assert.ok(question.id);
      assert.ok(question.prompt.type);
      assert.ok(question.response.type);
      assert.notEqual(question.answer, undefined);
      assert.equal(question.metadata.stage, STAGES.find((stage) => stage.skills.some((item) => item.id === skill.id)).id);
    }
  }
});

test('a mesma seed gera sessões idênticas', () => {
  for (const skillId of ['number.quantity.1-10', 'number.sequence-two.1-30', 'addition.within-10', 'subtraction.within-10']) {
    assert.deepEqual(
      generateQuestions({ skillId, count: 10, seed: 'mesma-seed' }),
      generateQuestions({ skillId, count: 10, seed: 'mesma-seed' }),
    );
  }
});

test('geradores numéricos respeitam limites e evitam duplicatas quando há espaço', () => {
  const questions = generateQuestions({ skillId: 'number.find.1-10', count: 10, seed: 'limites' });
  assert.equal(new Set(questions.map((question) => JSON.stringify(question.prompt))).size, 10);
  for (const question of questions) {
    assert.ok(question.answer >= 1 && question.answer <= 10);
    assert.equal(question.response.options.filter((option) => option === question.answer).length, 1);
    assert.equal(new Set(question.response.options).size, question.response.options.length);
  }
});

test('adição respeita o resultado máximo e calcula respostas estruturadas', () => {
  for (const skillId of ['addition.plus-1', 'addition.plus-2', 'addition.plus-3', 'addition.within-5', 'addition.within-10']) {
    const skill = getSkill(skillId);
    for (const question of generateQuestions({ skillId, count: 15, seed: skillId })) {
      assert.ok(question.prompt.left + question.prompt.right <= skill.maxResult);
      assert.equal(question.answer, question.prompt.left + question.prompt.right);
    }
  }
});

test('subtração nunca gera resultado negativo', () => {
  for (const skillId of ['subtraction.minus-1', 'subtraction.minus-2', 'subtraction.minus-3', 'subtraction.within-10']) {
    for (const question of generateQuestions({ skillId, count: 15, seed: skillId })) {
      assert.ok(question.prompt.left >= question.prompt.right);
      assert.ok(question.answer >= 0);
      assert.equal(question.answer, question.prompt.left - question.prompt.right);
    }
  }
});

test('adição e subtração oferecem seleção, digitação, autoavaliação e apoio visual', () => {
  const expected = new Map([
    ['addition.plus-1', 'choice'],
    ['addition.within-10', 'numeric-input'],
    ['addition.flashcard', 'self-assessment'],
    ['subtraction.minus-1', 'choice'],
    ['subtraction.within-10', 'numeric-input'],
    ['subtraction.flashcard', 'self-assessment'],
  ]);
  for (const [skillId, responseType] of expected) {
    const [question] = generateQuestions({ skillId, count: 5, seed: `response-${skillId}` });
    assert.equal(question.response.type, responseType);
  }
  assert.equal(generateQuestions({ skillId: 'addition.visual', count: 5, seed: 'visual-add' })[0].prompt.type, 'visual-operation');
  assert.equal(generateQuestions({ skillId: 'subtraction.visual', count: 5, seed: 'visual-sub' })[0].prompt.type, 'visual-operation');
});

test('sequências têm lacunas válidas e alternativas sem ambiguidade', () => {
  for (const skillId of ['number.sequence.1-10', 'number.sequence-one.1-30', 'number.sequence-two.1-30']) {
    for (const question of generateQuestions({ skillId, count: 10, seed: skillId })) {
      const gaps = question.prompt.values.filter((value) => value === null).length;
      assert.equal(gaps, skillId.includes('two') ? 2 : 1);
      assert.equal(question.response.options.filter((option) => JSON.stringify(option) === JSON.stringify(question.answer)).length, 1);
      assert.ok(question.response.options.length >= 3);
    }
  }
});

test('revisão reproduz itens numéricos, sequenciais e de ordenação', () => {
  const cases = [
    ['number.neighbor.1-30', '12'],
    ['number.sequence-one.1-30', '18'],
    ['number.sequence-two.1-30', '18,19'],
    ['number.order.1-30', '3,8,14,22,27'],
  ];
  for (const [skillId, itemKey] of cases) {
    const questions = generateQuestions({ skillId, count: 5, seed: `review-${skillId}`, reviewItems: [itemKey] });
    assert.ok(questions.filter((question) => question.metadata.itemKey === itemKey).length >= 3, skillId);
  }
});

test('itens fracos informados ocupam pelo menos metade da revisão', () => {
  const questions = generateQuestions({
    skillId: 'addition.plus-1-3', count: 10, seed: 'revisao', reviewItems: ['2+3', '4+1'],
  });
  const reviewed = questions.filter((question) => ['2+3', '4+1'].includes(question.metadata.itemKey));
  assert.ok(reviewed.length >= 5);
});
