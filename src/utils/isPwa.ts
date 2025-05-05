/**
 * Check if the application is running in standalone PWA mode
 */
export const isPwa = (): boolean => {
  // Check if display-mode is standalone (Chrome, Edge, Firefox)
  const isDisplayModeStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
  // Check for iOS standalone mode
  const isIOSStandalone = (window.navigator as any).standalone === true;
  
  // Check for Android TWA (Trusted Web Activity)
  const isAndroidTWA = document.referrer.includes('android-app://');
  
  // Check for installed PWA via service worker registration
  const hasServiceWorker = 'serviceWorker' in navigator;
  
  // Check if launched from homescreen (Safari on iOS)
  const isFromHomescreen = window.navigator.userAgent.includes('Mobile') && 
                         (window.navigator as any).standalone === true;
  
  // Check for Windows PWA - more specific detection
  const isWindows = /Windows NT/.test(window.navigator.userAgent);
  const isWindowsEdge = /Edg/.test(window.navigator.userAgent);
  const isWindowsChrome = /Chrome/.test(window.navigator.userAgent) && !/Edg/.test(window.navigator.userAgent);
  
  // Check for special URL parameter for testing on Windows
  const hasTestQueryParam = window.location.search.includes('pwa=true');
  
  // For Windows PWA detection, we look at display-mode standalone
  // This is how Edge/Chrome installs PWAs on Windows
  const isWindowsPwa = isWindows && isDisplayModeStandalone;
  
  // If we have a special URL parameter that forces PWA mode on Windows
  const forcePwaOnWindows = isWindows && hasTestQueryParam;

  // Log PWA detection info for debugging
  console.log('PWA Detection:', {
    isDisplayModeStandalone,
    isWindowsPwa,
    isWindows,
    hasTestQueryParam,
    forcePwaOnWindows,
    userAgent: window.navigator.userAgent
  });
                         
  return isDisplayModeStandalone || 
         isIOSStandalone || 
         isAndroidTWA || 
         isWindowsPwa ||
         (hasServiceWorker && isFromHomescreen) ||
         forcePwaOnWindows; // For testing
}; 