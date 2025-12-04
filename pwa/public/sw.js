const CACHE_NAME = "app-shell-v1";
const RUNTIME_CACHE = "runtime-cache-v1";

const APP_SHELL = [
    "/",
    "/index.html",
    "/manifest.json",
    "/logo192.png",
    "/logo512.png",
    "/styles/*.css",
    "/static/js/main.3a7c7e49.js",
    "/static/css/main.ea57b8e9.css"
];

self.addEventListener("install", (event) => {
    console.log("SW Installed");

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(APP_SHELL);
        })
    );
});

self.addEventListener("activate", (event) => {
    console.log("SW Activated");

    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    // .filter((key) => key !== CACHE_NAME)
                    .filter((key) => ![CACHE_NAME, RUNTIME_CACHE].includes(key))
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});


self.addEventListener("fetch", (event) => {
    console.log('Происходит запрос на сервер');

    const req = event.request;

    // Navigation fallback
    if (req.mode === "navigate") {
        event.respondWith(
            fetch(req).catch(() => caches.match("/index.html"))
        );
        return;
    }

    const url = new URL(req.url);

    if (req.url.startsWith("ws://") || req.url.startsWith("wss://")) {
        return;
    }

    // Cache only PUBLIC API calls
    // if (url.origin === "https://api.artic.edu") {
    //     event.respondWith(networkFirst(req));
    //     return;
    // }
    if (url.origin === "https://api.artic.edu") {
        // Only cache JSON API, not images
        if (req.destination === "image") return; // let browser handle it normally

        event.respondWith(networkFirst(req));
        return;
    }

    // Static assets → cache-first
    // event.respondWith(cacheFirst(req));
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    }
});

async function cacheFirst(req) {
    const cached = await caches.match(req);
    return cached || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (err) {
        const cached = await cache.match(req);
        return cached || new Response(JSON.stringify({ error: "Offline" }), {
            headers: { "Content-Type": "application/json" }
        });
    }
}
