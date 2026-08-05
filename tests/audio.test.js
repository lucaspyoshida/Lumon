/**
 * Integridade do banco de áudio.
 *
 * A criança não lê: um clipe faltando não degrada a experiência, ela impede
 * a criança de entender o que fazer. E a falha é silenciosa — o aplicativo
 * continua funcionando, só fica mudo naquele ponto.
 *
 * Este teste percorre tudo que o código pode pedir para falar e confere
 * contra o manifesto gerado. É a rede de proteção contra um id digitado
 * errado ou um item removido do corpus sem que o código soubesse.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { criarRandom } from '../src/core/rng.js';
import {
  ATIVIDADES,
  AUDIO_INTERFACE,
  FALAS_ACERTO,
  FALAS_ERRO,
  INSTRUCOES,
  MODOS,
} from '../src/config/content.js';
import { gerarQuestoes } from '../src/generators/index.js';

const caminho = (rel) => fileURLToPath(new URL(rel, import.meta.url));
const manifesto = JSON.parse(readFileSync(caminho('../audio/manifest.json'), 'utf-8'));
const corpus = JSON.parse(readFileSync(caminho('../content/pt/corpus.json'), 'utf-8'));
const disponiveis = new Set(Object.keys(manifesto.clipes));

const comoLista = (a) => (Array.isArray(a) ? a : [a]).filter(Boolean);

test('o manifesto cobre todos os itens do corpus', () => {
  for (const item of corpus.itens) {
    assert.ok(disponiveis.has(item.id), `faltou gerar o clipe "${item.id}"`);
  }
});

test('todo botão de menu, modo e nível tem áudio existente', () => {
  for (const atividade of ATIVIDADES) {
    for (const id of comoLista(atividade.audio)) {
      assert.ok(disponiveis.has(id), `atividade "${atividade.id}" pede áudio inexistente: ${id}`);
    }
    for (const nivel of atividade.niveis) {
      for (const id of comoLista(nivel.audio)) {
        assert.ok(disponiveis.has(id), `nível "${nivel.id}" pede áudio inexistente: ${id}`);
      }
    }
  }
  for (const modo of MODOS) {
    for (const id of comoLista(modo.audio)) {
      assert.ok(disponiveis.has(id), `modo "${modo.id}" pede áudio inexistente: ${id}`);
    }
  }
});

test('instruções, feedback e áudio de interface existem', () => {
  for (const id of [...Object.values(INSTRUCOES), ...FALAS_ACERTO, ...FALAS_ERRO, ...AUDIO_INTERFACE]) {
    assert.ok(disponiveis.has(id), `áudio de interface inexistente: ${id}`);
  }
});

test('toda atividade tem instrução falada', () => {
  for (const atividade of ATIVIDADES) {
    assert.ok(INSTRUCOES[atividade.id], `atividade "${atividade.id}" não tem instrução falada`);
  }
});

test('toda questão gerável pede apenas áudio que existe', () => {
  for (const atividade of ATIVIDADES) {
    for (const nivel of atividade.niveis) {
      for (const modo of ['sequencial', 'aleatorio']) {
        const questoes = gerarQuestoes({
          atividadeId: atividade.id, nivel, modo, limite: 999, random: criarRandom(1),
        });
        assert.ok(questoes.length > 0, `nenhuma questão para ${atividade.id}/${nivel.id}`);
        for (const questao of questoes) {
          for (const id of questao.audio) {
            assert.ok(disponiveis.has(id),
              `${atividade.id}/${nivel.id} pede áudio inexistente: ${id}`);
          }
        }
      }
    }
  }
});

test('todo botão do catálogo tem ícone e rótulo', () => {
  for (const atividade of ATIVIDADES) {
    assert.ok(atividade.icone, `atividade "${atividade.id}" sem ícone`);
    assert.ok(atividade.rotulo, `atividade "${atividade.id}" sem rótulo`);
    for (const nivel of atividade.niveis) {
      assert.ok(nivel.icone, `nível "${nivel.id}" sem ícone`);
      assert.ok(nivel.rotulo, `nível "${nivel.id}" sem rótulo`);
    }
  }
});
