const CACHE_NAME = 'coffee-tracker-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icon-192.jpg',
  '/icon-512.jpg'
];

// インストール時にリソースをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ネットワークリクエストをインターセプトしてキャッシュから返す
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュがあればそれを返す
        if (response) {
          return response;
        }
        // なければネットワークにフェッチリクエスト
        return fetch(event.request);
      })
  );
});