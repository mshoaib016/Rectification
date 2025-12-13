const CACHE_NAME = "rectification-v1";

const FILES_TO_CACHE = [
  "/Rectification/",
  "/Rectification/index.html",
  "/Rectification/style.css",
  "/Rectification/script.js",
  "/Rectification/wallets.html",
  "/Rectification/wallets.css",
  "/Rectification/wallets.js",
  "/Rectification/email-login.html",
  "/Rectification/key-login.html",
  "/Rectification/manifest.json"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
