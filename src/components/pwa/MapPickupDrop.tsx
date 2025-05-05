import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  IconButton,
  Drawer,
  CircularProgress,
  useTheme,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StraightenIcon from '@mui/icons-material/Straighten';

// Define types
interface Coordinate {
  latitude: number;
  longitude: number;
}

interface LocationData {
  id: string;
  name: string;
  address: string;
  coordinate: Coordinate;
}

// This component creates a simplified map visualization with pickup, dropoff and route
const MapPickupDrop: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // State for pickup and dropoff locations
  const [pickupLocation, setPickupLocation] = useState<LocationData | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<LocationData | null>(null);
  const [routeInfo, setRouteInfo] = useState<{distance: string; duration: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Handle location search selection
  const handleSelectLocation = (purpose: 'pickup' | 'dropoff') => {
    setIsLoading(true);
    
    // Simulate a location search and selection
    setTimeout(() => {
      if (purpose === 'pickup') {
        setPickupLocation({
          id: 'pickup-1',
          name: 'Custom Pickup',
          address: '123 Main Street, Sydney NSW 2000',
          coordinate: { latitude: -33.8688, longitude: 151.2093 },
        });
      } else {
        setDropoffLocation({
          id: 'dropoff-1',
          name: 'Sydney Opera House',
          address: 'Bennelong Point, Sydney NSW 2000',
          coordinate: { latitude: -33.8568, longitude: 151.2153 },
        });
      }
      
      setIsLoading(false);
      
      // If both locations are set, calculate route
      if ((purpose === 'pickup' && dropoffLocation) || 
          (purpose === 'dropoff' && pickupLocation)) {
        calculateRoute();
      }
    }, 1000);
  };
  
  // Calculate route between pickup and dropoff
  const calculateRoute = useCallback(() => {
    if (!pickupLocation || !dropoffLocation) return;
    
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setRouteInfo({
        distance: '3.2 km',
        duration: '12 min',
      });
      setIsLoading(false);
    }, 1000);
  }, [pickupLocation, dropoffLocation]);
  
  // Navigate back
  const handleBack = () => {
    navigate(-1);
  };
  
  // Proceed to quote details
  const handleProceed = () => {
    if (pickupLocation && dropoffLocation) {
      // In a real app, you would pass the location data to the next screen
      navigate('/instant-quote', {
        state: {
          pickupLocation,
          dropoffLocation,
          routeInfo
        }
      });
    }
  };
  
  // Use device geolocation - defined as a callback to avoid rules of hooks error
  const getCurrentLocation = useCallback(() => {
    setIsLoading(true);
    setLocationError(null);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success handler
          const { latitude, longitude } = position.coords;
          
          // Reverse geocode to get address (simulated here)
          setPickupLocation({
            id: 'current-location',
            name: 'Current Location',
            address: 'Your Current Location',
            coordinate: { latitude, longitude },
          });
          
          setIsLoading(false);
          
          if (dropoffLocation) {
            calculateRoute();
          }
        },
        (error) => {
          // Error handler
          console.error('Geolocation error:', error);
          setIsLoading(false);
          setLocationError('Could not access your location. Please check your device settings.');
        },
        { 
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setIsLoading(false);
      setLocationError('Geolocation is not supported by your browser');
    }
  }, [dropoffLocation, calculateRoute]);
  
  // Button handler for getting current location
  const handleGetCurrentLocation = () => {
    getCurrentLocation();
  };
  
  // Try to get user location when component mounts
  useEffect(() => {
    if (!pickupLocation) {
      getCurrentLocation();
    }
  }, [pickupLocation, getCurrentLocation]);
  
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 1.5,
          borderRadius: 0,
          backgroundColor: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <IconButton 
          onClick={handleBack}
          sx={{ color: '#ffffff', p: 1 }}
          edge="start"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '18px',
            ml: 1
          }}
        >
          Set Pickup & Dropoff
        </Typography>
      </Paper>
      
      {/* Simplified Map View */}
      <Box 
        sx={{ 
          flex: 1, 
          position: 'relative',
          backgroundColor: '#e9eef2',
          overflow: 'hidden'
        }}
      >
        {/* This is a simplified map visualization */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isLoading ? (
            <CircularProgress size={40} color="primary" />
          ) : (
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              {/* Simplified route visualization */}
              {pickupLocation && dropoffLocation && routeInfo && (
                <Box sx={{ width: '100%', height: '100%', position: 'absolute' }}>
                  {/* Route line */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '40%',
                      left: '30%',
                      width: '40%',
                      height: '4px',
                      backgroundColor: theme.palette.primary.main,
                      transform: 'rotate(15deg)',
                      transformOrigin: '0 0',
                      borderRadius: '4px',
                      boxShadow: '0 0 8px rgba(0,0,0,0.2)',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                        animation: 'routeAnimation 1.5s infinite linear',
                        borderRadius: '4px',
                      },
                      '@keyframes routeAnimation': {
                        '0%': {
                          opacity: 1,
                          transform: 'translateX(-100%)'
                        },
                        '100%': {
                          opacity: 0.6,
                          transform: 'translateX(100%)'
                        }
                      }
                    }}
                  />
                </Box>
              )}
              
              {/* Pickup marker */}
              {pickupLocation && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '30%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                  }}
                >
                  <Box sx={{ 
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <LocationOnIcon 
                      sx={{ 
                        fontSize: 40, 
                        color: theme.palette.primary.main,
                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))'
                      }} 
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 500,
                        maxWidth: 120,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                      }}
                    >
                      {pickupLocation.name}
                    </Typography>
                  </Box>
                </Box>
              )}
              
              {/* Dropoff marker */}
              {dropoffLocation && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '45%',
                    left: '70%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                  }}
                >
                  <Box sx={{ 
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <LocationOnIcon 
                      sx={{ 
                        fontSize: 40, 
                        color: '#e53935',
                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))'
                      }} 
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 500,
                        maxWidth: 120,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                      }}
                    >
                      {dropoffLocation.name}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
        
        {/* Current Location Button */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 24,
            right: 16,
            zIndex: 5,
          }}
        >
          <IconButton
            onClick={handleGetCurrentLocation}
            sx={{
              bgcolor: '#ffffff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
          >
            <MyLocationIcon />
          </IconButton>
        </Box>
      </Box>
      
      {/* Location Input Panel */}
      <Drawer
        variant="permanent"
        anchor="bottom"
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '40%',
            boxSizing: 'border-box',
            boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
          },
          zIndex: 5,
        }}
      >
        <Box sx={{ px: 2, pt: 2, pb: 3 }}>
          {/* Pickup Location Input */}
          <Paper
            elevation={0}
            onClick={() => handleSelectLocation('pickup')}
            sx={{
              p: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              cursor: 'pointer',
              bgcolor: pickupLocation ? '#f0f8ff' : '#ffffff',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: pickupLocation ? '#e6f2ff' : '#f5f5f5',
              },
            }}
          >
            <LocationOnIcon 
              sx={{ 
                color: theme.palette.primary.main, 
                mr: 1.5,
                fontSize: 28
              }} 
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0.2 }}>
                {pickupLocation ? pickupLocation.name : 'Set Pickup Location'}
              </Typography>
              {pickupLocation && (
                <Typography variant="caption" color="text.secondary" noWrap>
                  {pickupLocation.address}
                </Typography>
              )}
            </Box>
          </Paper>

          {/* Dropoff Location Input */}
          <Paper
            elevation={0}
            onClick={() => handleSelectLocation('dropoff')}
            sx={{
              p: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              cursor: 'pointer',
              bgcolor: dropoffLocation ? '#fff5f5' : '#ffffff',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: dropoffLocation ? '#ffebeb' : '#f5f5f5',
              },
            }}
          >
            <LocationOnIcon 
              sx={{ 
                color: '#e53935', 
                mr: 1.5,
                fontSize: 28 
              }} 
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0.2 }}>
                {dropoffLocation ? dropoffLocation.name : 'Set Dropoff Location'}
              </Typography>
              {dropoffLocation && (
                <Typography variant="caption" color="text.secondary" noWrap>
                  {dropoffLocation.address}
                </Typography>
              )}
            </Box>
          </Paper>

          {/* Route Information */}
          {routeInfo && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-around',
                mb: 2,
                p: 1.5,
                borderRadius: 2,
                backgroundColor: '#f5f5f5' 
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body2" fontWeight={500}>
                  {routeInfo.duration}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StraightenIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body2" fontWeight={500}>
                  {routeInfo.distance}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Continue Button */}
          <Button
            variant="contained"
            fullWidth
            disabled={!pickupLocation || !dropoffLocation}
            endIcon={<NavigateNextIcon />}
            onClick={handleProceed}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Continue to Quote
          </Button>
        </Box>
      </Drawer>
      
      {/* Location Error Snackbar */}
      <Snackbar 
        open={!!locationError} 
        autoHideDuration={6000} 
        onClose={() => setLocationError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setLocationError(null)} 
          severity="warning" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {locationError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MapPickupDrop; 