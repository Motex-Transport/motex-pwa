const CACHE_NAME = 'motex-pwa-v1';

// Assets to cache immediately on service worker install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/MOTEX+Logo.png',
  '/1 motex.png',
  '/2 motex.png',
  '/3 motex.png',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first'
};

// Define cache strategies for different types of requests
const getCacheStrategy = (url) => {
  const parsedUrl = new URL(url);

  // API requests should be network-first
  if (parsedUrl.pathname.includes('/api/')) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }

  // For images and static assets, use cache-first
  if (
    parsedUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/) ||
    parsedUrl.pathname.match(/\.(css|js)$/) ||
    parsedUrl.pathname.match(/\.(woff|woff2|ttf|otf)$/)
  ) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }

  // Default to network-first for everything else
  return CACHE_STRATEGIES.NETWORK_FIRST;
};

// Install event - cache the initial assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Pre-caching initial assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Force service worker activation
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(existingCacheName => {
          if (existingCacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', existingCacheName);
            return caches.delete(existingCacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all clients
  );
});

// Helper function to implement cache-first strategy
const cacheFirstStrategy = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    // If network fetch fails, could return a fallback here
    return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
  }
};

// Helper function to implement network-first strategy
const networkFirstStrategy = async (request) => {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Fetch failed, falling back to cache:', error);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cache and network fails, return a basic error response
    return new Response('Network unavailable', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }
};

// Fetch event - handle all fetch requests
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  const strategy = getCacheStrategy(event.request.url);
  
  if (strategy === CACHE_STRATEGIES.CACHE_FIRST) {
    event.respondWith(cacheFirstStrategy(event.request));
  } else {
    event.respondWith(networkFirstStrategy(event.request));
  }
}); 