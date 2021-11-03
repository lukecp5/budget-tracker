var CACHE = "budget-site-cache";
const DATA_CACHE = "budget-site-data-cache";

var URLS_TO_CACHE = [
      "/",
      "/index.html",
      "/db.js",
      "/styles.css",
      "/manifest.json",
      "/index.js",
      "/icons/icon-192x192.png",
      "/icons/icon-512x512.png"
];

self.addEventListener("install", function(event) {
      // Perform install steps
      event.waitUntil(
        caches.open(CACHE).then(function(cache) {
          return cache.addAll(urlsToCache);
        })
      );
    });