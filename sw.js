/* sw.js */
const SHELL = 'dc-shell-v17';
const DATA  = 'dc-data-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(SHELL).then(c => c.addAll(['/', '/index.html']))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  const r = e.request;
  const u = new URL(r.url);
  if (r.method !== 'GET') return;

  // Network-first with cached fallback for weather
  if (u.hostname.includes('open-meteo.com')) {
    e.respondWith(
      fetch(r).then(resp =>
        caches.open(DATA).then(c => { c.put('last-weather', resp.clone()); return resp; })
      ).catch(() =>
        caches.open(DATA).then(c => c.match('last-weather')).then(m =>
          m || new Response('{}', { headers: { 'Content-Type': 'application/json' } })
        )
      )
    );
    return;
  }

  // Cache-first for our own static assets
  if (u.origin === location.origin) {
    e.respondWith(
      caches.match(r).then(m => m || fetch(r).then(resp => {
        const cp = resp.clone();
        caches.open(SHELL).then(c => c.put(r, cp));
        return resp;
      }))
    );
  }
});
