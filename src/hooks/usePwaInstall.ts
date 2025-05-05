import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePwaInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isWindows, setIsWindows] = useState(false);
  const [isEdgeChromium, setIsEdgeChromium] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Check if we're on Windows
    const userAgent = window.navigator.userAgent;
    const isWindowsOS = /Windows NT/.test(userAgent);
    setIsWindows(isWindowsOS);

    // Check if browser is Edge Chromium
    const isEdge = /Edg/.test(userAgent);
    setIsEdgeChromium(isEdge);

    // If we're on Windows but didn't get the beforeinstallprompt event,
    // we still want to show the install button with manual instructions
    if (isWindowsOS && !deferredPrompt) {
      setIsInstallable(true);
    }

    // Handle the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for the appinstalled event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [deferredPrompt]);

  const promptToInstall = async () => {
    if (deferredPrompt) {
      try {
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;
        
        // Reset the deferred prompt variable
        setDeferredPrompt(null);
        
        // User accepted the installation
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          return true;
        } else {
          console.log('User dismissed the install prompt');
          return false;
        }
      } catch (error) {
        console.error('Error during installation prompt:', error);
        return false;
      }
    } else if (isWindows) {
      // For Windows, provide manual installation steps
      // On Edge, we can give specific instructions
      if (isEdgeChromium) {
        // Show tooltip or alert with Edge-specific install instructions
        alert('To install this app in Edge:\n\n1. Click the "..." menu in the upper right corner\n2. Select "Apps"\n3. Click "Install this site as an app"');
      } else {
        // Generic Chrome or other browser instructions
        alert('To install this app:\n\n1. Open the browser menu in the upper right corner\n2. Look for "Install app" or "Install Motex Transport"\n3. Follow the prompts to complete installation');
      }
      return true;
    } else {
      console.log('Installation prompt not available');
      return false;
    }
  };

  return { isInstallable, isInstalled, promptToInstall, isWindows, isEdgeChromium };
}; 