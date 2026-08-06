/**
 * Geradores de questões.
 *
 * Todos devolvem o mesmo contrato, o que permite que a tela de atividade não
 * saiba nada sobre a matéria que está sendo praticada:
 *
 *   {
 *     id, habilidade,
 *     enunciado: { tipo, ... },      // o que aparece / é falado
 *     resposta:  { tipo, opcoes },   // como a criança responde
 *     valor,                         // a resposta correta
 *     audio                          // clipes que descrevem o enunciado
 *   }
 *
 * Duas regras que o código antigo violava e que aqui são estruturais:
 * o resultado das contas é calculado aqui, nunca por `eval()`; e a
 * aleatoriedade entra por parâmetro, o que torna tudo testável com semente.
 */

import { embaralhar, sortearVarios } from '../core/rng.js';

const VOGAIS = ['A', 'E', 'I', 'O', 'U'];
const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

let contador = 0;
const proximoId = (prefixo) => `${prefixo}-${++contador}`;

/** Reconhecimento de numeral: vê o número, ouve o nome, autoavalia. */
export function gerarNumeros({ min, max, modo, limite, random }) {
  let valores = [];
  for (let i = min; i <= max; i++) valores.push(i);
  if (modo === 'aleatorio') valores = embaralhar(valores, random);
  return valores.slice(0, limite).map((n) => ({
    id: proximoId('num'),
    habilidade: `matematica.numero.reconhecer.${min}-${max}`,
    enunciado: { tipo: 'numero', valor: n },
    resposta: { tipo: 'autoavaliacao' },
    valor: n,
    audio: [`numero/${n}`],
  }));
}

function questaoAritmetica(a, b, operador) {
  const valor = operador === '+' ? a + b : a - b;
  return {
    id: proximoId(operador === '+' ? 'soma' : 'sub'),
    habilidade: `matematica.${operador === '+' ? 'adicao' : 'subtracao'}.${b}`,
    enunciado: { tipo: 'expressao', esquerda: a, operador, direita: b },
    resposta: { tipo: 'autoavaliacao', viraCartao: true },
    valor,
    audio: [`numero/${a}`, operador === '+' ? 'ui/mais' : 'ui/menos', `numero/${b}`],
  };
}

/** Adição. O resultado nunca passa de 10 e nunca é negativo. */
export function gerarSomas({ op, modo, limite, random }) {
  let questoes = [];
  if (op === 'misto') {
    for (let a = 1; a <= 9; a++) {
      for (let b = 1; a + b <= 10; b++) questoes.push(questaoAritmetica(a, b, '+'));
    }
    questoes = embaralhar(questoes, random);
  } else {
    for (let a = 0; a + op <= 10; a++) questoes.push(questaoAritmetica(a, op, '+'));
    if (modo === 'aleatorio') questoes = embaralhar(questoes, random);
  }
  return questoes.slice(0, limite);
}

/** Subtração. O resultado nunca é negativo. */
export function gerarSubtracoes({ op, modo, limite, random }) {
  let questoes = [];
  if (op === 'misto') {
    for (let a = 1; a <= 10; a++) {
      for (let b = 1; b <= a; b++) questoes.push(questaoAritmetica(a, b, '-'));
    }
    questoes = embaralhar(questoes, random);
  } else {
    for (let a = op; a <= 10; a++) questoes.push(questaoAritmetica(a, op, '-'));
    if (modo === 'aleatorio') questoes = embaralhar(questoes, random);
  }
  return questoes.slice(0, limite);
}

/** Reconhecimento de letra: vê a letra, ouve o nome, autoavalia. */
export function gerarLetras({ nivelId, modo, limite, random }) {
  let letras = nivelId === 'vogais' ? [...VOGAIS] : [...ALFABETO];
  if (modo === 'aleatorio') letras = embaralhar(letras, random);
  return letras.slice(0, limite).map((letra) => ({
    id: proximoId('letra'),
    habilidade: `portugues.letra.reconhecer.${nivelId}`,
    enunciado: { tipo: 'letra', valor: letra },
    resposta: { tipo: 'autoavaliacao' },
    valor: letra,
    audio: [`letra/${letra}`],
  }));
}

/**
 * Etapa P1 da trilha de português: ouve a letra e toca na certa.
 *
 * É o primeiro exercício do aplicativo com correção objetiva — a criança não
 * julga o próprio desempenho, o sistema julga. Por isso ele é o que produz o
 * primeiro dado de progresso confiável.
 */
export function gerarVogaisAuditivas({ limite, random }) {
  const rodada = [];
  // Cada vogal aparece ao menos uma vez antes de qualquer repetição.
  while (rodada.length < limite) rodada.push(...embaralhar(VOGAIS, random));
  return rodada.slice(0, limite).map((correta) => {
    const distratores = sortearVarios(VOGAIS.filter((v) => v !== correta), 2, random);
    return {
      id: proximoId('vogal'),
      habilidade: 'portugues.vogal.discriminar',
      enunciado: { tipo: 'audio', audioId: `letra/${correta}` },
      resposta: { tipo: 'escolha', opcoes: embaralhar([correta, ...distratores], random) },
      valor: correta,
      audio: [`letra/${correta}`],
    };
  });
}

/** Ponto único de entrada: monta a lista de questões de uma sessão. */
export function gerarQuestoes({ atividadeId, nivel, modo, limite, random }) {
  const comum = { modo, limite, random };
  switch (atividadeId) {
    case 'numeros':
      return gerarNumeros({ min: nivel.min, max: nivel.max, ...comum });
    case 'somas':
      return gerarSomas({ op: nivel.op, ...comum });
    case 'subtracoes':
      return gerarSubtracoes({ op: nivel.op, ...comum });
    case 'letras':
      return gerarLetras({ nivelId: nivel.id, ...comum });
    case 'vogais':
      return gerarVogaisAuditivas(comum);
    default:
      return [];
  }
}
