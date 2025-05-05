import React from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useOfflineStatus } from '../../utils/offlineManager';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

/**
 * A component that shows the current network status
 * and pending operations when offline
 */
const NetworkStatus: React.FC = () => {
  const { isOffline, hasPendingOperations } = useOfflineStatus();
  
  return (
    <>
      <AnimatePresence>
        {isOffline && (
          <Snackbar 
            open={true}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ mb: 7 }} // Above bottom navigation
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                severity="warning"
                icon={<WifiOffIcon />}
                sx={{ 
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: 'rgba(30, 30, 30, 0.95)',
                  color: '#fff',
                  '.MuiAlert-icon': {
                    color: '#ffee58'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    You're offline
                  </Typography>
                  {hasPendingOperations && (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      ml: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: 10,
                      px: 1,
                      py: 0.25
                    }}>
                      <CloudSyncIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      <Typography variant="caption">
                        Pending syncs
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Alert>
            </motion.div>
          </Snackbar>
        )}
      </AnimatePresence>
    </>
  );
};

export default NetworkStatus; 