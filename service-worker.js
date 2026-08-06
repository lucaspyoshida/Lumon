/**
 * Service worker do Lumon.
 *
 * A versão anterior nunca chegava a instalar: a lista de pré-cache continha
 * `/images/feliz.png` em caminho absoluto, que na hospedagem atual resolve
 * para fora de `/Lumon/` e devolve 404. Como `cache.addAll()` rejeita inteiro
 * se um único item falhar, o `install` falhava e o modo offline nunca
 * funcionou — silenciosamente, porque com rede o aplicativo carrega igual.
 *
 * Aqui todos os caminhos são relativos ao escopo do worker.
 */

const VERSAO = 'lumon-v9';
const PREFIXO = 'lumon-';

// Só o essencial para a primeira tela abrir offline. O áudio das atividades
// entra no cache conforme é usado — são 90 arquivos, e pré-carregar todos
// deixaria a instalação lenta demais.
const ESSENCIAIS = [
  './',
  'index.html',
  'style.css',
  'manifest.json',
  'favicon.ico',
  'src/app.js',
  'src/config/content.js',
  'src/core/rng.js',
  'src/core/router.js',
  'src/core/session.js',
  'src/generators/index.js',
  'src/storage/repository.js',
  'src/audio/player.js',
  'src/ui/dom.js',
  'src/ui/card.js',
  'src/ui/choice.js',
  'src/ui/feedback.js',
  'src/pwa/registration.js',
  'audio/manifest.json',
  'images/feliz.png',
  'images/triste.png',
  'images/icon-192x192.png',
  'images/icon-512x512.png',
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(VERSAO).then(async (cache) => {
      // Um item indisponível não pode mais derrubar a instalação inteira.
      await Promise.all(
        ESSENCIAIS.map((url) =>
          cache.add(url).catch(() => console.warn('[sw] não foi possível cachear', url)),
        ),
      );
      await self.skipWaiting();
    }),
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then(async (nomes) => {
      // Apagar apenas caches do próprio Lumon: outras páginas na mesma origem
      // podem ter caches, e a versão anterior removia todos.
      await Promise.all(
        nomes.filter((n) => n.startsWith(PREFIXO) && n !== VERSAO).map((n) => caches.delete(n)),
      );
      await self.clients.claim();
    }),
  );
});

self.addEventListener('fetch', (evento) => {
  const { request } = evento;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Áudio e imagens não mudam sem mudar de nome: servir do cache é sempre
  // correto e evita rede em cada questão.
  const estatico = /\.(m4a|png|ico|svg)$/.test(url.pathname);

  if (estatico) {
    evento.respondWith(
      caches.match(request).then(
        (achado) =>
          achado ||
          fetch(request).then((resposta) => {
            if (resposta.ok) {
              const copia = resposta.clone();
              caches.open(VERSAO).then((cache) => cache.put(request, copia));
            }
            return resposta;
          }),
      ),
    );
    return;
  }

  // Código e marcação usam stale-while-revalidate: abre instantâneo pelo
  // cache e atualiza em segundo plano para a próxima abertura.
  evento.respondWith(
    caches.match(request).then((achado) => {
      const rede = fetch(request)
        .then((resposta) => {
          if (resposta.ok) {
            const copia = resposta.clone();
            caches.open(VERSAO).then((cache) => cache.put(request, copia));
          }
          return resposta;
        })
        .catch(() => achado);
      return achado || rede;
    }),
  );
});
