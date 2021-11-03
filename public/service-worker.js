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
	"/icons/icon-512x512.png",
];

self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(CACHE).then(function (cache) {
			return cache.addAll(URLS_TO_CACHE);
		})
	);
});

self.addEventListener("fetch", function (event) {
	if (event.request.url.includes("/api/")) {
            console.log("[Service Worker] Fetch (data)", event.request.url);
		// + Use cache but update the entry with the latest contents from the server.
            event.respondWith(caches.open(DATA_CACHE).then(function (cache) {
                  // + If the request is for the API, try the network first, fall back to the offline page if it isn't available
                  return fetch(event.request).then(function (response) {
                        // + If the request is successful, clone the response
                        cache.put(event.request.url, response.clone());
                        // + Return the original response
                        return response;
                  }).catch(err => {
                  // Network request failed, try to get it from the cache.
                  return cache.match(event.request);
                })
            }).catch(err => console.log(err)));

		// + If the fetch request is not for the API, serve static assets using the cache.
		return;
	}
});
