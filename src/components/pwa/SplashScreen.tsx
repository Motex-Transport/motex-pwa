import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const isWindows = /Windows NT/.test(window.navigator.userAgent);
  
  useEffect(() => {
    // Longer delay for first-time launch to ensure a good experience
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [onFinish]);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Box
          component="img"
          src="/MOTEX+Logo.png"
          alt="Motex Transport Logo"
          sx={{ 
            width: '100%', 
            maxWidth: '180px',
            mb: 4
          }}
        />
      </motion.div>
      
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white',
              mb: 1,
              fontWeight: 'bold',
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            Motex Transport
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            {isWindows ? 'Windows App Experience' : 'Mobile App Experience'}
          </Typography>
        </motion.div>
      </Box>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <CircularProgress 
          sx={{ 
            color: '#DE1F27',
            mt: 2 
          }} 
        />
      </motion.div>
    </Box>
  );
};

export default SplashScreen; 