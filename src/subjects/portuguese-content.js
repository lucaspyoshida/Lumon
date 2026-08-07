/**
 * Carregamento do pacote de conteúdo da Etapa 1 de Português.
 *
 * O módulo de português foi escrito para recusar conteúdo não aprovado, e
 * essa recusa continua valendo: nada aqui inventa item, imagem ou áudio. Este
 * arquivo apenas lê o pacote publicado em `content/portugues/etapa-1/` e o
 * valida antes de declarar a etapa pronta.
 *
 * Se o pacote faltar, estiver malformado ou tiver item sem aprovação, o
 * resultado é o mesmo de antes: conteúdo bloqueado, com o motivo declarado.
 */

const CAMINHO_PACOTE = 'content/portugues/etapa-1/package.json';
const CONTRATO = 1;

function motivo(...razoes) {
  return {
    state: 'blocked-content',
    packageId: 'portugues-etapa-1',
    packageVersion: null,
    contentVersion: null,
    reasons: razoes,
  };
}

function itemValido(item) {
  if (!item || typeof item !== 'object') return false;
  if (item.approvalState !== 'approved') return false;
  if (typeof item.id !== 'string' || typeof item.skillId !== 'string') return false;
  if (item.prompt?.type !== 'audio' || typeof item.prompt.audioId !== 'string') return false;
  if (item.response?.type !== 'choice' || !Array.isArray(item.response.options)) return false;
  if (item.response.options.length < 2) return false;
  if (!item.response.options.every((o) => typeof o?.id === 'string' && typeof o?.image === 'string')) {
    return false;
  }
  // A resposta precisa estar entre as alternativas, senão o item é impossível.
  return item.response.options.some((o) => o.id === item.answer);
}

/**
 * @returns {Promise<{contentStatus: object, pacote: object|null}>}
 */
export async function loadPortugueseContent(fetchImpl = globalThis.fetch, base = document?.baseURI) {
  let pacote = null;
  try {
    const url = base ? new URL(CAMINHO_PACOTE, base) : CAMINHO_PACOTE;
    const resposta = await fetchImpl(url);
    if (!resposta.ok) return { contentStatus: motivo('microcorpus-etapa-1-nao-publicado'), pacote: null };
    pacote = await resposta.json();
  } catch {
    return { contentStatus: motivo('microcorpus-etapa-1-nao-publicado'), pacote: null };
  }

  const razoes = [];
  if (typeof pacote?.packageVersion !== 'string' || typeof pacote?.contentVersion !== 'string') {
    razoes.push('microcorpus-etapa-1-nao-publicado');
  }
  if (!pacote?.voice || pacote.voice.origin !== 'sintetizado' || !pacote.voice.license) {
    razoes.push('audio-editorial-pt-br-nao-aprovado');
  }
  if (!pacote?.images?.license) {
    razoes.push('imagens-pedagogicas-nao-aprovadas');
  }
  const itens = Array.isArray(pacote?.items) ? pacote.items.filter(itemValido) : [];
  if (itens.length < 12) razoes.push('microcorpus-etapa-1-nao-publicado');

  if (razoes.length > 0) return { contentStatus: motivo(...new Set(razoes)), pacote: null };

  return {
    contentStatus: {
      state: 'ready',
      packageId: pacote.packageId,
      packageVersion: pacote.packageVersion,
      contentVersion: pacote.contentVersion,
      reasons: [],
    },
    pacote: { ...pacote, items: itens, moduleContractVersion: CONTRATO },
  };
}

/** Referência de áudio no formato que o AudioController exige. */
export function audioRef(pacote, audioId, base = document?.baseURI) {
  if (!pacote || typeof audioId !== 'string') return null;
  const caminho = `${pacote.audioBasePath}/${audioId}.m4a`;
  return {
    approvalState: 'approved',
    url: base ? new URL(caminho, base).href : caminho,
  };
}
