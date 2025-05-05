import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';

const WindowsInstallPrompt: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isWindows = /Windows NT/.test(window.navigator.userAgent);
  const isEdge = /Edg/.test(window.navigator.userAgent);
  const isChrome = /Chrome/.test(window.navigator.userAgent) && !/Edg/.test(window.navigator.userAgent);
  
  useEffect(() => {
    // Only show for Windows users who are not already in standalone mode
    if (isWindows && !window.matchMedia('(display-mode: standalone)').matches) {
      // Check if the prompt has been dismissed
      const hasPromptBeenDismissed = localStorage.getItem('windows-install-prompt-dismissed') === 'true';
      
      if (!hasPromptBeenDismissed) {
        // Wait a bit before showing the prompt
        const timer = setTimeout(() => {
          setOpen(true);
        }, 10000); // Show after 10 seconds
        
        return () => clearTimeout(timer);
      }
    }
  }, [isWindows]);
  
  const handleClose = () => {
    setOpen(false);
    // Remember that the user dismissed the prompt
    localStorage.setItem('windows-install-prompt-dismissed', 'true');
  };
  
  // Generate steps based on the browser
  const getSteps = () => {
    if (isEdge) {
      return [
        'Click the "..." menu in the top-right corner',
        'Select "Apps" from the dropdown menu',
        'Click "Install this site as an app"'
      ];
    } else if (isChrome) {
      return [
        'Click the three-dot menu in the top-right corner',
        'Select "Install Motex Transport..." from the dropdown',
        'Click "Install" in the dialog that appears'
      ];
    } else {
      return [
        'Open the browser menu',
        'Look for an "Install" or "Add to Home Screen" option',
        'Follow the prompts to install the app'
      ];
    }
  };
  
  const steps = getSteps();
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="windows-install-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="windows-install-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
        <DesktopWindowsIcon sx={{ mr: 1, color: '#DE1F27' }} />
        Install Motex as Windows App
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Get a better experience by installing Motex Transport as a desktop app on your Windows PC.
        </Typography>
        
        <Box sx={{ mt: 3, mb: 2 }}>
          <Stepper activeStep={-1} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Installing the app will give you a more native experience and let you access Motex Transport directly from your Start menu.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Remind me later
        </Button>
        <Button 
          onClick={() => {
            handleClose();
            // Set a flag to not show this again
            localStorage.setItem('windows-install-prompt-dismissed', 'true');
          }} 
          variant="contained" 
          sx={{ 
            background: 'linear-gradient(45deg, #DE1F27 30%, #FF8E53 90%)',
            color: 'white'
          }}
        >
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WindowsInstallPrompt; 