var staticCacheName = 'RestaurantReviews-static-v3';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/restaurant.html',
        '/css/styles.css',
        '/css/styles-medium.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        'js/register-sw.js',
        'data/restaurants.json'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('RestaurantReviews-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  const requestUrl = new URL(event.request.url);

  // only highjack request made to our app (not mapbox maps or leaflet, for example)
  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname.startsWith('/restaurant.html')) {
      event.respondWith(caches.match('/restaurant.html'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
