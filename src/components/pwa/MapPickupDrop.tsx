import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  IconButton,
  Drawer,
  CircularProgress,
  useTheme
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

// This component would normally use a real map library like Google Maps, Mapbox, or Leaflet
// For this example, we'll create a simplified version with a placeholder for the map
const MapPickupDrop: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // State for pickup and dropoff locations
  const [pickupLocation, setPickupLocation] = useState<LocationData | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<LocationData | null>(null);
  const [routeInfo, setRouteInfo] = useState<{distance: string; duration: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock function to simulate location search
  const handleSelectLocation = (purpose: 'pickup' | 'dropoff') => {
    // In a real app, this would navigate to a location search screen or open a search modal
    // For this example, we'll just set mock data
    setTimeout(() => {
      if (purpose === 'pickup') {
        setPickupLocation({
          id: 'pickup-1',
          name: 'Current Location',
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
      
      // If both locations are set, calculate route
      if ((purpose === 'pickup' && dropoffLocation) || 
          (purpose === 'dropoff' && pickupLocation)) {
        calculateRoute();
      }
    }, 1000);
  };
  
  // Mock function to simulate route calculation
  const calculateRoute = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setRouteInfo({
        distance: '3.2 km',
        duration: '12 min',
      });
      setIsLoading(false);
    }, 1500);
  };
  
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
  
  // Simulate using current location
  const useCurrentLocation = () => {
    setIsLoading(true);
    // Simulate geolocation delay
    setTimeout(() => {
      setPickupLocation({
        id: 'current-location',
        name: 'Current Location',
        address: '123 Main Street, Sydney NSW 2000',
        coordinate: { latitude: -33.8688, longitude: 151.2093 },
      });
      setIsLoading(false);
      
      if (dropoffLocation) {
        calculateRoute();
      }
    }, 1000);
  };
  
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
      
      {/* Map View (Placeholder) */}
      <Box 
        sx={{ 
          flex: 1, 
          position: 'relative',
          backgroundColor: '#e5e5e5',  // Placeholder color
          overflow: 'hidden'
        }}
      >
        {/* This would be replaced with an actual map component */}
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
            flexDirection: 'column',
            color: '#666'
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            Map Placeholder
          </Typography>
          {isLoading && (
            <CircularProgress size={28} color="primary" />
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
            onClick={useCurrentLocation}
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
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: theme.palette.success.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                mr: 2,
              }}
            >
              <LocationOnIcon fontSize="small" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  fontSize: '12px',
                  mb: 0.5,
                }}
              >
                Pickup Location
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: '14px',
                  color: pickupLocation ? '#000000' : '#9e9e9e',
                }}
              >
                {pickupLocation ? pickupLocation.name : 'Select pickup location'}
              </Typography>
              {pickupLocation && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: '12px',
                    mt: 0.5,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {pickupLocation.address}
                </Typography>
              )}
            </Box>
            <NavigateNextIcon color="action" />
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
                bgcolor: dropoffLocation ? '#ffe6e6' : '#f5f5f5',
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: theme.palette.error.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                mr: 2,
              }}
            >
              <LocationOnIcon fontSize="small" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  fontSize: '12px',
                  mb: 0.5,
                }}
              >
                Dropoff Location
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: '14px',
                  color: dropoffLocation ? '#000000' : '#9e9e9e',
                }}
              >
                {dropoffLocation ? dropoffLocation.name : 'Select dropoff location'}
              </Typography>
              {dropoffLocation && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: '12px',
                    mt: 0.5,
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {dropoffLocation.address}
                </Typography>
              )}
            </Box>
            <NavigateNextIcon color="action" />
          </Paper>

          {/* Route Information */}
          {routeInfo && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 3,
                mb: 2.5,
                mt: 1
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StraightenIcon sx={{ color: '#666', mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {routeInfo.distance}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ color: '#666', mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {routeInfo.duration}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Confirm Button */}
          <Button
            variant="contained"
            fullWidth
            disabled={!pickupLocation || !dropoffLocation}
            onClick={handleProceed}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: '#ffffff',
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
              '&.Mui-disabled': {
                bgcolor: '#e0e0e0',
                color: '#9e9e9e',
              },
            }}
          >
            Confirm Locations
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MapPickupDrop; 