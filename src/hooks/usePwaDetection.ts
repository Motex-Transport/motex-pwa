import { useState, useEffect } from 'react';
import { isPwa } from '../utils/isPwa';

interface PwaDetectionState {
  isPwa: boolean;
  showSplash: boolean;
  showOnboarding: boolean;
  hasSeenOnboarding: boolean;
}

export const usePwaDetection = (): PwaDetectionState & {
  onSplashFinish: () => void;
  onOnboardingComplete: () => void;
} => {
  const [state, setState] = useState<PwaDetectionState>({
    isPwa: false,
    showSplash: false,
    showOnboarding: false,
    hasSeenOnboarding: false
  });

  useEffect(() => {
    // Check if the app is running as a PWA
    const isPwaApp = isPwa();
    
    if (isPwaApp) {
      // Check if the user has already completed onboarding
      const storageKey = 'pwa-onboarding-completed';
      const hasSeenOnboarding = localStorage.getItem(storageKey) === 'true';
      
      // If it's PWA and hasn't seen onboarding, show splash first
      const skipSplash = window.location.search.includes('skipSplash=true');
      
      setState({
        isPwa: isPwaApp,
        showSplash: !hasSeenOnboarding && isPwaApp && !skipSplash,
        showOnboarding: !hasSeenOnboarding && isPwaApp && skipSplash,
        hasSeenOnboarding
      });
      
      // Log state for debugging
      console.log('usePwaDetection initialization:', {
        isPwa: isPwaApp,
        showSplash: !hasSeenOnboarding && isPwaApp && !skipSplash,
        showOnboarding: !hasSeenOnboarding && isPwaApp && skipSplash,
        hasSeenOnboarding,
        skipSplash
      });
    }
  }, []);

  const onSplashFinish = () => {
    console.log('Splash finished, showing onboarding');
    setState(prev => ({
      ...prev,
      showSplash: false,
      showOnboarding: true
    }));
  };

  const onOnboardingComplete = () => {
    const storageKey = 'pwa-onboarding-completed';
    
    console.log('Onboarding completed, setting storage key:', storageKey);
    setState(prev => ({
      ...prev,
      showOnboarding: false,
      hasSeenOnboarding: true
    }));
    
    localStorage.setItem(storageKey, 'true');
  };

  return {
    ...state,
    onSplashFinish,
    onOnboardingComplete
  };
};
