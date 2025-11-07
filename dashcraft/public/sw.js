// public/sw.js
const CACHE = "dashcraft-v4";
const PRECACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/manifest.webmanifest",
  "/src/main.js",
  "/src/store/store.js",
  "/src/store/idb.js",
  "/src/store/channel.js",
  "/src/core/dnd.js",
  "/src/core/grid.js",
  "/src/core/widget-registry.js",
  "/src/widgets/widget-base.js",
  "/src/widgets/notes-widget.js",
  "/src/widgets/weather-widget.js",
  "/src/widgets/pomodoro-widget.js",
  "/src/widgets/rss-widget.js",
  "/src/workers/rss.worker.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(PRECACHE);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Same-origin: cache-first + network fallback, always return a Response
  if (url.origin === self.location.origin) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(e.request);
      if (cached) return cached;

      try {
        const res = await fetch(e.request);
        if (res && res.ok) cache.put(e.request, res.clone());
        return res;
      } catch {
        if (e.request.mode === "navigate") {
          const offline = await cache.match("/index.html");
          if (offline) return offline;
        }
        return new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
      }
    })());
    return;
  }

  // Cross-origin: proxy; on failure return a Response (prevents TypeError)
  e.respondWith((async () => {
    try {
      return await fetch(e.request);
    } catch {
      return new Response("Bad Gateway", { status: 502, headers: { "Content-Type": "text/plain" } });
    }
  })());
});
