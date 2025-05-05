import React from 'react';
import { Paper, PaperProps } from '@mui/material';
import { motion } from 'framer-motion';

// Extend PaperProps to include onClick handler
interface TouchableCardProps extends PaperProps {
  onClick?: () => void;
}

/**
 * A card component with touch feedback similar to native mobile apps
 */
const TouchableCard: React.FC<TouchableCardProps> = ({ 
  children, 
  onClick, 
  sx = {}, 
  elevation = 0,
  ...props 
}) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      onClick={onClick}
      style={{ 
        width: '100%',
        overflow: 'hidden',
        willChange: 'transform', // Optimize for animations
        WebkitTapHighlightColor: 'transparent', // Remove tap highlight on mobile
      }}
    >
      <Paper
        elevation={elevation}
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 1,
          ...sx,
        }}
        {...props}
      >
        {children}
      </Paper>
    </motion.div>
  );
};

export default TouchableCard; 