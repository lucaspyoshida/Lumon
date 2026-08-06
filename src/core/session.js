/**
 * Sessão de prática.
 *
 * Guarda a fila de questões, a pontuação e os erros. Não sabe desenhar nada:
 * a interface se inscreve nos eventos e reage. Essa separação é o que permite
 * testar a progressão sem navegador.
 */

import { criarRandom, embaralhar } from './rng.js';
import { gerarQuestoes } from '../generators/index.js';
import { QUESTOES_POR_SESSAO } from '../config/content.js';
import { registrarResultado, registrarUltimoJogo } from '../storage/repository.js';

export function criarSessao() {
  let estado = null;
  const ouvintes = { questao: [], fim: [] };

  const emitir = (evento, dados) => ouvintes[evento].forEach((fn) => fn(dados));

  function iniciar({ atividade, nivel, modo, semente }) {
    const random = criarRandom(semente ?? Date.now());
    const questoes = gerarQuestoes({
      atividadeId: atividade.id,
      nivel,
      modo,
      limite: QUESTOES_POR_SESSAO,
      random,
    });
    estado = { atividade, nivel, modo, questoes, indice: 0, acertos: 0, erros: 0, errouEstas: [] };
    registrarUltimoJogo(atividade.id, modo, nivel);
    emitir('questao', atual());
  }

  /** Repete só o que a criança errou. Sempre embaralhado. */
  function repetirErros() {
    if (!estado || estado.errouEstas.length === 0) return;
    const questoes = embaralhar(estado.errouEstas, criarRandom(Date.now()));
    estado = { ...estado, questoes, indice: 0, acertos: 0, erros: 0, errouEstas: [] };
    emitir('questao', atual());
  }

  function repetirTudo() {
    if (!estado) return;
    iniciar({ atividade: estado.atividade, nivel: estado.nivel, modo: estado.modo });
  }

  function atual() {
    if (!estado || estado.indice >= estado.questoes.length) return null;
    return {
      questao: estado.questoes[estado.indice],
      posicao: estado.indice + 1,
      total: estado.questoes.length,
      atividade: estado.atividade,
    };
  }

  function responder(acertou) {
    if (!estado) return;
    const questao = estado.questoes[estado.indice];
    if (acertou) {
      estado.acertos += 1;
    } else {
      estado.erros += 1;
      estado.errouEstas.push(questao);
    }
    registrarResultado(questao.habilidade, acertou);
    estado.indice += 1;

    const proxima = atual();
    if (proxima) {
      emitir('questao', proxima);
    } else {
      emitir('fim', {
        acertos: estado.acertos,
        erros: estado.erros,
        total: estado.questoes.length,
        temErros: estado.errouEstas.length > 0,
      });
    }
  }

  /** Clipes da próxima questão, para pré-carregar e evitar atraso na fala. */
  function audioDaProxima() {
    if (!estado) return [];
    return estado.questoes[estado.indice + 1]?.audio ?? [];
  }

  return {
    iniciar,
    responder,
    repetirErros,
    repetirTudo,
    atual,
    audioDaProxima,
    ao: (evento, fn) => ouvintes[evento].push(fn),
  };
}
