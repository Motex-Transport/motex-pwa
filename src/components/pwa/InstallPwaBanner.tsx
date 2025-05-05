import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Box, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import { usePwaInstall } from '../../hooks/usePwaInstall';

const InstallPwaBanner: React.FC = () => {
  const { isInstallable, isInstalled, promptToInstall, isWindows, isEdgeChromium } = usePwaInstall();
  const [showBanner, setShowBanner] = useState(false);
  
  // Check localStorage to see if the user has previously dismissed the banner
  useEffect(() => {
    const hasDismissedBanner = localStorage.getItem('pwa-banner-dismissed') === 'true';
    if (isInstallable && !isInstalled && !hasDismissedBanner) {
      // Show banner after a delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled]);

  const handleDismiss = () => {
    setShowBanner(false);
    // Remember that the user dismissed the banner
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  const handleInstall = async () => {
    const installed = await promptToInstall();
    if (installed) {
      setShowBanner(false);
    }
  };

  if (!showBanner) {
    return null;
  }

  // Adapt text based on the platform
  const getTitle = () => {
    if (isWindows) {
      return isEdgeChromium 
        ? 'Install Motex App on Windows (Edge)' 
        : 'Install Motex App on Windows';
    }
    return 'Install Motex App';
  };

  const getDescription = () => {
    if (isWindows) {
      return isEdgeChromium 
        ? 'Install our app for the best experience on your Windows PC with Edge' 
        : 'Install our app for the best experience on your Windows PC';
    }
    return 'Install our app for the best experience on your device';
  };

  const getButtonText = () => {
    if (isWindows) {
      return 'Install on Windows';
    }
    return 'Install Now';
  };

  return (
    <Collapse in={showBanner}>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          p: 2,
          bgcolor: '#fff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {isWindows ? (
              <DesktopWindowsIcon 
                sx={{ 
                  fontSize: 40, 
                  mr: 2,
                  color: theme => theme.palette.primary.main 
                }} 
              />
            ) : (
              <GetAppIcon 
                sx={{ 
                  fontSize: 40, 
                  mr: 2,
                  color: theme => theme.palette.primary.main 
                }} 
              />
            )}
            <Box>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                {getTitle()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getDescription()}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={handleInstall}
              sx={{
                mr: 2,
                background: 'linear-gradient(45deg, #DE1F27 30%, #FF8E53 90%)',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(45deg, #D31920 30%, #FF7E43 90%)',
                }
              }}
            >
              {getButtonText()}
            </Button>
            
            <IconButton 
              edge="end" 
              color="inherit" 
              onClick={handleDismiss}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Collapse>
  );
};

export default InstallPwaBanner; 