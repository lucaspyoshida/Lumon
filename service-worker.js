const CACHE_PREFIX = 'lumon-shell-';
const CACHE_NAME = `${CACHE_PREFIX}2026-07-17-05`;
const SHELL_ASSETS = [
  './',
  './index.htm',
  './manifest.json',
  './favicon.ico',
  './images/icon-192x192.png',
  './images/icon-512x512.png',
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
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'LUMON_SKIP_WAITING') self.skipWaiting();
});

async function navigationResponse(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(scopedUrl('./index.htm'), response.clone());
    }
    return response;
  } catch {
    return caches.match(scopedUrl('./index.htm'));
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const refresh = fetch(request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  if (cached) {
    void refresh;
    return cached;
  }
  return (await refresh) ?? new Response('Recurso indisponível offline.', { status: 503 });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(navigationResponse(request));
    return;
  }
  if (url.href.startsWith(self.registration.scope)) event.respondWith(staleWhileRevalidate(request));
});
