// Simplified service worker that redirects to motextransport.com.au
const CACHE_NAME = 'motex-redirect-v1';
const EXTERNAL_URL = 'https://motextransport.com.au';

// Install event - create cache for offline support
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
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
            return caches.delete(existingCacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim()) // Take control of all clients
  );
});

// Fetch event - redirect all requests to external URL
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      // Redirect to the external website
      Response.redirect(EXTERNAL_URL, 302)
    );
  } else {
    // For non-navigation requests (assets), try to fetch from network
    // If network fails, respond with a simple message
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return new Response('Redirecting to motextransport.com.au', { 
            headers: { 'Content-Type': 'text/plain' } 
          });
        })
    );
  }
}); 