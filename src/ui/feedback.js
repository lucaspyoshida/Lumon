/**
 * Feedback de acerto e erro.
 *
 * Nunca só por cor: imagem, som e movimento juntos. A fala varia entre
 * quatro alternativas para acerto e três para erro, porque uma criança que
 * ouve exatamente a mesma frase oito vezes por sessão para de escutá-la.
 *
 * O erro nunca é punido — "Quase!", nunca "Errado".
 */

import { falarUmDentre } from '../audio/player.js';
import { FALAS_ACERTO, FALAS_ERRO } from '../config/content.js';

export function criarFeedback(hospedeiro) {
  const acerto = document.createElement('div');
  acerto.className = 'feedback feedback--acerto';
  acerto.innerHTML = '<img src="images/feliz.png" alt="">';

  const erro = document.createElement('div');
  erro.className = 'feedback feedback--erro';
  erro.innerHTML = '<img src="images/triste.png" alt="">';

  const aviso = document.createElement('p');
  aviso.className = 'sr-only';
  aviso.setAttribute('role', 'status');
  aviso.setAttribute('aria-live', 'polite');

  hospedeiro.append(acerto, erro, aviso);

  function mostrar(acertou) {
    const alvo = acertou ? acerto : erro;
    alvo.classList.add('visivel');
    aviso.textContent = acertou ? 'Acertou' : 'Vamos praticar mais';
    falarUmDentre(acertou ? FALAS_ACERTO : FALAS_ERRO);
    setTimeout(() => alvo.classList.remove('visivel'), 900);
  }

  return { mostrar };
}
