import React from 'react';
import { Button, Snackbar, Alert, Typography, Box, styled, Tooltip } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import { usePwaInstall } from '../../hooks/usePwaInstall';

const InstallButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #DE1F27 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 50,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: '16px 0',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(45deg, #D31920 30%, #FF7E43 90%)',
  }
}));

interface InstallPwaButtonProps {
  variant?: 'button' | 'fab';
  size?: 'small' | 'medium' | 'large';
  buttonText?: string;
}

const InstallPwaButton: React.FC<InstallPwaButtonProps> = ({ 
  variant = 'button', 
  size = 'medium',
  buttonText = 'Install App'
}) => {
  const { isInstallable, isInstalled, promptToInstall, isWindows, isEdgeChromium } = usePwaInstall();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const handleInstallClick = async () => {
    try {
      const installed = await promptToInstall();
      if (installed) {
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Install error:', error);
      setShowError(true);
    }
  };

  // Don't render anything if the app is already installed or not installable
  if (isInstalled || !isInstallable) {
    return null;
  }

  // Create OS-specific button text
  const getButtonContent = () => {
    if (isWindows) {
      return isEdgeChromium 
        ? 'Install on Windows (Edge)' 
        : 'Install on Windows';
    }
    return buttonText;
  };

  // Create tooltip content based on browser
  const getTooltipContent = () => {
    if (isWindows) {
      if (isEdgeChromium) {
        return 'Click to see how to install in Edge. Look for the "..." menu → Apps → Install this site as an app';
      }
      return 'Click to see how to install this app on Windows. Look for browser menu → Install app';
    }
    return 'Install this app to use it offline';
  };

  const buttonContent = getButtonContent();
  const tooltipContent = getTooltipContent();

  return (
    <>
      {variant === 'button' ? (
        <Tooltip title={tooltipContent} arrow placement="top">
          <InstallButton
            size={size}
            startIcon={isWindows ? <DesktopWindowsIcon /> : <GetAppIcon />}
            onClick={handleInstallClick}
            aria-label="Install app"
          >
            {buttonContent}
          </InstallButton>
        </Tooltip>
      ) : (
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <Tooltip title={tooltipContent} arrow placement="left">
            <Button
              variant="contained"
              color="primary"
              size={size}
              startIcon={isWindows ? <DesktopWindowsIcon /> : <GetAppIcon />}
              onClick={handleInstallClick}
              aria-label="Install app"
              sx={{ borderRadius: '50%', p: size === 'small' ? 1 : 2 }}
            >
              {size === 'small' ? (isWindows ? <DesktopWindowsIcon /> : <GetAppIcon />) : buttonContent}
            </Button>
          </Tooltip>
        </Box>
      )}

      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          <Typography>
            {isWindows 
              ? 'Follow the instructions to complete installation' 
              : 'App installation started!'}
          </Typography>
        </Alert>
      </Snackbar>

      <Snackbar 
        open={showError} 
        autoHideDuration={6000} 
        onClose={() => setShowError(false)}
      >
        <Alert onClose={() => setShowError(false)} severity="error">
          <Typography>Couldn't install the app. Try again later.</Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default InstallPwaButton; 