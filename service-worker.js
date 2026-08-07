importScripts('./src/pwa/release-integrity.js');

const CACHE_PREFIX = 'lumon-shell-';
const EXPECTED_RELEASE_ID = 'b678735fc699b8eb27147c0e9dfa2a7e7dd4251889d921aeadb0f9e8d7cadf3b';
const CACHE_NAME = `${CACHE_PREFIX}${EXPECTED_RELEASE_ID}`;
const RELEASE_MANIFEST_PATH = './release-manifest.json';

const scopedUrl = (path) => new URL(path, self.registration.scope).toString();

const MEDIA_PREFIX = 'lumon-media-';
const MEDIA_CACHE = `${MEDIA_PREFIX}${EXPECTED_RELEASE_ID}`;
const ehMidiaDeConteudo = (url) => /\/(audio\/pt|images\/pt)\//.test(url.pathname);

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try {
      const release = await self.LumonReleaseIntegrity.fetchVerifiedRelease({
        manifestUrl: scopedUrl(RELEASE_MANIFEST_PATH),
        expectedReleaseId: EXPECTED_RELEASE_ID,
      });
      const cache = await caches.open(CACHE_NAME);
      for (const [url, response] of release.responses) await cache.put(url, response);
      await cache.put(scopedUrl(RELEASE_MANIFEST_PATH), release.manifestResponse);
    } catch (error) {
      await caches.delete(CACHE_NAME);
      throw error;
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        const lumonCaches = keys.filter((key) => key.startsWith(CACHE_PREFIX)).sort().reverse();
        const retained = new Set([CACHE_NAME, ...lumonCaches.filter((key) => key !== CACHE_NAME).slice(0, 1)]);
        // O cache de mídia também é versionado por release; sem esta limpeza
        // ele se acumularia a cada publicação, ocupando espaço para sempre.
        const midiaObsoleta = keys.filter((key) => key.startsWith(MEDIA_PREFIX) && key !== MEDIA_CACHE);
        return Promise.all([...keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && !retained.has(key)), ...midiaObsoleta]
          .map((key) => caches.delete(key)));
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'LUMON_SKIP_WAITING') self.skipWaiting();
});

async function navigationResponse(request) {
  const cache = await caches.open(CACHE_NAME);
  return (await cache.match(scopedUrl('./index.htm')))
    ?? fetch(request).catch(() => new Response('Lumon indisponível offline.', { status: 503 }));
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  return fetch(request).catch(() => new Response('Recurso indisponível offline.', { status: 503 }));
}

// O áudio e as figuras de português ficam fora do shell verificado: somam
// cerca de 340 KB e estourariam o limite de tamanho do shell. Em vez disso
// entram no cache na primeira vez que são usados, o que também evita baixar
// as 24 figuras de quem só pratica matemática.
async function mediaCacheFirst(request) {
  const cache = await caches.open(MEDIA_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    return new Response('Recurso indisponível offline.', { status: 503 });
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(navigationResponse(request));
    return;
  }
  if (ehMidiaDeConteudo(url)) {
    event.respondWith(mediaCacheFirst(request));
    return;
  }
  if (url.href.startsWith(self.registration.scope)) event.respondWith(cacheFirst(request));
});
