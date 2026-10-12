const BUILD_VERSION = "__BUILD_VERSION__";
const CACHE_NAME = `sportsday-${BUILD_VERSION}`;
const BASE_URL = self.registration.scope;
const PRECACHE_URLS = [
  "./",
  "./index.html",
  `./styles.css?v=${BUILD_VERSION}`,
  `./app.js?v=${BUILD_VERSION}`,
  `./pwa.js?v=${BUILD_VERSION}`,
  "./manifest.webmanifest",
  "./favicon.svg",
  "./favicon-32.png",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./version.json",
].map((path) => new URL(path, BASE_URL).href);

self.addEventListener("install", (event) => {
  // 保留 waiting 狀態，讓使用者選擇何時切換到新版。
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)))
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => key.startsWith("sportsday-") && key !== CACHE_NAME)
        .map((key) => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;
  if (!requestUrl.href.startsWith(BASE_URL)) return;

  const isVersionFile = requestUrl.pathname.endsWith("/version.json");
  const isPage = request.mode === "navigate" || request.headers.get("accept")?.includes("text/html");

  if (isVersionFile || isPage || request.destination === "script" || request.destination === "style") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request, { cache: "no-store" });
        if (response.ok && response.type === "basic" && !isVersionFile) {
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (isPage) return cache.match(new URL("index.html", BASE_URL));
        throw new Error("網路離線且找不到已快取的網站資源。");
      }
    })());
    return;
  }

  if (request.destination === "image") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok && response.type === "basic") await cache.put(request, response.clone());
      return response;
    })());
  }
});
