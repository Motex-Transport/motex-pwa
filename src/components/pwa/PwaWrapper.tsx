import React, { useEffect } from 'react';
import { usePwaDetection } from '../../hooks/usePwaDetection';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Import PWA components
import SplashScreen from './SplashScreen';
import Onboarding from './Onboarding';
import MobileHome from './MobileHome';
import MapPickupDrop from './MapPickupDrop';
import AboutUs from './AboutUs';
import BottomNav from './BottomNavigation';
import PageTransition from './PageTransition';
import NetworkStatus from './NetworkStatus';

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

// Define paths where we should hide the bottom navigation
const hideBottomNavPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/onboarding',
  '/splash',
  '/map-pickup-drop', // Map view has its own UI controls
];

const PwaWrapper: React.FC<PwaWrapperProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isPwa: isPwaApp,
    showSplash,
    showOnboarding,
    hasSeenOnboarding,
    onSplashFinish,
    onOnboardingComplete
  } = usePwaDetection();
  
  // Determine if the bottom navigation should be shown based on the current path
  const shouldShowBottomNav = isPwaApp && 
    !showSplash && 
    !showOnboarding && 
    !hideBottomNavPaths.some(path => location.pathname.includes(path));

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

  // In PWA mode, route to the appropriate mobile component based on the path
  // Use specific mobile-optimized components for certain routes
  
  // Home screen
  if (location.pathname === '/' || location.pathname === '') {
    return (
      <>
        <PageTransition>
          <MobileHome />
        </PageTransition>
        {shouldShowBottomNav && <BottomNav />}
      </>
    );
  }
  
  // About Us screen
  if (location.pathname === '/about-us') {
    return (
      <>
        <PageTransition>
          <AboutUs />
        </PageTransition>
        {shouldShowBottomNav && <BottomNav />}
      </>
    );
  }
  
  // Map-based location selection for quote requests
  if (location.pathname === '/map-pickup-drop') {
    return (
      <PageTransition>
        <MapPickupDrop />
      </PageTransition>
    );
  }
  
  // For instant quote, check if it should go to map view first
  if (location.pathname === '/instant-quote' && !location.search.includes('skip-map')) {
    // Check if there's location data in state, otherwise redirect to map view
    if (!location.state || !location.state.pickupLocation || !location.state.dropoffLocation) {
      // Use setTimeout to avoid navigation during render
      setTimeout(() => {
        navigate('/map-pickup-drop');
      }, 0);
      return null; // Return null until navigation happens
    }
  }
  
  // For other routes in PWA mode, show the normal content with bottom navigation
  return (
    <>
      <Box 
        sx={{ 
          pb: shouldShowBottomNav ? 7 : 0, 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <PageTransition>
          {children}
        </PageTransition>
      </Box>
      {shouldShowBottomNav && <BottomNav />}
      <NetworkStatus />
    </>
  );
};

export default PwaWrapper; 