/**
 * Reprodução de áudio.
 *
 * A criança não sabe ler: o som não é enfeite, é o principal canal de
 * instrução do aplicativo. Por isso este módulo precisa ser confiável.
 *
 * Usa Web Audio em vez de <audio> por dois motivos: permite encadear clipes
 * com pausa precisa entre eles (necessário para falar "três — mais — dois")
 * e evita a latência de criar elementos novos a cada fala.
 *
 * No iOS, qualquer áudio exige que o contexto seja retomado dentro de um
 * gesto do usuário. `destravar()` é chamado no primeiro toque da sessão.
 */

import { lerPreferencias } from '../storage/repository.js';

const BASE = new URL('../../audio/', import.meta.url);

let contexto = null;
let manifesto = null;
let destravado = false;
const buffers = new Map();
let tocandoAgora = null;

async function carregarManifesto() {
  if (manifesto) return manifesto;
  try {
    const resposta = await fetch(new URL('manifest.json', BASE));
    manifesto = (await resposta.json()).clipes ?? {};
  } catch {
    manifesto = {};
  }
  return manifesto;
}

function garantirContexto() {
  if (!contexto) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    contexto = new Ctx();
  }
  return contexto;
}

/** Chamar no primeiro gesto do usuário. Sem isso, o iOS não toca nada. */
export function destravar() {
  if (destravado) return;
  const ctx = garantirContexto();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  // Um buffer silencioso de um frame basta para o iOS considerar o contexto
  // "iniciado por gesto".
  const mudo = ctx.createBufferSource();
  mudo.buffer = ctx.createBuffer(1, 1, 22050);
  mudo.connect(ctx.destination);
  mudo.start(0);
  destravado = true;
  carregarManifesto();
}

async function obterBuffer(id) {
  if (buffers.has(id)) return buffers.get(id);
  const clipes = await carregarManifesto();
  const clipe = clipes[id];
  if (!clipe) return null;
  const ctx = garantirContexto();
  if (!ctx) return null;
  try {
    const resposta = await fetch(new URL(clipe.arquivo, BASE));
    const dados = await resposta.arrayBuffer();
    const buffer = await ctx.decodeAudioData(dados);
    buffers.set(id, buffer);
    return buffer;
  } catch {
    buffers.set(id, null);
    return null;
  }
}

/** Baixa e decodifica clipes com antecedência, para a fala sair sem atraso. */
export function preparar(ids) {
  ids.filter(Boolean).forEach((id) => obterBuffer(id));
}

export function parar() {
  if (tocandoAgora) {
    tocandoAgora.cancelado = true;
    tocandoAgora.fontes.forEach((f) => {
      try {
        f.stop();
      } catch {
        /* já terminou */
      }
    });
    tocandoAgora = null;
  }
}

/**
 * Fala um clipe ou uma sequência deles, em ordem, com uma pequena pausa
 * entre cada um. Interrompe qualquer fala anterior.
 *
 * @param {string|string[]} ids
 * @param {{pausa?: number}} opcoes pausa entre clipes, em segundos
 * @returns {Promise<void>} resolve quando a fala termina
 */
export async function falar(ids, { pausa = 0.12 } = {}) {
  const lista = (Array.isArray(ids) ? ids : [ids]).filter(Boolean);
  if (lista.length === 0) return;
  if (!lerPreferencias().som) return;

  parar();
  const ctx = garantirContexto();
  if (!ctx) return;
  if (ctx.state === 'suspended') await ctx.resume();

  const sessao = { cancelado: false, fontes: [] };
  tocandoAgora = sessao;

  const listaBuffers = await Promise.all(lista.map(obterBuffer));
  if (sessao.cancelado) return;

  let instante = ctx.currentTime + 0.05;
  for (const buffer of listaBuffers) {
    if (!buffer) continue;
    const fonte = ctx.createBufferSource();
    fonte.buffer = buffer;
    fonte.connect(ctx.destination);
    fonte.start(instante);
    sessao.fontes.push(fonte);
    instante += buffer.duration + pausa;
  }

  const espera = Math.max(0, (instante - ctx.currentTime) * 1000);
  await new Promise((resolve) => setTimeout(resolve, espera));
  if (tocandoAgora === sessao) tocandoAgora = null;
}

/** Fala um dos clipes da lista, escolhido ao acaso. Evita repetição cansativa. */
export function falarUmDentre(ids) {
  const escolhido = ids[Math.floor(Math.random() * ids.length)];
  return falar(escolhido);
}

export function estaDisponivel(id) {
  return Boolean(manifesto && manifesto[id]);
}
