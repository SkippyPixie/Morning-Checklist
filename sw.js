// sw.js
const SHELL='dc-shell-scaffold';
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(SHELL).then(c=>c.addAll(['/', '/index.html'])));
});
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{
  const r=e.request, u=new URL(r.url);
  if(r.method!=='GET') return;
  if(u.origin===location.origin){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(resp=>{
      caches.open(SHELL).then(c=>c.put(r, resp.clone())); return resp;
    })));
  }
});