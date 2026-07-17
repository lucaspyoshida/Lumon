export const MASTERY_RULES = Object.freeze({
  requiredSessions: 3,
  recentSessions: 3,
  accuracyTarget: 0.9,
  writingAccuracyTarget: 0.8,
  maxItemErrorRate: 0.3,
  abandonmentWindow: 5,
  maxRecentAbandonments: 1,
});

const stage = (id, title, description, color, skills) => ({ id, title, description, color, skills });
const skill = (id, title, instruction, generator, config = {}) => ({
  id,
  title,
  instruction,
  generator,
  masteryTarget: config.masteryTarget ?? MASTERY_RULES.accuracyTarget,
  ...config,
});

export const STAGES = Object.freeze([
  stage('reconhecimento-10', 'Números e quantidades até 10', 'Reconhecer, contar, associar e ordenar.', '#2f6d62', [
    skill('number.find.1-10', 'Encontre o número', 'Escolha o numeral pedido.', 'find-number', { min: 1, max: 10 }),
    skill('number.quantity.1-10', 'Conte e escolha', 'Conte as bolinhas e escolha o número.', 'quantity-choice', { min: 1, max: 10 }),
    skill('number.match-quantity.1-10', 'Número e quantidade', 'Escolha o grupo que combina com o numeral.', 'number-to-quantity', { min: 1, max: 10 }),
    skill('number.order.1-10', 'Coloque em ordem', 'Use as setas para organizar do menor para o maior.', 'ordering', { min: 1, max: 10, groupSize: 4 }),
    skill('number.sequence.1-10', 'Qual número falta?', 'Complete a sequência curta.', 'sequence-one', { min: 1, max: 10, sequenceLength: 5 }),
  ]),
  stage('sequencia-30', 'Sequências e quantidades até 30', 'Ampliar a contagem e descobrir vizinhos.', '#326f9e', [
    skill('number.find.11-30', 'Reconheça até 30', 'Escolha o numeral pedido.', 'find-number', { min: 11, max: 30 }),
    skill('number.quantity.11-20', 'Conte até 20', 'Conte os grupos de cinco e escolha o total.', 'quantity-choice', { min: 11, max: 20 }),
    skill('number.quantity.21-30', 'Conte até 30', 'Conte os grupos de cinco e escolha o total.', 'quantity-choice', { min: 21, max: 30 }),
    skill('number.neighbor.1-30', 'Anterior e posterior', 'Descubra o vizinho que falta.', 'neighbor', { min: 1, max: 30 }),
    skill('number.sequence-one.1-30', 'Uma lacuna', 'Complete a sequência.', 'sequence-one', { min: 1, max: 30, sequenceLength: 5 }),
    skill('number.sequence-two.1-30', 'Duas lacunas', 'Encontre os dois números que faltam.', 'sequence-two', { min: 1, max: 30, sequenceLength: 6 }),
    skill('number.order.1-30', 'Ordene pequenos grupos', 'Use as setas para organizar do menor para o maior.', 'ordering', { min: 1, max: 30, groupSize: 5 }),
  ]),
  stage('leitura-50', 'Leitura, seleção e escrita até 50', 'Ler, digitar e observar dezenas e unidades.', '#7457a6', [
    skill('number.find.31-50', 'Reconheça até 50', 'Escolha o numeral pedido.', 'find-number', { min: 31, max: 50 }),
    skill('number.select.1-50', 'Selecione entre quatro', 'Leia a instrução e escolha o numeral.', 'find-number', { min: 1, max: 50 }),
    skill('number.write.1-50', 'Digite a quantidade', 'Conte e digite o total.', 'quantity-input', { min: 1, max: 50, masteryTarget: MASTERY_RULES.writingAccuracyTarget }),
    skill('number.table.1-50', 'Complete a tabela', 'Digite o número que falta na sequência.', 'sequence-input', { min: 1, max: 50, sequenceLength: 5, masteryTarget: MASTERY_RULES.writingAccuracyTarget }),
    skill('number.place-value.10-50', 'Dezenas e unidades', 'Junte dezenas e unidades e digite o número.', 'place-value', { min: 10, max: 50, masteryTarget: MASTERY_RULES.writingAccuracyTarget }),
    skill('number.order.1-50', 'Ordene até 50', 'Use as setas para organizar do menor para o maior.', 'ordering', { min: 1, max: 50, groupSize: 5 }),
  ]),
  stage('adicao', 'Adição progressiva', 'Somar em passos pequenos, com apoio quando útil.', '#b15e2e', [
    skill('addition.plus-1', 'Somar +1', 'Resolva uma soma por vez.', 'addition', { addends: [1], maxResult: 10 }),
    skill('addition.plus-2', 'Somar +2', 'Resolva uma soma por vez.', 'addition', { addends: [2], maxResult: 10 }),
    skill('addition.plus-3', 'Somar +3', 'Resolva uma soma por vez.', 'addition', { addends: [3], maxResult: 10 }),
    skill('addition.plus-1-3', 'Misturar +1, +2 e +3', 'Observe o segundo número e some.', 'addition', { addends: [1, 2, 3], maxResult: 10 }),
    skill('addition.flashcard', 'Cartão de soma', 'Mostre a resposta e avalie como foi.', 'addition', { addends: [1, 2, 3], maxResult: 10, responseType: 'self-assessment' }),
    skill('addition.within-5', 'Resultados até 5', 'Some sem ultrapassar 5.', 'addition', { addends: [1, 2, 3, 4], maxResult: 5 }),
    skill('addition.within-10', 'Digite resultados até 10', 'Calcule e digite o resultado.', 'addition', { addends: [1, 2, 3, 4, 5], maxResult: 10, responseType: 'numeric-input' }),
    skill('addition.visual', 'Junte os grupos', 'Conte os dois grupos e descubra o total.', 'addition', { addends: [1, 2, 3], maxResult: 10, visual: true }),
    skill('addition.missing', 'Descubra o termo', 'Qual número completa a soma?', 'addition', { addends: [1, 2, 3], maxResult: 10, missing: true }),
  ]),
  stage('subtracao', 'Subtração e consolidação', 'Retirar, relacionar operações e consolidar.', '#9b3f55', [
    skill('subtraction.minus-1', 'Subtrair −1', 'Retire uma unidade.', 'subtraction', { subtrahends: [1], maxStart: 10 }),
    skill('subtraction.minus-2', 'Subtrair −2', 'Retire duas unidades.', 'subtraction', { subtrahends: [2], maxStart: 10 }),
    skill('subtraction.minus-3', 'Subtrair −3', 'Retire três unidades.', 'subtraction', { subtrahends: [3], maxStart: 10 }),
    skill('subtraction.minus-1-3', 'Misturar −1, −2 e −3', 'Observe quanto deve ser retirado.', 'subtraction', { subtrahends: [1, 2, 3], maxStart: 10 }),
    skill('subtraction.flashcard', 'Cartão de subtração', 'Mostre a resposta e avalie como foi.', 'subtraction', { subtrahends: [1, 2, 3], maxStart: 10, responseType: 'self-assessment' }),
    skill('subtraction.within-10', 'Digite subtrações até 10', 'Calcule e digite o resultado.', 'subtraction', { subtrahends: [1, 2, 3, 4, 5], maxStart: 10, responseType: 'numeric-input' }),
    skill('subtraction.visual', 'Veja o que foi retirado', 'Conte o que ficou.', 'subtraction', { subtrahends: [1, 2, 3], maxStart: 10, visual: true }),
    skill('operations.mixed', 'Adição e subtração', 'Veja o sinal e resolva a operação.', 'mixed-operation', { maxResult: 10 }),
    skill('subtraction.missing', 'Descubra o termo', 'Qual número completa a subtração?', 'subtraction', { subtrahends: [1, 2, 3], maxStart: 10, missing: true }),
    skill('operations.inverse', 'Operações inversas', 'Use a soma para descobrir a subtração.', 'inverse-operation', { maxResult: 10 }),
  ]),
]);

export const ALL_SKILLS = Object.freeze(STAGES.flatMap((item) => item.skills));

export function getSkill(skillId) {
  return ALL_SKILLS.find((item) => item.id === skillId) ?? null;
}

export function getStageForSkill(skillId) {
  return STAGES.find((item) => item.skills.some((entry) => entry.id === skillId)) ?? null;
}

export function getNextSkill(skillId) {
  const index = ALL_SKILLS.findIndex((item) => item.id === skillId);
  return index >= 0 ? ALL_SKILLS[index + 1] ?? null : null;
}

export const FIRST_SKILL_ID = ALL_SKILLS[0].id;
