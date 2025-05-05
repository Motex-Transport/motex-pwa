import React, { useEffect } from 'react';
import { usePwaDetection } from '../../hooks/usePwaDetection';
import SplashScreen from './SplashScreen';
import Onboarding from './Onboarding';
import MobileHome from './MobileHome';
import { useLocation } from 'react-router-dom';

interface PwaWrapperProps {
  children: React.ReactNode;
}

// Debug function to help test the PWA flow
const resetPwaFlow = () => {
  console.log('Resetting PWA flow...');
  localStorage.removeItem('pwa-onboarding-completed');
  localStorage.removeItem('pwa-banner-dismissed');
  
  // Force PWA testing mode
  const url = new URL(window.location.href);
  url.searchParams.set('pwa', 'true');
  window.location.href = url.toString();
};

// Make the reset function available globally for debugging
(window as any).resetPwaFlow = resetPwaFlow;

const PwaWrapper: React.FC<PwaWrapperProps> = ({ children }) => {
  const location = useLocation();
  const {
    isPwa: isPwaApp,
    showSplash,
    showOnboarding,
    hasSeenOnboarding,
    onSplashFinish,
    onOnboardingComplete
  } = usePwaDetection();

  // Add debug logging
  useEffect(() => {
    console.log('PwaWrapper state:', { 
      isPwaApp, 
      showSplash, 
      showOnboarding, 
      hasSeenOnboarding
    });
    
    // Log if we're in standalone mode
    console.log('Standalone mode:', window.matchMedia('(display-mode: standalone)').matches);
    console.log('User agent:', window.navigator.userAgent);
  }, [isPwaApp, showSplash, showOnboarding, hasSeenOnboarding]);

  // Add URL parameter detection for testing
  useEffect(() => {
    // If the URL contains ?pwa=reset, clear the onboarding flags to test the flow again
    if (window.location.search.includes('pwa=reset')) {
      resetPwaFlow();
    }
  }, []);

  // For non-PWA, just render children
  if (!isPwaApp) {
    return <>{children}</>;
  }

  // Show splash or onboarding if needed
  if (showSplash) {
    return <SplashScreen onFinish={onSplashFinish} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={onOnboardingComplete} />;
  }

  // Use MobileHome only for the home route in PWA mode
  if (location.pathname === '/' || location.pathname === '') {
    return <MobileHome />;
  }

  // For other routes in PWA mode, show the normal content
  return <>{children}</>;
};

export default PwaWrapper; 