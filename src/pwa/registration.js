/**
 * Registro do service worker.
 *
 * O registro antigo usava o caminho absoluto `/Lumon/service-worker.js`, que
 * só funciona na hospedagem atual e quebra em qualquer outro endereço,
 * inclusive num servidor local de desenvolvimento. Aqui o caminho é derivado
 * do próprio documento, então funciona igual nos dois casos.
 */

export function registrarServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    const url = new URL('service-worker.js', document.baseURI);
    navigator.serviceWorker.register(url).catch(() => {
      // Falhar aqui só significa ficar sem modo offline; o aplicativo segue.
    });
  });
}
