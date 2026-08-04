importScripts('./src/pwa/release-integrity.js');

const CACHE_PREFIX = 'lumon-shell-';
const EXPECTED_RELEASE_ID = '59c683101a944d656d0904897ea573c85651c7ef740cf9282c1a162f76c70ca3';
const CACHE_NAME = `${CACHE_PREFIX}${EXPECTED_RELEASE_ID}`;
const RELEASE_MANIFEST_PATH = './release-manifest.json';

const scopedUrl = (path) => new URL(path, self.registration.scope).toString();

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
        return Promise.all(keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && !retained.has(key))
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

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(navigationResponse(request));
    return;
  }
  if (url.href.startsWith(self.registration.scope)) event.respondWith(cacheFirst(request));
});
