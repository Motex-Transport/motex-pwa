import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { isPwa } from '../../utils/isPwa';

/**
 * A component for development that shows if the app is being used as a PWA
 */
const PwaDetector: React.FC = () => {
  const isRunningAsPwa = isPwa();
  const isWindows = /Windows NT/.test(window.navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
  // Function to reset the onboarding flow
  const resetPwaFlow = () => {
    localStorage.removeItem('pwa-onboarding-completed');
    localStorage.removeItem('windows-pwa-onboarding-completed');
    localStorage.removeItem('pwa-banner-dismissed');
    localStorage.removeItem('windows-install-prompt-dismissed');
    
    // Add pwa=true to force Windows detection
    const url = new URL(window.location.href);
    url.searchParams.set('pwa', 'true');
    window.location.href = url.toString();
  };
  
  // Function to reset and skip to onboarding
  const showOnboarding = () => {
    localStorage.removeItem('pwa-onboarding-completed');
    localStorage.removeItem('windows-pwa-onboarding-completed');
    
    // Add pwa=true to force Windows detection and skip splash
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
        p: 2,
        width: 320,
        backgroundColor: '#2d2d2d',
        color: 'white',
      }}
    >
      <Typography variant="h6" gutterBottom>
        PWA Debug Panel
      </Typography>
      
      <Box>
        <Typography variant="body2" gutterBottom>
          Running as PWA: <strong>{isRunningAsPwa ? 'Yes' : 'No'}</strong>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Platform: <strong>{isWindows ? 'Windows' : 'Other'}</strong>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Standalone Mode: <strong>{isStandalone ? 'Yes' : 'No'}</strong>
        </Typography>
      </Box>
      
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={resetPwaFlow}
          size="small"
        >
          Force Complete Flow
        </Button>
        
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={showOnboarding}
          size="small"
        >
          Show Onboarding
        </Button>
        
        <Button 
          variant="outlined"
          color="error" 
          onClick={() => localStorage.clear()}
          size="small"
        >
          Clear All Storage
        </Button>
      </Box>
    </Paper>
  );
};

export default PwaDetector; 