import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { isPwa } from '../../utils/isPwa';

/**
 * A component for development that shows if the app is being used as a PWA
 */
const PwaDetector: React.FC = () => {
  const isRunningAsPwa = isPwa();
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isMobileDevice = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
  
  // Function to reset the onboarding flow
  const resetPwaFlow = () => {
    localStorage.removeItem('pwa-onboarding-completed');
    localStorage.removeItem('pwa-banner-dismissed');
    
    // Add pwa=true to force PWA detection
    const url = new URL(window.location.href);
    url.searchParams.set('pwa', 'true');
    window.location.href = url.toString();
  };
  
  // Function to reset and skip to onboarding
  const showOnboarding = () => {
    localStorage.removeItem('pwa-onboarding-completed');
    
    // Add pwa=true to force PWA detection and skip splash
    const url = new URL(window.location.href);
    url.searchParams.set('pwa', 'true');
    url.searchParams.set('skipSplash', 'true');
    window.location.href = url.toString();
  };
  
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <Paper 
      elevation={3} 
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        padding: 2,
        width: 320,
        maxWidth: '90vw',
      }}
    >
      <Typography variant="h6" gutterBottom>
        PWA Debug Panel
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          Detected as PWA: <strong>{isRunningAsPwa ? 'Yes' : 'No'}</strong>
        </Typography>
        <Typography variant="body2">
          Standalone mode: <strong>{isStandalone ? 'Yes' : 'No'}</strong>
        </Typography>
        <Typography variant="body2">
          Mobile device: <strong>{isMobileDevice ? 'Yes' : 'No'}</strong>
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          onClick={resetPwaFlow}
        >
          Test PWA Flow
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          size="small" 
          onClick={showOnboarding}
        >
          Show Onboarding
        </Button>
      </Box>
    </Paper>
  );
};

export default PwaDetector; 