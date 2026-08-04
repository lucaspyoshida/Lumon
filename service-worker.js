const CACHE_PREFIX = 'lumon-shell-';
const CACHE_NAME = `${CACHE_PREFIX}2026-08-04-g4-01`;
const SHELL_ASSETS = [
  './',
  './index.htm',
  './manifest.json',
  './images/favicon-48.png',
  './images/icon-192x192.png',
  './images/icon-512x512.png',
  './images/capybara/welcome.webp',
  './images/capybara/complete.webp',
  './images/capybara/trail-marker-256.png',
  './styles/tokens.css',
  './styles/base.css',
  './styles/components.css',
  './styles/screens.css',
  './styles/accessibility.css',
  './src/app.js',
  './src/config/levels.js',
  './src/core/progression.js',
  './src/core/session.js',
  './src/generators/index.js',
  './src/generators/random.js',
  './src/generators/options.js',
  './src/generators/numbers.js',
  './src/generators/sequences.js',
  './src/generators/operations.js',
  './src/storage/repository.js',
  './src/storage/schema-v2.js',
  './src/storage/repository-v2.js',
  './src/subjects/portuguese.js',
  './src/subjects/registry.js',
  './src/media/audio-controller.js',
  './src/pwa/registration.js'
];

const scopedUrl = (path) => new URL(path, self.registration.scope).toString();

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS.map(scopedUrl)))
  );
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
