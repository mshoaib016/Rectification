self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
  return self.clients.claim();
});

// Simple pass-through fetch (no caching)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // fallback agar request fail ho jaye
      return new Response("Offline");
    })
  );
});
