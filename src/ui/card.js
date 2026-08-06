/**
 * Cartão de autoavaliação.
 *
 * Mantém o gesto de arrastar, que a criança já conhece, mas ele deixa de ser
 * a única forma de responder: dois botões grandes fazem o mesmo. Aos 4 anos a
 * coordenação para arrastar com precisão ainda está em formação, e um gesto
 * que falha é lido pela criança como erro dela.
 */

import { botao } from './dom.js';
import { falar } from '../audio/player.js';

const LIMIAR_ARRASTE = 90;

export function criarCartao({ aoResponder }) {
  const raiz = document.createElement('div');
  raiz.className = 'cartao-area';

  const container = document.createElement('div');
  container.className = 'cartao-container';

  const cartao = document.createElement('div');
  cartao.className = 'cartao';

  const frente = document.createElement('div');
  frente.className = 'cartao__face cartao__face--frente';

  const verso = document.createElement('div');
  verso.className = 'cartao__face cartao__face--verso';

  cartao.append(frente, verso);
  container.append(cartao);

  const acoes = document.createElement('div');
  acoes.className = 'acoes-resposta';
  const btnPraticar = botao({
    icone: '🔁', rotulo: 'Praticar mais', classe: 'btn--praticar',
    aoTocar: () => responder(false), falaAntes: false,
  });
  const btnAcertei = botao({
    icone: '✅', rotulo: 'Acertei', classe: 'btn--acertei',
    aoTocar: () => responder(true), falaAntes: false,
  });
  acoes.append(btnPraticar, btnAcertei);

  raiz.append(container, acoes);

  let podeVirar = false;
  let arrastando = false;
  let inicioX = 0;
  let deltaX = 0;
  let ehToque = true;
  let bloqueado = false;

  function responder(acertou) {
    if (bloqueado) return;
    bloqueado = true;
    container.style.transition = 'transform 0.35s ease';
    container.style.transform = `translateX(${acertou ? '480px' : '-480px'}) rotate(${acertou ? 22 : -22}deg)`;
    aoResponder(acertou);
  }

  function inicio(evento) {
    if (bloqueado) return;
    arrastando = true;
    ehToque = true;
    inicioX = evento.type.includes('mouse') ? evento.pageX : evento.touches[0].pageX;
    deltaX = 0;
    container.style.transition = 'none';
  }

  function mover(evento) {
    if (!arrastando || bloqueado) return;
    const x = evento.type.includes('mouse') ? evento.pageX : evento.touches[0].pageX;
    deltaX = x - inicioX;
    if (Math.abs(deltaX) > 16) ehToque = false;
    if (!ehToque) {
      evento.preventDefault();
      container.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 22}deg)`;
    }
  }

  function fim() {
    if (!arrastando || bloqueado) return;
    arrastando = false;
    if (ehToque) {
      if (podeVirar) cartao.classList.toggle('virado');
      return;
    }
    container.style.transition = 'transform 0.3s ease';
    if (Math.abs(deltaX) > LIMIAR_ARRASTE) {
      responder(deltaX > 0);
    } else {
      container.style.transform = 'translateX(0) rotate(0deg)';
    }
  }

  container.addEventListener('mousedown', inicio);
  document.addEventListener('mousemove', mover);
  document.addEventListener('mouseup', fim);
  container.addEventListener('touchstart', inicio, { passive: true });
  document.addEventListener('touchmove', mover, { passive: false });
  document.addEventListener('touchend', fim);

  /** Mostra uma questão nova e devolve o cartão à posição inicial. */
  function mostrar(questao) {
    bloqueado = false;
    podeVirar = Boolean(questao.resposta.viraCartao);

    const { enunciado } = questao;
    if (enunciado.tipo === 'expressao') {
      frente.textContent = `${enunciado.esquerda} ${enunciado.operador === '+' ? '+' : '−'} ${enunciado.direita}`;
    } else {
      frente.textContent = String(enunciado.valor);
    }
    verso.textContent = String(questao.valor);

    cartao.style.transition = 'none';
    container.style.transition = 'none';
    cartao.classList.remove('virado');
    container.style.transform = 'translateX(0) rotate(0deg)';
    void cartao.offsetHeight; // força o navegador a aplicar antes de reanimar
    cartao.style.transition = '';
    container.style.transition = '';

    raiz.classList.toggle('cartao-area--vira', podeVirar);
    falar(questao.audio);
  }

  return { raiz, mostrar };
}
