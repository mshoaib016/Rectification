const CACHE_NAME = "wallet-app-cache-v1";
const urlsToCache = [
  "./",
  "index.html",
  "style.css",
  "script.js",
  "wallets.css",
  "wallet-page.html",

  // Icons
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/downloads.png",
  "assets/icons/rocket.png",
  "assets/icons/share.png"
];

// INSTALL — Cache files
self.addEventListener("install", event => {
  console.log("Service Worker Installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  console.log("Service Worker Activated");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// FETCH — Offline Support
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
