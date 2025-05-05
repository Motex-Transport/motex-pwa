import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button,
  IconButton,
  Container,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  LocalShipping as LocalShippingIcon,
  ListAlt as ListAltIcon,
  ContactPhone as ContactPhoneIcon,
  Home as HomeIcon,
  Inventory as InventoryIcon,
  Receipt as ReceiptIcon,
  Person as PersonIcon,
  Support as SupportIcon,
} from '@mui/icons-material';

// Define the primary color
const PRIMARY_COLOR = '#DE1F27';

// Styled components
const BottomNavItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  padding: theme.spacing(1),
  cursor: 'pointer',
}));

const ServiceCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: 16,
  boxShadow: 'none',
  border: '1px solid #f0f0f0',
  height: '100%',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
}));

const IconCircle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: PRIMARY_COLOR,
  borderRadius: '50%',
  width: 56,
  height: 56,
  marginBottom: theme.spacing(1.5),
  color: '#fff',
}));

const MobileHome: React.FC = () => {
  const navigate = useNavigate();

  // Service data
  const services = [
    { 
      id: 'parcel-delivery', 
      title: 'Parcel Delivery', 
      icon: <LocalShippingIcon fontSize="medium" /> 
    },
    { 
      id: 'fragile-freight', 
      title: 'Fragile Freight', 
      icon: <InventoryIcon fontSize="medium" /> 
    },
    { 
      id: 'chauffeur-services', 
      title: 'Chauffeur Services', 
      icon: <PersonIcon fontSize="medium" /> 
    },
    { 
      id: 'door-to-door', 
      title: 'Door to Door', 
      icon: <HomeIcon fontSize="medium" /> 
    },
    { 
      id: 'same-day-delivery', 
      title: 'Same Day Delivery', 
      icon: <LocalShippingIcon fontSize="medium" /> 
    },
    { 
      id: 'interstate-delivery', 
      title: 'Interstate Delivery', 
      icon: <LocalShippingIcon fontSize="medium" /> 
    },
  ];

  const handleServiceClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', pb: 7 }}>
      {/* Image Slider */}
      <Box 
        sx={{ 
          height: 280, 
          backgroundColor: '#f5f5f5', 
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box 
          component="img"
          src="/PHOTO-2025-03-22-21-36-54.jpg"
          alt="Motex Transport"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        
        {/* Pagination dots */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 16, 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
          }}
        >
          {[0, 1, 2, 3].map((dot, index) => (
            <Box
              key={index}
              sx={{
                width: index === 1 ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: index === 1 ? PRIMARY_COLOR : '#fff',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Main action buttons */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          mx: 2,
          mt: -3,
          mb: 3,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            p: 2,
            backgroundColor: '#000',
            borderRadius: 4,
          }}
        >
          <Box 
            onClick={() => handleNavigation('/instant-quote')}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <IconButton 
              sx={{ 
                backgroundColor: PRIMARY_COLOR, 
                color: '#fff',
                mb: 1,
                '&:hover': { backgroundColor: PRIMARY_COLOR },
              }}
            >
              <ReceiptIcon />
            </IconButton>
            <Typography variant="caption" color="#fff" align="center">
              Request Quote
            </Typography>
          </Box>

          <Box 
            onClick={() => handleNavigation('/my-requests')}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <IconButton 
              sx={{ 
                backgroundColor: '#333', 
                color: '#fff',
                mb: 1,
                '&:hover': { backgroundColor: '#444' }, 
              }}
            >
              <ListAltIcon />
            </IconButton>
            <Typography variant="caption" color="#fff" align="center">
              My Requests
            </Typography>
          </Box>

          <Box 
            onClick={() => handleNavigation('/contact-us')}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <IconButton 
              sx={{ 
                backgroundColor: '#333', 
                color: '#fff',
                mb: 1,
                '&:hover': { backgroundColor: '#444' },
              }}
            >
              <ContactPhoneIcon />
            </IconButton>
            <Typography variant="caption" color="#fff" align="center">
              Contact Us
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Services Section */}
      <Container sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              fontFamily: '"Poppins", sans-serif',
              color: '#333',
            }}
          >
            Our Services
          </Typography>
          <Typography 
            variant="body2" 
            color={PRIMARY_COLOR} 
            sx={{ 
              fontWeight: 'medium',
              cursor: 'pointer',
              fontFamily: '"Poppins", sans-serif',
            }}
            onClick={() => handleNavigation('/services')}
          >
            See All
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {services.map((service) => (
            <Grid item xs={4} key={service.id}>
              <ServiceCard onClick={() => handleServiceClick(service.id)}>
                <IconCircle>
                  {service.icon}
                </IconCircle>
                <Typography 
                  variant="caption" 
                  align="center" 
                  sx={{ 
                    fontWeight: 'medium',
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  {service.title}
                </Typography>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Bottom Navigation */}
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderRadius: 0,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        }}
        elevation={0}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            p: 1,
          }}
        >
          <BottomNavItem>
            <IconButton 
              color="primary" 
              sx={{ color: '#DE1F27' }}
              onClick={() => handleNavigation('/')}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="caption" color="text.primary">Home</Typography>
          </BottomNavItem>
          
          <BottomNavItem onClick={() => handleNavigation('/instant-quote')}>
            <IconButton sx={{ color: '#666' }}>
              <ReceiptIcon />
            </IconButton>
            <Typography variant="caption" color="text.secondary">Quote Request</Typography>
          </BottomNavItem>
          
          <BottomNavItem onClick={() => handleNavigation('/my-requests')}>
            <IconButton sx={{ color: '#666' }}>
              <ListAltIcon />
            </IconButton>
            <Typography variant="caption" color="text.secondary">Requests</Typography>
          </BottomNavItem>
          
          <BottomNavItem onClick={() => handleNavigation('/support')}>
            <IconButton sx={{ color: '#666' }}>
              <SupportIcon />
            </IconButton>
            <Typography variant="caption" color="text.secondary">Support</Typography>
          </BottomNavItem>
          
          <BottomNavItem onClick={() => handleNavigation('/profile')}>
            <IconButton sx={{ color: '#666' }}>
              <PersonIcon />
            </IconButton>
            <Typography variant="caption" color="text.secondary">Profile</Typography>
          </BottomNavItem>
        </Box>
      </Paper>
    </Box>
  );
};

export default MobileHome; 