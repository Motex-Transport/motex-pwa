import React, { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  pullThreshold?: number;
  maxPullDistance?: number;
  refreshIndicatorHeight?: number;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ 
  onRefresh,
  children,
  pullThreshold = 80, 
  maxPullDistance = 120,
  refreshIndicatorHeight = 60
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const theme = useTheme();
  
  // Motion values for pull distance
  const pullDistance = useMotionValue(0);
  const pullProgress = useTransform(
    pullDistance, 
    [0, pullThreshold], 
    [0, 1]
  );
  
  // Rotate spinner based on pull progress
  const spinnerRotation = useTransform(
    pullProgress,
    [0, 1],
    [0, 270]
  );
  
  // Scale progress indicator based on pull progress
  const progressScale = useTransform(
    pullProgress,
    [0, 0.8, 1],
    [0.6, 0.9, 1]
  );
  
  // Effect to check if we're at the top of the page
  useEffect(() => {
    const checkScrollPosition = () => {
      if (!containerRef.current) return;
      setEnabled(containerRef.current.scrollTop <= 0);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);
  
  // Handle touch events for pulling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enabled || refreshing) return;
    
    startY.current = e.touches[0].clientY;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enabled || refreshing || startY.current === null) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    // Only allow pulling down
    if (diff > 0) {
      // Apply resistance to make pulling feel more natural
      const resistance = 0.4;
      const newPullDistance = Math.min(diff * resistance, maxPullDistance);
      pullDistance.set(newPullDistance);
      
      // Prevent default to avoid scrolling
      e.preventDefault();
    }
  };
  
  const handleTouchEnd = async () => {
    if (!enabled || startY.current === null) return;
    
    const currentPullDistance = pullDistance.get();
    
    if (currentPullDistance >= pullThreshold && !refreshing) {
      // Trigger refresh
      setRefreshing(true);
      
      // Snap to threshold distance to show the loading indicator
      pullDistance.set(refreshIndicatorHeight);
      
      try {
        // Call the refresh function
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        // Reset after refresh
        setRefreshing(false);
        pullDistance.set(0);
      }
    } else {
      // Reset if not enough to trigger refresh
      pullDistance.set(0);
    }
    
    startY.current = null;
  };
  
  return (
    <Box 
      sx={{ 
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Pull indicator */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: refreshIndicatorHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          y: pullDistance,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            scale: progressScale,
          }}
        >
          <motion.div
            style={{
              rotate: refreshing ? 360 : spinnerRotation,
            }}
            animate={refreshing ? { rotate: 360 } : {}}
            transition={refreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
          >
            <CircularProgress 
              size={24} 
              thickness={4} 
              sx={{ color: theme.palette.primary.main }}
            />
          </motion.div>
          <Typography 
            variant="caption" 
            sx={{ 
              mt: 0.5, 
              color: theme.palette.primary.main,
              fontWeight: 500
            }}
          >
            {refreshing ? 'Refreshing...' : 'Pull to refresh'}
          </Typography>
        </motion.div>
      </motion.div>
      
      {/* Main content */}
      <motion.div
        ref={containerRef}
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          overflowY: 'auto',
          overflowX: 'hidden',
          y: pullDistance,
          touchAction: enabled && !refreshing ? 'pan-x' : 'auto',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </motion.div>
    </Box>
  );
};

export default PullToRefresh; 