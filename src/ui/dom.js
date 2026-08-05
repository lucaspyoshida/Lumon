/**
 * Fábrica de elementos de interface.
 *
 * Concentra a regra que não pode ser esquecida em nenhuma tela: todo botão
 * tem ícone, todo botão fala ao ser tocado, e o texto é secundário. Se a
 * criação de botões estivesse espalhada pelas telas, essa regra dependeria de
 * disciplina; aqui ela é a única forma de criar um botão.
 */

import { destravar, falar } from '../audio/player.js';

export const $ = (selecao) => document.querySelector(selecao);

/**
 * @param {{icone: string, rotulo: string, audio?: string|string[],
 *          classe?: string, aoTocar?: Function, falaAntes?: boolean}} opcoes
 */
export function botao({ icone, rotulo, audio, classe = '', aoTocar, falaAntes = true }) {
  const el = document.createElement('button');
  el.className = `btn ${classe}`.trim();
  el.type = 'button';
  el.setAttribute('aria-label', rotulo);

  const spanIcone = document.createElement('span');
  spanIcone.className = 'btn__icone';
  spanIcone.setAttribute('aria-hidden', 'true');
  spanIcone.textContent = icone;

  const spanRotulo = document.createElement('span');
  spanRotulo.className = 'btn__rotulo';
  spanRotulo.textContent = rotulo;

  el.append(spanIcone, spanRotulo);

  el.addEventListener('click', () => {
    destravar();
    if (audio && falaAntes) falar(audio);
    if (aoTocar) aoTocar();
  });

  return el;
}

/** Botão de voltar, sempre no mesmo canto e sempre com o mesmo ícone. */
export function botaoVoltar(aoTocar) {
  return botao({
    icone: '⬅️', rotulo: 'Voltar', audio: 'ui/voltar',
    classe: 'btn--voltar', aoTocar, falaAntes: false,
  });
}

export function botaoSair(aoTocar) {
  return botao({
    icone: '🏠', rotulo: 'Sair', audio: 'ui/sair',
    classe: 'btn--sair', aoTocar, falaAntes: false,
  });
}

/** Botão de repetir a instrução falada. Presente em toda tela com áudio. */
export function botaoOuvirDeNovo(aoTocar) {
  return botao({
    icone: '🔊', rotulo: 'Ouvir de novo',
    classe: 'btn--ouvir', aoTocar, falaAntes: false,
  });
}

export function limpar(elemento) {
  elemento.replaceChildren();
  return elemento;
}
