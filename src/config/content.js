/**
 * Catálogo de atividades e níveis.
 *
 * Cada item carrega três formas de se apresentar, porque a criança não lê:
 *   `icone`  — símbolo grande, o portador principal do significado;
 *   `rotulo` — texto, para o adulto que acompanha;
 *   `audio`  — o que é falado quando o botão é tocado.
 *
 * Nenhum botão pode existir sem ícone e sem áudio.
 */

export const ATIVIDADES = [
  {
    id: 'vogais',
    icone: '👂',
    rotulo: 'Ouça e toque',
    audio: 'ui/menu-vogais',
    cor: 'vogais',
    trilha: 'portugues',
    escolheModo: false,
    niveis: [
      { id: 'vogais', icone: 'A E I O U', rotulo: 'Vogais', audio: 'ui/vogais' },
    ],
  },
  {
    id: 'letras',
    icone: '🔤',
    rotulo: 'Letras',
    audio: 'ui/menu-letras',
    cor: 'letras',
    trilha: 'portugues',
    escolheModo: true,
    niveis: [
      { id: 'vogais', icone: 'A E I O U', rotulo: 'Vogais', audio: 'ui/vogais' },
      { id: 'abc', icone: 'A B C', rotulo: 'Alfabeto', audio: 'ui/menu-letras' },
    ],
  },
  {
    id: 'numeros',
    icone: '🔢',
    rotulo: 'Números',
    audio: 'ui/menu-numeros',
    cor: 'numeros',
    trilha: 'matematica',
    escolheModo: true,
    niveis: [
      { id: 'ate5', icone: '1–5', rotulo: 'Até 5', min: 1, max: 5, audio: ['ui/ate', 'numero/5'] },
      { id: 'ate10', icone: '1–10', rotulo: 'Até 10', min: 1, max: 10, audio: ['ui/ate', 'numero/10'] },
      { id: 'ate20', icone: '1–20', rotulo: 'Até 20', min: 1, max: 20, audio: ['ui/ate', 'numero/20'] },
      { id: 'ate30', icone: '1–30', rotulo: 'Até 30', min: 1, max: 30, audio: ['ui/ate', 'numero/30'] },
    ],
  },
  {
    id: 'somas',
    icone: '➕',
    rotulo: 'Somas',
    audio: 'ui/menu-somas',
    cor: 'somas',
    trilha: 'matematica',
    escolheModo: true,
    niveis: [
      { id: 'mais1', icone: '+1', rotulo: 'Somar +1', op: 1, audio: ['ui/somar', 'ui/mais', 'numero/1'] },
      { id: 'mais2', icone: '+2', rotulo: 'Somar +2', op: 2, audio: ['ui/somar', 'ui/mais', 'numero/2'] },
      { id: 'mais3', icone: '+3', rotulo: 'Somar +3', op: 3, audio: ['ui/somar', 'ui/mais', 'numero/3'] },
      { id: 'misto10', icone: '?', rotulo: 'Misturado até 10', op: 'misto', audio: 'ui/misturado' },
    ],
  },
  {
    id: 'subtracoes',
    icone: '➖',
    rotulo: 'Subtrações',
    audio: 'ui/menu-subtracoes',
    cor: 'subtracoes',
    trilha: 'matematica',
    escolheModo: true,
    niveis: [
      { id: 'menos1', icone: '−1', rotulo: 'Subtrair 1', op: 1, audio: ['ui/subtrair', 'ui/menos', 'numero/1'] },
      { id: 'menos2', icone: '−2', rotulo: 'Subtrair 2', op: 2, audio: ['ui/subtrair', 'ui/menos', 'numero/2'] },
      { id: 'menos3', icone: '−3', rotulo: 'Subtrair 3', op: 3, audio: ['ui/subtrair', 'ui/menos', 'numero/3'] },
      { id: 'misto10', icone: '?', rotulo: 'Misturado até 10', op: 'misto', audio: 'ui/misturado' },
    ],
  },
];

export const MODOS = [
  { id: 'sequencial', icone: '➡️', rotulo: 'Em ordem', audio: 'ui/modo-sequencial' },
  { id: 'aleatorio', icone: '🔀', rotulo: 'Embaralhado', audio: 'ui/modo-aleatorio' },
];

/**
 * Aos 4 anos a atenção é curta. Sessões de 15 questões, como no código
 * antigo, são longas demais: a criança abandona antes do fim e a sessão
 * nunca é registrada como concluída.
 */
export const QUESTOES_POR_SESSAO = 8;

export const FALAS_ACERTO = ['ui/fb-acerto-1', 'ui/fb-acerto-2', 'ui/fb-acerto-3', 'ui/fb-acerto-4'];
export const FALAS_ERRO = ['ui/fb-erro-1', 'ui/fb-erro-2', 'ui/fb-erro-3'];

/** Instrução falada ao abrir cada atividade. */
export const INSTRUCOES = {
  vogais: 'ui/instr-vogal',
  letras: 'ui/instr-swipe',
  numeros: 'ui/instr-swipe',
  somas: 'ui/instr-cartao',
  subtracoes: 'ui/instr-cartao',
};

/** Clipes usados diretamente pela interface, fora de atividades e níveis. */
export const AUDIO_INTERFACE = [
  'ui/voltar', 'ui/sair', 'ui/fim', 'ui/fim-perfeito',
  'ui/treinar-erros', 'ui/recomecar',
];

export function acharAtividade(id) {
  return ATIVIDADES.find((a) => a.id === id) ?? null;
}
