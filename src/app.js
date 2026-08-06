/**
 * Montagem do aplicativo.
 *
 * As telas de menu são construídas a partir de `config/content.js` em vez de
 * ficarem escritas no HTML. Assim, acrescentar uma atividade é acrescentar um
 * objeto — e nenhum botão pode nascer sem ícone e sem áudio, porque a fábrica
 * de botões exige os dois.
 */

import { ATIVIDADES, INSTRUCOES, MODOS } from './config/content.js';
import { criarSessao } from './core/session.js';
import { irPara, registrar } from './core/router.js';
import { botao, botaoOuvirDeNovo, botaoSair, botaoVoltar, limpar, $ } from './ui/dom.js';
import { criarCartao } from './ui/card.js';
import { criarEscolha } from './ui/choice.js';
import { criarFeedback } from './ui/feedback.js';
import { destravar, falar, preparar } from './audio/player.js';
import { registrarServiceWorker } from './pwa/registration.js';

const TITULOS = ['LAIS', 'LUCAS', 'MARIANA', 'SPIKE'];

const sessao = criarSessao();
let atividadeEscolhida = null;
let modoEscolhido = 'sequencial';
let audioInstrucaoAtual = null;

// --- Telas -----------------------------------------------------------------

document.querySelectorAll('.tela').forEach((el) => registrar(el.id, el));

const areaExercicio = $('#area-exercicio');
const progresso = $('#progresso');
const feedback = criarFeedback($('#tela-atividade'));

const cartao = criarCartao({ aoResponder: responder });
const escolha = criarEscolha({ aoResponder: responder });

// --- Menu inicial ----------------------------------------------------------

$('#titulo-principal').textContent = TITULOS[Math.floor(Math.random() * TITULOS.length)];

const containerAtividades = limpar($('#atividades-container'));
ATIVIDADES.forEach((atividade) => {
  containerAtividades.append(
    botao({
      icone: atividade.icone,
      rotulo: atividade.rotulo,
      audio: atividade.audio,
      classe: `btn--atividade btn--${atividade.cor}`,
      aoTocar: () => escolherAtividade(atividade),
    }),
  );
});

function escolherAtividade(atividade) {
  atividadeEscolhida = atividade;
  if (!atividade.escolheModo && atividade.niveis.length === 1) {
    modoEscolhido = 'aleatorio';
    comecar(atividade.niveis[0]);
    return;
  }
  if (atividade.escolheModo) {
    montarModos();
    irPara('tela-modo');
  } else {
    montarNiveis();
    irPara('tela-nivel');
  }
}

// --- Modo ------------------------------------------------------------------

function montarModos() {
  const container = limpar($('#modos-container'));
  $('#modo-titulo').textContent = atividadeEscolhida.rotulo;
  MODOS.forEach((modo) => {
    container.append(
      botao({
        icone: modo.icone,
        rotulo: modo.rotulo,
        audio: modo.audio,
        classe: `btn--modo btn--${atividadeEscolhida.cor}`,
        aoTocar: () => {
          modoEscolhido = modo.id;
          montarNiveis();
          irPara('tela-nivel');
        },
      }),
    );
  });
}

// --- Nível -----------------------------------------------------------------

function montarNiveis() {
  const container = limpar($('#niveis-container'));
  $('#nivel-titulo').textContent = atividadeEscolhida.rotulo;
  atividadeEscolhida.niveis.forEach((nivel) => {
    container.append(
      botao({
        icone: nivel.icone,
        rotulo: nivel.rotulo,
        audio: nivel.audio,
        classe: `btn--nivel btn--${atividadeEscolhida.cor}`,
        aoTocar: () => comecar(nivel),
      }),
    );
  });
}

// --- Atividade -------------------------------------------------------------

function comecar(nivel) {
  audioInstrucaoAtual = INSTRUCOES[atividadeEscolhida.id] ?? 'ui/instr-escolha';
  irPara('tela-atividade');
  sessao.iniciar({ atividade: atividadeEscolhida, nivel, modo: modoEscolhido });
}

sessao.ao('questao', ({ questao, posicao, total }) => {
  progresso.textContent = `${posicao} / ${total}`;
  const componente = questao.resposta.tipo === 'escolha' ? escolha : cartao;
  if (areaExercicio.firstChild !== componente.raiz) {
    limpar(areaExercicio).append(componente.raiz);
  }
  componente.mostrar(questao);
  preparar(sessao.audioDaProxima());
});

function responder(acertou) {
  feedback.mostrar(acertou);
  setTimeout(() => sessao.responder(acertou), 850);
}

sessao.ao('fim', ({ acertos, erros, temErros }) => {
  $('#resumo-acertos').textContent = String(acertos);
  $('#resumo-erros').textContent = String(erros);
  $('#btn-treinar-erros').hidden = !temErros;
  irPara('tela-fim');
  falar(erros === 0 ? 'ui/fim-perfeito' : 'ui/fim');
});

// --- Barras de ação --------------------------------------------------------

$('#acoes-atividade').append(
  botaoOuvirDeNovo(() => {
    const atual = sessao.atual();
    falar(atual ? atual.questao.audio : audioInstrucaoAtual);
  }),
  botaoSair(() => irPara('tela-inicio')),
);

$('#voltar-modo').append(botaoVoltar(() => irPara('tela-inicio')));
$('#voltar-nivel').append(
  botaoVoltar(() => irPara(atividadeEscolhida?.escolheModo ? 'tela-modo' : 'tela-inicio')),
);

const acoesFim = limpar($('#acoes-fim'));
const btnTreinar = botao({
  icone: '🔁', rotulo: 'Praticar de novo', audio: 'ui/treinar-erros',
  classe: 'btn--fim', falaAntes: false,
  aoTocar: () => { irPara('tela-atividade'); sessao.repetirErros(); },
});
btnTreinar.id = 'btn-treinar-erros';
acoesFim.append(
  btnTreinar,
  botao({
    icone: '🔄', rotulo: 'Jogar outra vez', audio: 'ui/recomecar',
    classe: 'btn--fim', falaAntes: false,
    aoTocar: () => { irPara('tela-atividade'); sessao.repetirTudo(); },
  }),
  botao({
    icone: '🏠', rotulo: 'Voltar ao início', audio: 'ui/sair',
    classe: 'btn--fim', falaAntes: false,
    aoTocar: () => irPara('tela-inicio'),
  }),
);

// --- Início ----------------------------------------------------------------

// O primeiro toque em qualquer lugar libera o áudio no iOS.
document.addEventListener('pointerdown', destravar, { once: true });

irPara('tela-inicio');
registrarServiceWorker();
