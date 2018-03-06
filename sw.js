const staticCacheName = 'rest_rev-static-v1';

const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html?id=1',
  '/restaurant.html?id=2',
  '/restaurant.html?id=3',
  '/restaurant.html?id=4',
  '/restaurant.html?id=5',
  '/restaurant.html?id=6',
  '/restaurant.html?id=7',
  '/restaurant.html?id=8',
  '/restaurant.html?id=9',
  '/restaurant.html?id=10',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(cacheFiles);
      })
  );
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cachesNames.filter(cacheName => {
          return cacheName.startsWith('rest_rev-') && cacheName != staticCacheName
        }).forEach(cacheName => {
          cache.delete(cacheName);
          console.log('cache deleted');
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => {
      if (resp) return resp;
      return fetch(e.request);
    })
  );
});
