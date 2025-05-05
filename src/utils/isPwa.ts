/**
 * Check if the application is running in standalone PWA mode on mobile devices
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
  
  // Check for special URL parameter for testing
  const hasTestQueryParam = window.location.search.includes('pwa=true');
  
  // Only detect as PWA if on mobile or test mode
  const isMobileDevice = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
  
  // Log PWA detection info for debugging
  console.log('PWA Detection:', {
    isDisplayModeStandalone,
    isMobileDevice,
    hasTestQueryParam,
    userAgent: window.navigator.userAgent
  });
                         
  return (isDisplayModeStandalone || 
         isIOSStandalone || 
         isAndroidTWA || 
         (hasServiceWorker && isFromHomescreen)) && isMobileDevice || 
         hasTestQueryParam; // For testing
}; 