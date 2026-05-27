const CACHE='eixo-oeste-amv-rjp-v1';
const ASSETS=['./','./index.html','./src/styles.css','./src/app.js','./manifest.webmanifest','./assets/logo_rjp_amv.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
