/**
 * Utilities for handling offline states and data synchronization
 */
import { useState, useEffect } from 'react';

// Event names for offline/online state changes
export const EVENTS = {
  OFFLINE_CHANGE: 'motex:offline-change',
  SYNC_COMPLETE: 'motex:sync-complete',
};

// Track pending operations when offline
let pendingOperations: { id: string; type: string; timestamp: number }[] = [];

/**
 * Initialize the offline manager by setting up event listeners
 */
export const initOfflineManager = () => {
  // Set up network status change listeners
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Check initial state
  if (!navigator.onLine) {
    dispatchOfflineEvent(true);
  }
  
  // Load any existing pending operations from storage
  loadPendingOperations();
  
  console.log('Offline manager initialized');
};

/**
 * Handle when app comes back online
 */
const handleOnline = () => {
  console.log('App is back online');
  dispatchOfflineEvent(false);
  syncPendingOperations();
};

/**
 * Handle when app goes offline
 */
const handleOffline = () => {
  console.log('App is now offline');
  dispatchOfflineEvent(true);
};

/**
 * Dispatch a custom event for offline state changes
 */
const dispatchOfflineEvent = (isOffline: boolean) => {
  const event = new CustomEvent(EVENTS.OFFLINE_CHANGE, { 
    detail: { isOffline }
  });
  window.dispatchEvent(event);
};

/**
 * Dispatch a custom event for sync completion
 */
const dispatchSyncEvent = (results: any) => {
  const event = new CustomEvent(EVENTS.SYNC_COMPLETE, { 
    detail: { results }
  });
  window.dispatchEvent(event);
};

/**
 * Save an operation to be executed when back online
 */
export const savePendingOperation = (
  operationType: string, 
  operationData: any
) => {
  const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const operation = {
    id,
    type: operationType,
    data: operationData,
    timestamp: Date.now()
  };
  
  pendingOperations.push(operation as any);
  savePendingOperations();
  
  console.log(`Saved pending operation: ${operationType}`, operation);
  return id;
};

/**
 * Get any pending operations
 */
export const getPendingOperations = () => {
  return [...pendingOperations];
};

/**
 * Save pending operations to localStorage
 */
const savePendingOperations = () => {
  try {
    localStorage.setItem(
      'motex-pending-operations', 
      JSON.stringify(pendingOperations)
    );
  } catch (error) {
    console.error('Failed to save pending operations:', error);
  }
};

/**
 * Load pending operations from localStorage
 */
const loadPendingOperations = () => {
  try {
    const saved = localStorage.getItem('motex-pending-operations');
    if (saved) {
      pendingOperations = JSON.parse(saved);
      console.log(`Loaded ${pendingOperations.length} pending operations`);
    }
  } catch (error) {
    console.error('Failed to load pending operations:', error);
    pendingOperations = [];
  }
};

/**
 * Attempt to sync pending operations when back online
 */
const syncPendingOperations = async () => {
  if (pendingOperations.length === 0) {
    return;
  }
  
  console.log(`Attempting to sync ${pendingOperations.length} pending operations`);
  
  const results = {
    succeeded: 0,
    failed: 0,
    operations: [] as any[]
  };
  
  const processingOperations = [...pendingOperations];
  pendingOperations = [];
  savePendingOperations();
  
  for (const operation of processingOperations) {
    try {
      // The actual implementation would depend on the types of operations
      // you need to support. This is a simplified example.
      console.log(`Processing operation: ${operation.type}`, operation);
      
      // Here you would actually perform the sync based on operation type
      // For example:
      // if (operation.type === 'quote-request') {
      //   await submitQuoteRequest(operation.data);
      // }
      
      // For now, we'll simulate success
      results.succeeded++;
      results.operations.push({
        id: operation.id,
        type: operation.type,
        status: 'success'
      });
      
    } catch (error) {
      console.error(`Failed to sync operation ${operation.id}:`, error);
      results.failed++;
      results.operations.push({
        id: operation.id,
        type: operation.type,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      // Add back to pending operations
      pendingOperations.push(operation as any);
    }
  }
  
  // Save any operations that failed back to storage
  savePendingOperations();
  
  // Dispatch event about sync completion
  dispatchSyncEvent(results);
  
  console.log(`Sync complete. Success: ${results.succeeded}, Failed: ${results.failed}`);
  return results;
};

/**
 * Hook to listen for offline state changes
 */
export const useOfflineStatus = (): { 
  isOffline: boolean; 
  hasPendingOperations: boolean 
} => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [hasPendingOperations, setHasPendingOperations] = useState(
    pendingOperations.length > 0
  );
  
  useEffect(() => {
    const handleOfflineChange = (event: CustomEvent) => {
      setIsOffline(event.detail.isOffline);
    };
    
    const handleSyncComplete = () => {
      setHasPendingOperations(pendingOperations.length > 0);
    };
    
    // TypeScript doesn't know about our custom events, so we need to cast
    window.addEventListener(
      EVENTS.OFFLINE_CHANGE, 
      handleOfflineChange as EventListener
    );
    
    window.addEventListener(
      EVENTS.SYNC_COMPLETE, 
      handleSyncComplete as EventListener
    );
    
    return () => {
      window.removeEventListener(
        EVENTS.OFFLINE_CHANGE, 
        handleOfflineChange as EventListener
      );
      
      window.removeEventListener(
        EVENTS.SYNC_COMPLETE, 
        handleSyncComplete as EventListener
      );
    };
  }, []);
  
  return { isOffline, hasPendingOperations };
}; 