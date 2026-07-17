export async function registerPwa({ onUpdate = () => {} } = {}) {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const serviceWorkerUrl = new URL('../../service-worker.js', import.meta.url);
    const scopeUrl = new URL('../../', import.meta.url);
    const registration = await navigator.serviceWorker.register(serviceWorkerUrl, { scope: scopeUrl });

    const notifyIfWaiting = () => {
      if (registration.waiting && navigator.serviceWorker.controller) onUpdate(registration);
    };
    const watchInstallingWorker = (worker) => {
      if (!worker) return;
      const checkState = () => {
        if (worker.state === 'installed') notifyIfWaiting();
      };
      worker.addEventListener('statechange', checkState);
      checkState();
    };
    notifyIfWaiting();
    watchInstallingWorker(registration.installing);
    registration.addEventListener('updatefound', () => {
      watchInstallingWorker(registration.installing);
    });
    return registration;
  } catch {
    document.documentElement.dataset.pwa = 'unavailable';
    return null;
  }
}

export function activateWaitingWorker(registration) {
  registration?.waiting?.postMessage({ type: 'LUMON_SKIP_WAITING' });
}
