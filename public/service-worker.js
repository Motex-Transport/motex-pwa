// Simplified service worker that redirects to Flipkart when in PWA mode
const CACHE_NAME = 'motex-redirect-v1';
const EXTERNAL_URL = 'https://www.flipkart.com/';

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

// Helper function to check if a client is in standalone mode (PWA)
const isPwaClient = async (client) => {
  // If we can't determine, assume it's not a PWA
  if (!client) return false;
  
  try {
    // Try to execute script in the client to check if it's in standalone mode
    const data = await client.evaluate(`
      (window.matchMedia('(display-mode: standalone)').matches || 
       window.matchMedia('(display-mode: window-controls-overlay)').matches ||
       // Check for iOS standalone mode
       (typeof navigator !== 'undefined' && 
        navigator !== null && 
        'standalone' in navigator && 
        navigator.standalone === true) || 
       window.location.search.includes('pwa=true'))
    `);
    return data === true;
  } catch (e) {
    // On error, default to not redirecting
    console.error('Error checking client mode:', e);
    return false;
  }
};

// Fetch event - redirect navigation requests to external URL only if in PWA mode
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        // Get the client that made the request
        const client = await self.clients.get(event.clientId);
        
        // Check if the client is in PWA mode
        const isPwa = await isPwaClient(client);
        
        // If in PWA mode, redirect to external site
        if (isPwa) {
          return Response.redirect(EXTERNAL_URL, 302);
        }
        
        // Otherwise, fetch the requested resource normally
        return fetch(event.request);
      })()
    );
  } else {
    // For non-navigation requests (assets), try to fetch from network
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return new Response('Resource not available offline', { 
            headers: { 'Content-Type': 'text/plain' } 
          });
        })
    );
  }
}); 