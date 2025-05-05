import React, { useEffect } from 'react';
import { usePwaDetection } from '../../hooks/usePwaDetection';
import SplashScreen from './SplashScreen';
import Onboarding from './Onboarding';

interface PwaWrapperProps {
  children: React.ReactNode;
}

// Debug function to help test the PWA flow
const resetPwaFlow = () => {
  console.log('Resetting PWA flow...');
  localStorage.removeItem('pwa-onboarding-completed');
  localStorage.removeItem('windows-pwa-onboarding-completed');
  localStorage.removeItem('pwa-banner-dismissed');
  localStorage.removeItem('windows-install-prompt-dismissed');
  
  // Add pwa=true to force Windows detection
  const url = new URL(window.location.href);
  url.searchParams.set('pwa', 'true');
  window.location.href = url.toString();
};

// Make the reset function available globally for debugging
(window as any).resetPwaFlow = resetPwaFlow;

const PwaWrapper: React.FC<PwaWrapperProps> = ({ children }) => {
  const {
    isPwa: isPwaApp,
    showSplash,
    showOnboarding,
    hasSeenOnboarding,
    isWindows,
    onSplashFinish,
    onOnboardingComplete
  } = usePwaDetection();

  // Add debug logging
  useEffect(() => {
    console.log('PwaWrapper state:', { 
      isPwaApp, 
      showSplash, 
      showOnboarding, 
      hasSeenOnboarding, 
      isWindows 
    });
    
    // Log if we're in standalone mode
    console.log('Standalone mode:', window.matchMedia('(display-mode: standalone)').matches);
    console.log('User agent:', window.navigator.userAgent);
  }, [isPwaApp, showSplash, showOnboarding, hasSeenOnboarding, isWindows]);

  // Add URL parameter detection for testing on Windows
  useEffect(() => {
    // If the URL contains ?pwa=reset, clear the onboarding flags to test the flow again
    if (window.location.search.includes('pwa=reset')) {
      resetPwaFlow();
    }
  }, []);

  // For non-PWA or if already completed onboarding, just render children
  if (!isPwaApp || hasSeenOnboarding) {
    return <>{children}</>;
  }

  return (
    <>
      {showSplash && <SplashScreen onFinish={onSplashFinish} />}
      {showOnboarding && <Onboarding onComplete={onOnboardingComplete} />}
      {!showSplash && !showOnboarding && children}
    </>
  );
};

export default PwaWrapper; 