const CACHE_NAME = 'motex-pwa-v2';
const OFFLINE_PAGE = '/offline.html';
const DB_NAME = 'motex-offline-db';
const STORE_NAME = 'offline-requests';

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
  '/logo512.png',
  '/offline.html',
  // Add routes for PWA paths
  '/instant-quote',
  '/map-pickup-drop',
  '/about-us',
  '/contact-us',
  '/my-requests',
  '/profile'
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Define cache strategies for different types of requests
const getCacheStrategy = (url) => {
  const parsedUrl = new URL(url);

  // API requests should be network-first (with background sync if POST)
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

  // Use stale-while-revalidate for HTML routes to improve perceived performance
  if (
    parsedUrl.pathname === '/' || 
    parsedUrl.pathname.endsWith('.html') ||
    !parsedUrl.pathname.includes('.')
  ) {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
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
    })
    .then(() => {
      // Initialize IndexedDB for offline support
      initIndexedDB();
      return self.clients.claim(); // Take control of all clients
    })
  );
});

// Helper function to implement cache-first strategy
const cacheFirstStrategy = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Revalidate the cache in the background if asset is older than 24 hours
    const headers = cachedResponse.headers;
    const cachedTime = headers.get('sw-cache-date');
    
    if (cachedTime) {
      const cacheAge = Date.now() - new Date(cachedTime).getTime();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      
      if (cacheAge > oneDayInMs) {
        // Revalidate in background
        fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            updateCache(request, networkResponse);
          }
        }).catch(err => {
          console.log('[SW] Background fetch failed:', err);
        });
      }
    }
    
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      await updateCache(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    // Return offline page for navigation requests if available
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_PAGE);
    }
    
    // If network fetch fails, could return a fallback here
    return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
  }
};

// Helper function to implement network-first strategy
const networkFirstStrategy = async (request) => {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      await updateCache(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Fetch failed, falling back to cache:', error);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If it's a navigation request, return the offline page
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_PAGE);
    }
    
    // If no cache and network fails, return a basic error response
    return new Response('Network unavailable', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }
};

// Helper function to implement stale-while-revalidate strategy
const staleWhileRevalidateStrategy = async (request) => {
  // Try to get from cache first
  const cachedResponse = await caches.match(request);
  
  // Fetch from network in the background regardless
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse && networkResponse.status === 200) {
        updateCache(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(error => {
      console.log('[Service Worker] Fetch failed in stale-while-revalidate:', error);
      // If it's a navigation and we have an offline page, return that
      if (request.mode === 'navigate') {
        return caches.match(OFFLINE_PAGE);
      }
      throw error;
    });
  
  // If we have a cached version, return it right away
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Otherwise wait for the network response
  return fetchPromise;
};

// Helper function to update cache with timestamp
const updateCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  
  // Create a new response with a timestamp header
  const headers = new Headers(response.headers);
  headers.append('sw-cache-date', new Date().toISOString());
  
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
  
  await cache.put(request, newResponse);
};

// Initialize IndexedDB for storing offline requests
const initIndexedDB = () => {
  if (!indexedDB) {
    console.log('[Service Worker] IndexedDB not supported');
    return Promise.resolve();
  }
  
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onerror = event => {
      console.error('[Service Worker] IndexedDB error:', event.target.error);
      reject(event.target.error);
    };
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        console.log('[Service Worker] Object store created');
      }
    };
    
    request.onsuccess = event => {
      console.log('[Service Worker] IndexedDB initialized');
      resolve(event.target.result);
    };
  });
};

// Store failed requests for later syncing
const storeRequestForSync = async (request) => {
  try {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onerror = event => reject(event.target.error);
      request.onsuccess = event => resolve(event.target.result);
    });
    
    const clone = request.clone();
    const body = await clone.text();
    
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    const record = {
      url: request.url,
      method: request.method,
      headers: Array.from(request.headers.entries()),
      body,
      timestamp: Date.now()
    };
    
    const result = await new Promise((resolve, reject) => {
      const putRequest = store.add(record);
      putRequest.onsuccess = () => resolve(putRequest.result);
      putRequest.onerror = () => reject(putRequest.error);
    });
    
    console.log('[Service Worker] Request stored for later sync:', result);
    
    // Close the DB connection
    db.close();
    
  } catch (error) {
    console.error('[Service Worker] Failed to store request:', error);
  }
};

// Register for sync event if browser supports it
if ('sync' in self.registration) {
  self.addEventListener('sync', event => {
    console.log('[Service Worker] Sync event triggered:', event.tag);
    
    if (event.tag === 'sync-pending-requests') {
      event.waitUntil(syncPendingRequests());
    }
  });
}

// Sync pending requests from IndexedDB when online
const syncPendingRequests = async () => {
  try {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onerror = event => reject(event.target.error);
      request.onsuccess = event => resolve(event.target.result);
    });
    
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    const allRecords = await new Promise((resolve, reject) => {
      const getRequest = store.getAll();
      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = () => reject(getRequest.error);
    });
    
    console.log('[Service Worker] Found pending requests:', allRecords.length);
    
    // Process each request
    const results = await Promise.allSettled(
      allRecords.map(async record => {
        try {
          const headers = new Headers();
          record.headers.forEach(([key, value]) => headers.append(key, value));
          
          const request = new Request(record.url, {
            method: record.method,
            headers,
            body: record.method !== 'GET' && record.method !== 'HEAD' ? record.body : undefined,
          });
          
          // Attempt to send the request
          const response = await fetch(request);
          
          if (response.ok) {
            // If successful, remove from store
            const deleteRequest = store.delete(record.id);
            await new Promise((resolve, reject) => {
              deleteRequest.onsuccess = resolve;
              deleteRequest.onerror = reject;
            });
            
            console.log('[Service Worker] Successfully synced request:', record.id);
            return { success: true, id: record.id };
          } else {
            console.log('[Service Worker] Sync failed with status:', response.status);
            return { success: false, id: record.id, status: response.status };
          }
        } catch (error) {
          console.error('[Service Worker] Error syncing request:', error);
          return { success: false, id: record.id, error };
        }
      })
    );
    
    // Close the DB connection
    db.close();
    
    return results;
  } catch (error) {
    console.error('[Service Worker] Failed to sync requests:', error);
    return [];
  }
};

// Handle failed fetch requests (for POST requests we will save for later)
const handleFailedRequest = async (request) => {
  // Only save POST, PUT, DELETE requests for later syncing
  if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
    await storeRequestForSync(request);
    
    // Try to register for background sync if supported
    if ('sync' in self.registration) {
      try {
        await self.registration.sync.register('sync-pending-requests');
        console.log('[Service Worker] Sync registered for pending requests');
      } catch (error) {
        console.error('[Service Worker] Sync registration failed:', error);
      }
    }
    
    // Return a response with custom JSON indicating offline storage
    return new Response(JSON.stringify({
      error: 'offline',
      message: 'You are currently offline. Your request has been saved and will be sent when you\'re back online.',
      timestamp: Date.now()
    }), {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'X-Offline-Storage': 'true'
      }
    });
  }
  
  // For non-POST requests, we return a different response
  if (request.mode === 'navigate') {
    return caches.match(OFFLINE_PAGE);
  }
  
  return new Response('Network unavailable', { 
    status: 503, 
    headers: { 'Content-Type': 'text/plain' }
  });
};

// Fetch event - handle all fetch requests
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  const strategy = getCacheStrategy(event.request.url);
  
  event.respondWith((async () => {
    try {
      if (strategy === CACHE_STRATEGIES.CACHE_FIRST) {
        return await cacheFirstStrategy(event.request);
      } else if (strategy === CACHE_STRATEGIES.STALE_WHILE_REVALIDATE) {
        return await staleWhileRevalidateStrategy(event.request);
      } else {
        return await networkFirstStrategy(event.request);
      }
    } catch (error) {
      console.error('[Service Worker] Request failed completely:', error);
      return handleFailedRequest(event.request);
    }
  })());
}); 