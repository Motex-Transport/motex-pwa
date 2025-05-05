import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  Button, 
  Divider, 
  useTheme,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShieldIcon from '@mui/icons-material/Shield';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArticleIcon from '@mui/icons-material/Article';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PhoneIcon from '@mui/icons-material/Phone';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleBack = () => {
    navigate(-1);
  };

  const navigateToContact = () => {
    navigate('/contact-us');
  };

  const handleLinkPress = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8f8f8' }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          px: 2,
          py: 1.5,
          borderRadius: 0,
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        <IconButton 
          onClick={handleBack}
          sx={{ color: '#333', p: 1 }}
          edge="start"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#333333',
            fontWeight: 600,
            fontSize: '18px',
            ml: 1
          }}
        >
          About Us
        </Typography>
      </Paper>

      {/* Content - Scrollable Area */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 2 }}>
        {/* Company Overview */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2.5, 
            mb: 2, 
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '18px',
              mb: 1.5,
              color: '#333'
            }}
          >
            About Motex Transport
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#555',
              mb: 2,
              lineHeight: 1.6,
              fontSize: '14px'
            }}
          >
            Motex Transport is a leading vehicle transport company dedicated to providing reliable, 
            safe, and efficient transport services for all types of vehicles across the country.
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#555',
              lineHeight: 1.6,
              fontSize: '14px'
            }}
          >
            Founded in 2010, we have over a decade of experience in the vehicle transport industry. 
            Our team of professional drivers and logistics experts ensure your vehicle arrives at its 
            destination safely and on time.
          </Typography>
        </Paper>

        {/* Our Services */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2.5, 
            mb: 2, 
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '18px',
              mb: 1.5,
              color: '#333'
            }}
          >
            Our Services
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', mb: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                <DirectionsCarIcon fontSize="small" />
              </Box>
              <Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 0.5,
                    fontSize: '15px'
                  }}
                >
                  Car Transport
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#666',
                    fontSize: '13px',
                    lineHeight: 1.5
                  }}
                >
                  Safe and reliable transport for sedans, SUVs, and luxury vehicles.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', mb: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                <LocalShippingIcon fontSize="small" />
              </Box>
              <Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 0.5,
                    fontSize: '15px'
                  }}
                >
                  Commercial Vehicle Transport
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#666',
                    fontSize: '13px',
                    lineHeight: 1.5
                  }}
                >
                  Specialized transport for vans, trucks, and commercial vehicles.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                <ShieldIcon fontSize="small" />
              </Box>
              <Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 0.5,
                    fontSize: '15px'
                  }}
                >
                  Insured Transport
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#666',
                    fontSize: '13px',
                    lineHeight: 1.5
                  }}
                >
                  All vehicles are fully insured during transport for your peace of mind.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Why Choose Us */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2.5, 
            mb: 2, 
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '18px',
              mb: 1.5,
              color: '#333'
            }}
          >
            Why Choose Us
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon 
                sx={{ 
                  color: theme.palette.primary.main,
                  mr: 1.5,
                  fontSize: 20
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '14px',
                  color: '#444'
                }}
              >
                Experienced and professional drivers
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon 
                sx={{ 
                  color: theme.palette.primary.main,
                  mr: 1.5,
                  fontSize: 20
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '14px',
                  color: '#444'
                }}
              >
                Competitive pricing with no hidden fees
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon 
                sx={{ 
                  color: theme.palette.primary.main,
                  mr: 1.5,
                  fontSize: 20
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '14px',
                  color: '#444'
                }}
              >
                Real-time tracking and updates
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon 
                sx={{ 
                  color: theme.palette.primary.main,
                  mr: 1.5,
                  fontSize: 20
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '14px',
                  color: '#444'
                }}
              >
                Nationwide coverage
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon 
                sx={{ 
                  color: theme.palette.primary.main,
                  mr: 1.5,
                  fontSize: 20
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '14px',
                  color: '#444'
                }}
              >
                Dedicated customer support
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Legal Links */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2.5, 
            mb: 4, 
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '18px',
              mb: 1.5,
              color: '#333'
            }}
          >
            Legal Information
          </Typography>

          <Link 
            component="button"
            variant="body2"
            onClick={() => handleLinkPress('https://motextransport.com/terms')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#333',
              textDecoration: 'none',
              py: 1.5,
              width: '100%',
              justifyContent: 'flex-start',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <ArticleIcon sx={{ mr: 2, color: '#666' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#333',
                fontWeight: 500
              }}
            >
              Terms of Service
            </Typography>
          </Link>

          <Link 
            component="button"
            variant="body2"
            onClick={() => handleLinkPress('https://motextransport.com/privacy')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#333',
              textDecoration: 'none',
              py: 1.5,
              width: '100%',
              justifyContent: 'flex-start',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <SecurityIcon sx={{ mr: 2, color: '#666' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#333',
                fontWeight: 500
              }}
            >
              Privacy Policy
            </Typography>
          </Link>

          <Link 
            component="button"
            variant="body2"
            onClick={() => handleLinkPress('https://motextransport.com/licenses')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#333',
              textDecoration: 'none',
              py: 1.5,
              width: '100%',
              justifyContent: 'flex-start',
            }}
          >
            <VerifiedUserIcon sx={{ mr: 2, color: '#666' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#333',
                fontWeight: 500
              }}
            >
              Licenses & Insurance
            </Typography>
          </Link>
        </Paper>

        {/* Contact Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<PhoneIcon />}
          onClick={navigateToContact}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: '#ffffff',
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            mb: 2,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          Contact Us
        </Button>

        {/* Version Info */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: '#9e9e9e',
            fontSize: '12px',
            mb: 4,
          }}
        >
          Version 1.0.0
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUs; 