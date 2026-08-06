/**
 * Escolha entre alternativas.
 *
 * É o primeiro formato do aplicativo com correção objetiva: quem julga é o
 * sistema, não a criança. Por isso é ele que produz dados de progresso
 * confiáveis, e é sobre ele que a trilha de português é construída.
 *
 * O enunciado pode ser um som — nesse caso a única pista é auditiva, o que é
 * exatamente o exercício.
 */

import { falar, preparar } from '../audio/player.js';
import { botao } from './dom.js';

export function criarEscolha({ aoResponder }) {
  const raiz = document.createElement('div');
  raiz.className = 'escolha-area';

  const enunciado = document.createElement('button');
  enunciado.type = 'button';
  enunciado.className = 'escolha__enunciado';
  enunciado.setAttribute('aria-label', 'Ouvir de novo');

  const opcoes = document.createElement('div');
  opcoes.className = 'escolha__opcoes';

  raiz.append(enunciado, opcoes);

  let questaoAtual = null;
  let bloqueado = false;

  enunciado.addEventListener('click', () => {
    if (questaoAtual) falar(questaoAtual.audio);
  });

  function mostrar(questao) {
    questaoAtual = questao;
    bloqueado = false;
    opcoes.replaceChildren();

    if (questao.enunciado.tipo === 'audio') {
      enunciado.textContent = '🔊';
      enunciado.classList.add('escolha__enunciado--som');
    } else {
      enunciado.textContent = String(questao.enunciado.valor);
      enunciado.classList.remove('escolha__enunciado--som');
    }

    questao.resposta.opcoes.forEach((opcao) => {
      const btn = botao({
        icone: String(opcao),
        rotulo: String(opcao),
        classe: 'btn--opcao',
        falaAntes: false,
        aoTocar: () => escolher(btn, opcao),
      });
      opcoes.append(btn);
    });

    preparar(questao.resposta.opcoes.map((o) => `letra/${o}`));
    falar(questao.audio);
  }

  function escolher(botaoTocado, opcao) {
    if (bloqueado) return;
    bloqueado = true;
    const acertou = opcao === questaoAtual.valor;
    botaoTocado.classList.add(acertou ? 'btn--certo' : 'btn--errado');

    if (!acertou) {
      // Mostrar qual era a resposta certa importa mais que registrar o erro:
      // é a única chance de aprendizado dentro da questão.
      [...opcoes.children]
        .find((b) => b.textContent.startsWith(String(questaoAtual.valor)))
        ?.classList.add('btn--certo');
    }
    aoResponder(acertou);
  }

  return { raiz, mostrar };
}
