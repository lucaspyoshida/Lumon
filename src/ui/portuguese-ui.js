/**
 * Interface da Etapa 1 de Português — ouvir a palavra e achar a figura.
 *
 * Vive em módulo próprio e recebe o que precisa por parâmetro, para que o
 * fluxo de matemática, que já está aprovado e testado, não seja tocado.
 *
 * Reaproveita a tela de atividade existente em vez de criar outra: a criança
 * já conhece o lugar do botão de sair e da barra de progresso, e mudar isso
 * por conveniência de código seria trocar familiaridade por arquitetura.
 */

import { evaluatePortugueseAttempt } from '../subjects/portuguese.js';
import { audioRef } from '../subjects/portuguese-content.js';
import {
  completeSession,
  createPortugueseSession,
  currentQuestion,
  moveToNext,
  recordAttempt,
  summarize,
} from '../subjects/portuguese-session.js';

const CELEBRACOES = ['ui/celebrate-1', 'ui/celebrate-2', 'ui/celebrate-3'];
const RETENTATIVAS = ['ui/retry-1', 'ui/retry-2'];

export function createPortugueseUi({ elements, audio, showScreen, onExit, getSessionLength, persistSession }) {
  let pacote = null;
  let sessao = null;
  let respondida = false;

  const setPacote = (novo) => { pacote = novo; };

  function tocar(audioId) {
    const ref = audioRef(pacote, audioId);
    // O controlador exige gesto explícito: som nunca começa sozinho.
    return audio.play(ref, { explicitGesture: true });
  }

  function comecar(sessoesConcluidas) {
    sessao = createPortugueseSession({
      pacote,
      count: getSessionLength(),
      seed: `pt-${Date.now()}`,
      sessoesConcluidas,
    });
    renderQuestao();
  }

  function renderQuestao() {
    respondida = false;
    const questao = currentQuestion(sessao);
    if (!questao) return void finalizar();

    elements['activity-title'].textContent = 'Ouvir e encontrar';
    elements['activity-instruction'].textContent = 'Escute a palavra e toque na figura certa.';
    elements['stage-label'].textContent = 'Português — Etapa 1';
    elements['session-progress'].textContent = `Questão ${sessao.index + 1} de ${sessao.questoes.length}`;
    elements['progress-fill'].style.width = `${(sessao.index / sessao.questoes.length) * 100}%`;
    elements.feedback.className = 'feedback';
    elements.feedback.textContent = '';
    elements['next-question'].hidden = true;

    elements.prompt.replaceChildren(botaoSom(questao));
    elements['response-area'].replaceChildren(gradeDeFiguras(questao));

    showScreen('activity-screen', 'Ouvir e encontrar. Toque no alto-falante para escutar a palavra.');
    elements.prompt.querySelector('button')?.focus();
  }

  function botaoSom(questao) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'pt-som';
    botao.setAttribute('aria-label', 'Ouvir a palavra');
    botao.textContent = '🔊';
    botao.addEventListener('click', () => { void tocar(questao.item.prompt.audioId); });
    return botao;
  }

  function gradeDeFiguras(questao) {
    const grade = document.createElement('div');
    grade.className = 'pt-figuras';
    for (const opcao of questao.options) {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'pt-figura';
      botao.dataset.opcao = opcao.id;
      // A criança não lê: o nome existe só para leitor de tela e para o adulto.
      botao.setAttribute('aria-label', opcao.label);
      const img = document.createElement('img');
      img.src = opcao.image;
      img.alt = '';
      img.width = 128;
      img.height = 128;
      botao.append(img);
      botao.addEventListener('click', () => responder(opcao.id));
      grade.append(botao);
    }
    return grade;
  }

  function responder(escolha) {
    if (respondida) return;
    const questao = currentQuestion(sessao);
    const avaliacao = evaluatePortugueseAttempt({
      item: questao.item,
      rawResponse: escolha,
      attemptNumber: sessao.attemptNumber,
    });

    if (avaliacao.status === 'incorrect' && sessao.attemptNumber === 1) {
      // Uma segunda chance antes de revelar: errar por desatenção não é o
      // mesmo que não saber, e a criança percebe a diferença.
      sessao.attemptNumber += 1;
      elements.feedback.className = 'feedback review';
      elements.feedback.textContent = 'Quase! Escute mais uma vez e tente outra figura.';
      void tocar(RETENTATIVAS[0]);
      marcar(escolha, false);
      return;
    }

    respondida = true;
    recordAttempt(sessao, avaliacao);
    const acertou = avaliacao.status === 'correct';
    marcar(escolha, acertou);
    if (!acertou) marcarCorreta(questao.item.answer);

    elements.feedback.className = `feedback ${acertou ? 'success' : 'review'}`;
    elements.feedback.textContent = acertou
      ? 'Muito bem — é essa mesmo!'
      : 'Boa tentativa. Esta volta na revisão.';
    void tocar(acertou ? CELEBRACOES[Math.floor(Math.random() * CELEBRACOES.length)] : RETENTATIVAS[1]);

    for (const botao of elements['response-area'].querySelectorAll('button')) botao.disabled = true;
    elements['next-question'].hidden = false;
    elements['next-question'].textContent = sessao.index === sessao.questoes.length - 1
      ? 'Ver resultado'
      : 'Próxima';
    elements['next-question'].focus();
  }

  function marcar(opcaoId, correta) {
    const botao = elements['response-area'].querySelector(`[data-opcao="${CSS.escape(opcaoId)}"]`);
    botao?.classList.add(correta ? 'correct' : 'incorrect');
  }

  const marcarCorreta = (opcaoId) => marcar(opcaoId, true);

  function proxima() {
    if (sessao.index === sessao.questoes.length - 1) return void finalizar();
    moveToNext(sessao);
    renderQuestao();
  }

  async function finalizar() {
    completeSession(sessao);
    const resumo = summarize(sessao);
    await persistSession(sessao);
    void tocar('ui/fim');

    elements['result-score'].textContent = `${resumo.acertos} de ${resumo.total}`;
    elements['result-skill'].textContent = 'Português — ouvir e encontrar';
    elements.recommendation.textContent = resumo.erros === 0
      ? 'Você acertou tudo. Dá para praticar de novo quando quiser.'
      : 'Alguns itens voltam na revisão. Nada foi contado como falha.';
    elements['result-review'].hidden = true;
    showScreen('result-screen', 'Fim da prática de português.');
    sessao = null;
  }

  function sair() {
    sessao = null;
    onExit();
  }

  return {
    setPacote,
    comecar,
    proxima,
    sair,
    emSessao: () => sessao !== null,
  };
}
