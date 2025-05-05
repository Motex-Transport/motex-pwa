import { useState, useEffect } from 'react';
import { isPwa } from '../utils/isPwa';

interface PwaDetectionState {
  isPwa: boolean;
  showSplash: boolean;
  showOnboarding: boolean;
  hasSeenOnboarding: boolean;
  isWindows: boolean;
}

export const usePwaDetection = (): PwaDetectionState & {
  onSplashFinish: () => void;
  onOnboardingComplete: () => void;
} => {
  const [state, setState] = useState<PwaDetectionState>({
    isPwa: false,
    showSplash: false,
    showOnboarding: false,
    hasSeenOnboarding: false,
    isWindows: false
  });

  useEffect(() => {
    // Detect Windows platform
    const isWindowsOS = /Windows NT/.test(window.navigator.userAgent);
    
    // Check if the app is running as a PWA
    const isPwaApp = isPwa();
    
    if (isPwaApp || isWindowsOS) {
      // For Windows, check the display mode to verify if it's installed as PWA
      const isDisplayModeStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isWindowsPwa = isWindowsOS && isDisplayModeStandalone;
      
      // Check if the user has already completed onboarding
      // We store different keys for Windows vs mobile PWA
      const storageKey = isWindowsOS ? 'windows-pwa-onboarding-completed' : 'pwa-onboarding-completed';
      const hasSeenOnboarding = localStorage.getItem(storageKey) === 'true';
      
      // Force onboarding to show for Windows users if it's detected as a PWA
      // or if the URL has a special flag (for testing)
      const forceWindowsOnboarding = isWindowsPwa || 
                                    (isWindowsOS && window.location.search.includes('pwa=true'));
      
      // Fixed: If it's PWA and hasn't seen onboarding, show splash first
      // If it's a Windows app being installed for the first time
      // Also force as PWA if it's Windows with the special flag
      const shouldShowPwa = isPwaApp || forceWindowsOnboarding;
      
      // Use a separate variable to control if we skip splash and go straight to onboarding
      const skipSplash = window.location.search.includes('skipSplash=true');
      
      setState({
        isPwa: shouldShowPwa,
        showSplash: !hasSeenOnboarding && shouldShowPwa && !skipSplash,
        showOnboarding: !hasSeenOnboarding && shouldShowPwa && skipSplash,
        hasSeenOnboarding,
        isWindows: isWindowsOS
      });
      
      // Log state for debugging
      console.log('usePwaDetection initialization:', {
        isPwa: shouldShowPwa,
        showSplash: !hasSeenOnboarding && shouldShowPwa && !skipSplash,
        showOnboarding: !hasSeenOnboarding && shouldShowPwa && skipSplash,
        hasSeenOnboarding,
        isWindows: isWindowsOS,
        forceWindowsOnboarding,
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
    // Use different storage keys for Windows vs mobile
    const storageKey = state.isWindows ? 'windows-pwa-onboarding-completed' : 'pwa-onboarding-completed';
    
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
