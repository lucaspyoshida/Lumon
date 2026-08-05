/**
 * Navegação entre telas.
 *
 * Além de trocar a tela visível, move o foco para o título da nova tela.
 * Sem isso, quem usa leitor de tela não percebe que a navegação aconteceu —
 * a página não recarrega e nada é anunciado.
 */

const telas = new Map();
let atual = null;

export function registrar(id, elemento) {
  telas.set(id, elemento);
}

export function irPara(id) {
  const destino = telas.get(id);
  if (!destino) return;
  telas.forEach((el) => el.classList.remove('ativa'));
  destino.classList.add('ativa');
  atual = id;

  const foco = destino.querySelector('h1, h2, [data-foco]');
  if (foco) {
    foco.setAttribute('tabindex', '-1');
    foco.focus({ preventScroll: true });
  }
}

export const telaAtual = () => atual;
