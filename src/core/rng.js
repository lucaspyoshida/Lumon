/**
 * Aleatoriedade determinística.
 *
 * O código antigo embaralhava com `sort(() => Math.random() - 0.5)`, que é
 * enviesado — algumas ordens saem muito mais que outras — e impossível de
 * testar. Aqui o embaralhamento é Fisher-Yates e a fonte aleatória é
 * injetável, então um teste pode fixar a semente e prever o resultado.
 */

/** Gerador mulberry32: rápido, determinístico, suficiente para o caso. */
export function criarRandom(semente = Date.now()) {
  let a = semente >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates. Não modifica a lista original. */
export function embaralhar(lista, random = Math.random) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/** Item aleatório da lista. */
export function sortear(lista, random = Math.random) {
  return lista[Math.floor(random() * lista.length)];
}

/** `quantidade` itens distintos da lista, em ordem aleatória. */
export function sortearVarios(lista, quantidade, random = Math.random) {
  return embaralhar(lista, random).slice(0, quantidade);
}
