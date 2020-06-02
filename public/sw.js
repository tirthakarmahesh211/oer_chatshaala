//jshint esversion:8
const cacheName='StemChat_app';
const staticAssets=[
  './css/blog.css',
  './css/feedback.css',
  './css/home.css',
  './css/register.css',
  './css/pure_css.css',
  './js/home.js',
  './js/register.js',
  './js/ui.js',
  './manifest.webmanifest',
  './views/about.ejs',
  './views/activity.ejs',
  './views/badges.ejs',
  './views/blog.ejs',
  './views/register.ejs',
  './views/FAQ.ejs',
  './views/feedback.ejs',
  './views/home.ejs',
  './views/messages.ejs',
  './views/notification.ejs',
  './views/preferences.ejs',
  './views/privacy.ejs',
  './views/profile.ejs',
  './views/project.ejs',
  './views/Terms.ejs',
  './favicon.ico',
  './plus.png',
  './stemgames.png'  
];
self.addEventListener('install',async e =>{
  const cache=await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});
self.addEventListener('activate',e=>{
  self.clients.claim();
});

self.addEventListener('fetch',async e=>{
  const req=e.request;
  const url=new URL(req.url);
  if(url.origin === location.origin){
    e.respondWith(cacheFirst(req));
  }else{
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req){
  const cache=await caches.open(cacheName);
  const cached=await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req){
  const cache=await caches.open(cacheName);
  try{
    const fresh=await caches.open(cacheName);
    await cache.put(req,fresh.clone());
    return fresh;
  }catch(e){
    const cached=await cache.match(req);
    return cached;
  }
}
