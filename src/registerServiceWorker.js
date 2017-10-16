// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

export default function register() {
  if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;

  const [swUrl, sWorker] = [`${process.env.PUBLIC_URL}/service-worker.js`, navigator.serviceWorker];

  window.addEventListener('load', () => {
    sWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;

          installingWorker.onstatechange = () => {
            if (installingWorker.state !== 'installed') return;
            let msg = sWorker.controller ? 'New content is available; please refresh.' : 'Content is cached for offline use.';
            // At this point:
            // - The old content will have been purged and
            // the fresh content will have been added to the cache.
            // It's the perfect time to display a "New content is
            // available; please refresh." message in your web app.
            // - Everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.

            console.log(msg);
          }
        };
      })
      .catch(error => console.error('Error during service worker registration:', error));
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
