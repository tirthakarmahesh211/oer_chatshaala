//jshint esversion:8
const cacheName='StemChat_app';

const staticAssets=[
  './',
  './css/blog.css',
  './css/feedback.css',
  './css/home.css',
  './css/register.css',
  './css/quill.css',
  './css/pure_css.css',
  './js/home.js',
  './js/register.js',
  './js/ui.js',
  './js/quill.js',
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
  './stemgames.png',
  './views/groups.ejs',
  './views/group.ejs'
];


self.addEventListener('install',async (eve) =>{
  eve.waitUntil(
    caches.open(cacheName).then(cache=>{
      cache.addAll(staticAssets);
    })
    .then(()=>self.skipWaiting())
  );
});


self.addEventListener('activate',(eve)=>{
  eve.waitUntil(
    caches.keys().then(cacheNames=>{
      return Promise.all(
        cacheNames.map(cache=>{
          if(cache!==cacheName){
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  const url=event.request.url;

    event.respondWith(
    fetch(event.request).catch(function(){
      return caches.match(event.request);
    }));
  
});

self.addEventListener('push',function(eve){
  if(eve && eve.data){
  const data=eve.data;
  var payload = eve.data ? eve.data.text() : 'No Text Body';
  eve.waitUntil(self.registration.showNotification(data.title,{
    body:payload,
    icon:'/public/images/icon/icon-72x72.png'||null
  }));
}
});
