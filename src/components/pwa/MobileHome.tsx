import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  IconButton,
  Avatar,
  useTheme,
  Skeleton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Import swiper for carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Import PullToRefresh component
import PullToRefresh from './PullToRefresh';

// Import icons
import PersonIcon from '@mui/icons-material/Person';
import CarRentalIcon from '@mui/icons-material/CarRental';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';

// Import TouchableCard component
import TouchableCard from './TouchableCard';

// Dummy user data - would come from auth context in a real app
const userDetails = {
  first_name: 'User',
};

const MobileHome: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsRefreshing(false);
  };

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
      id: 'chauffeur', 
      title: 'Chauffeur Services', 
      icon: <CarRentalIcon fontSize="medium" /> 
    },
    { 
      id: 'door-to-door', 
      title: 'Door to Door', 
      icon: <HomeIcon fontSize="medium" /> 
    },
    { 
      id: 'same-day', 
      title: 'Same Day', 
      icon: <DirectionsCarIcon fontSize="medium" /> 
    },
    { 
      id: 'interstate', 
      title: 'Interstate', 
      icon: <LocalShippingIcon fontSize="medium" /> 
    },
  ];

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      text: 'Fantastic service! My delivery arrived on time and the driver was very professional.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      text: 'I use Motex Transport regularly for my business deliveries. Always reliable.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Michael Brown',
      text: 'Great communication throughout the entire process. Will use again!',
      rating: 4,
    },
  ];

  // Navigation handlers
  const navigateToQuoteRequest = () => {
    navigate('/instant-quote');
  };
  
  const navigateToRequests = () => {
    navigate('/my-requests');
  };
  
  const navigateToContact = () => {
    navigate('/contact-us');
  };
  
  const navigateToAbout = () => {
    navigate('/about-us');
  };
  
  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToService = (serviceId: string) => {
    navigate(`/instant-quote?service=${serviceId}`);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        pb: 7,
        backgroundColor: '#f8f8f8'
      }}>
        {/* Header */}
        <Paper 
          elevation={0} 
          sx={{ 
            px: 2.5, 
            py: 2, 
            borderRadius: 0, 
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '14px'
              }}
            >
              Welcome back
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#ffffff',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                fontSize: '18px'
              }}
            >
              {userDetails.first_name}
            </Typography>
          </Box>
          <IconButton 
            onClick={navigateToProfile}
            sx={{ color: '#ffffff' }}
          >
            <PersonIcon />
          </IconButton>
        </Paper>

        {/* Hero Banner Carousel */}
        <Box sx={{ width: '100%', height: 220 }}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              renderBullet: function (index: number, className: string) {
                return `<span class="${className}" style="background-color: ${theme.palette.primary.main}"></span>`;
              },
            }}
            modules={[Autoplay, Pagination]}
          >
            <SwiperSlide>
              <Box
                sx={{
                  height: 220,
                  width: '100%',
                  backgroundImage: 'url(/assets/banner1.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  padding: 3,
                }}
              >
                <Box sx={{ maxWidth: '70%' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
                      mb: 1,
                    }}
                  >
                    SYDNEY'S PREMIER COURIER SERVICE
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
                sx={{
                  height: 220,
                  width: '100%',
                  backgroundImage: 'url(/assets/banner2.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  padding: 3,
                }}
              >
                <Box sx={{ maxWidth: '70%' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
                      mb: 1,
                    }}
                  >
                    Fast, reliable, and personalized courier solutions
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>

        {/* Quick Actions */}
        <Box 
          sx={{ 
            mt: -3, 
            mx: 2, 
            mb: 3, 
            borderRadius: 4, 
            bgcolor: '#000000',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            p: 1,
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}>
            <Box 
              onClick={navigateToQuoteRequest} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                p: 1,
                width: '33%',
                cursor: 'pointer'
              }}
            >
              <Box sx={{ 
                p: 1, 
                borderRadius: '50%', 
                bgcolor: theme.palette.primary.main, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 0.5
              }}>
                <ReceiptIcon sx={{ color: '#ffffff', fontSize: 20 }} />
              </Box>
              <Typography sx={{ 
                color: '#ffffff', 
                fontSize: '12px',
                textAlign: 'center'
              }}>
                Request Quote
              </Typography>
            </Box>

            <Box 
              onClick={navigateToRequests} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                p: 1,
                width: '33%',
                cursor: 'pointer'
              }}
            >
              <Box sx={{ 
                p: 1, 
                borderRadius: '50%', 
                bgcolor: '#FF2992', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 0.5
              }}>
                <HistoryIcon sx={{ color: '#ffffff', fontSize: 20 }} />
              </Box>
              <Typography sx={{ 
                color: '#ffffff', 
                fontSize: '12px',
                textAlign: 'center'
              }}>
                My Requests
              </Typography>
            </Box>

            <Box 
              onClick={navigateToContact} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                p: 1,
                width: '33%',
                cursor: 'pointer'
              }}
            >
              <Box sx={{ 
                p: 1, 
                borderRadius: '50%', 
                bgcolor: '#3B82F6', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 0.5
              }}>
                <HeadsetMicIcon sx={{ color: '#ffffff', fontSize: 20 }} />
              </Box>
              <Typography sx={{ 
                color: '#ffffff', 
                fontSize: '12px',
                textAlign: 'center'
              }}>
                Contact Us
              </Typography>
            </Box>

            <Box 
              onClick={navigateToAbout} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                p: 1,
                width: '33%',
                cursor: 'pointer'
              }}
            >
              <Box sx={{ 
                p: 1, 
                borderRadius: '50%', 
                bgcolor: '#10B981', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 0.5
              }}>
                <BusinessIcon sx={{ color: '#ffffff', fontSize: 20 }} />
              </Box>
              <Typography sx={{ 
                color: '#ffffff', 
                fontSize: '12px',
                textAlign: 'center'
              }}>
                About Us
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Services Section */}
        <Box sx={{ px: 2, mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2 
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                fontSize: '18px',
                color: '#333'
              }}
            >
              Our Services
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 500,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              See All
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1.5
          }}>
            {services.map((service) => (
              <TouchableCard
                key={service.id}
                onClick={() => navigateToService(service.id)}
                sx={{
                  p: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 2,
                  cursor: 'pointer',
                  border: '1px solid #f0f0f0',
                }}
              >
                <Box sx={{ 
                  p: 1, 
                  bgcolor: '#f5f5f5', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1
                }}>
                  {service.icon}
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontSize: '12px',
                    fontWeight: 500,
                    textAlign: 'center',
                    color: '#333'
                  }}
                >
                  {service.title}
                </Typography>
              </TouchableCard>
            ))}
          </Box>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ px: 2, mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '18px',
              color: '#333',
              mb: 2
            }}
          >
            Client Testimonials
          </Typography>

          <Swiper
            spaceBetween={16}
            slidesPerView={1.2}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            style={{ width: '100%', paddingBottom: '20px' }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TouchableCard
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid #f0f0f0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 1.5 
                  }}>
                    <Avatar sx={{ mr: 1.5, bgcolor: theme.palette.primary.main }}>
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ fontWeight: 600 }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Box sx={{ display: 'flex' }}>
                        {[...Array(5)].map((_, i) => (
                          <Box 
                            key={i} 
                            component="span" 
                            sx={{ 
                              color: i < testimonial.rating ? '#FFD700' : '#e0e0e0',
                              fontSize: '14px',
                              mr: 0.2
                            }}
                          >
                            ★
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      fontSize: '14px',
                      lineHeight: 1.5
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                </TouchableCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Recent Activity - Empty State */}
        <Box sx={{ px: 2, mb: 6 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '18px',
              color: '#333',
              mb: 2
            }}
          >
            Recent Activity
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid #f0f0f0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <HistoryIcon 
              sx={{ 
                fontSize: 40, 
                color: '#bdbdbd',
                mb: 1
              }} 
            />
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600,
                color: '#757575',
                mb: 0.5
              }}
            >
              No recent activity
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#9e9e9e',
                fontSize: '14px',
                maxWidth: '250px',
                mx: 'auto'
              }}
            >
              Your recent quote requests will appear here
            </Typography>
          </Paper>
        </Box>

        {/* Get Quote Button */}
        <Box 
          sx={{ 
            position: 'fixed', 
            bottom: 20, 
            left: 0, 
            right: 0, 
            display: 'flex', 
            justifyContent: 'center', 
            px: 2 
          }}
        >
          <Button
            variant="contained"
            disableElevation
            fullWidth
            onClick={navigateToQuoteRequest}
            sx={{
              borderRadius: 12,
              py: 1.5,
              bgcolor: theme.palette.primary.main,
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(222, 31, 39, 0.3)',
              maxWidth: '400px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              }
            }}
          >
            Get An Instant Quote
          </Button>
        </Box>
      </Box>
    </PullToRefresh>
  );
};

export default MobileHome; 