import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

const MobileHome: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // Handle pull-to-refresh
  const handleRefresh = async (): Promise<void> => {
    try {
      // Simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Refresh completed');
    } catch (error) {
      console.error('Refresh failed:', error);
    }
  };

  // Service data
  const services = [
    { 
      id: 'parcel-delivery', 
      title: 'Parcel Delivery', 
      icon: <LocalShippingIcon fontSize="medium" />,
      image: '/parcel-1.jpg'
    },
    { 
      id: 'fragile-freight', 
      title: 'Fragile Freight', 
      icon: <InventoryIcon fontSize="medium" />,
      image: '/gallery 7.jpeg'
    },
    { 
      id: 'chauffeur', 
      title: 'Chauffeur Services', 
      icon: <CarRentalIcon fontSize="medium" />,
      image: '/chauffeur-1.jpg'
    },
    { 
      id: 'door-to-door', 
      title: 'Door to Door', 
      icon: <HomeIcon fontSize="medium" />,
      image: '/gallery 1.jpg'
    },
    { 
      id: 'same-day', 
      title: 'Same Day', 
      icon: <DirectionsCarIcon fontSize="medium" />,
      image: '/gallery 3.jpg'
    },
    { 
      id: 'interstate', 
      title: 'Interstate', 
      icon: <LocalShippingIcon fontSize="medium" />,
      image: '/interstate-1.jpg'
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
        {/* Header with logo */}
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo.svg" 
              alt="Motex Transport" 
              style={{ height: '28px', marginRight: '8px' }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#ffffff',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                fontSize: '18px'
              }}
            >
              MOTEX
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
        <Box sx={{ width: '100%', height: 200 }}>
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
                  height: 200,
                  width: '100%',
                  backgroundImage: 'url(/MotexFeb3.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  padding: 3,
                }}
              >
                <Box sx={{ 
                  maxWidth: '70%', 
                  backgroundColor: 'rgba(0,0,0,0.7)', 
                  p: 1.5, 
                  borderRadius: 1 
                }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      mb: 0.5,
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
                  height: 200,
                  width: '100%',
                  backgroundImage: 'url(/mercedes-vans-cover.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  padding: 3,
                }}
              >
                <Box sx={{ 
                  maxWidth: '70%', 
                  backgroundColor: 'rgba(0,0,0,0.7)', 
                  p: 1.5, 
                  borderRadius: 1 
                }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      mb: 0.5,
                    }}
                  >
                    QUICK & RELIABLE DELIVERIES
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '18px',
              mb: 2,
            }}
          >
            What can we help you with today?
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TouchableCard
              onClick={navigateToQuoteRequest}
              sx={{
                backgroundColor: theme.palette.primary.main,
                p: 2.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2.5,
                  }}
                >
                  <ReceiptIcon sx={{ color: '#ffffff', fontSize: 26 }} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '16px',
                    }}
                  >
                    Get Instant Quote
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 400,
                      fontSize: '13px',
                    }}
                  >
                    Quick price estimate for your delivery
                  </Typography>
                </Box>
              </Box>
            </TouchableCard>

            <TouchableCard
              onClick={navigateToRequests}
              sx={{
                backgroundColor: '#f5f5f5',
                p: 2.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#e0e0e0',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2.5,
                  }}
                >
                  <HistoryIcon sx={{ color: '#555555', fontSize: 26 }} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#333333',
                      fontWeight: 600,
                      fontSize: '16px',
                    }}
                  >
                    My Requests
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666666',
                      fontWeight: 400,
                      fontSize: '13px',
                    }}
                  >
                    View and track your deliveries
                  </Typography>
                </Box>
              </Box>
            </TouchableCard>
          </Box>
        </Box>

        {/* Our Services */}
        <Box sx={{ px: 2.5, py: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '18px',
              mb: 2,
            }}
          >
            Our Services
          </Typography>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 2 
          }}>
            {services.map((service) => (
              <TouchableCard
                key={service.id}
                onClick={() => navigateToService(service.id)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  pb: 1.5,
                  pt: 0,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 100,
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 1.5,
                    borderTopLeftRadius: 'inherit',
                    borderTopRightRadius: 'inherit',
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1.5 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      color: '#ffffff',
                      mr: 1,
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 500,
                      fontSize: '14px',
                      textAlign: 'left',
                    }}
                  >
                    {service.title}
                  </Typography>
                </Box>
              </TouchableCard>
            ))}
          </Box>
        </Box>

        {/* Testimonials */}
        <Box sx={{ py: 3, px: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '18px',
              mb: 2,
              px: 2.5,
            }}
          >
            Customer Reviews
          </Typography>

          <Swiper
            spaceBetween={16}
            slidesPerView={'auto'}
            freeMode={true}
            style={{ padding: '0 20px 20px 20px' }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} style={{ width: '85%', maxWidth: '350px' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      mb: 1.5,
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Box
                        key={i}
                        component="span"
                        sx={{
                          color: i < testimonial.rating ? '#FFB400' : '#e0e0e0',
                          mr: 0.5,
                          fontSize: '18px',
                        }}
                      >
                        ★
                      </Box>
                    ))}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      mb: 2,
                      color: '#333333',
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      fontSize: '14px',
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Contact Support */}
        <Box sx={{ px: 2.5, pb: 3 }}>
          <TouchableCard
            onClick={navigateToContact}
            sx={{
              p: 2.5,
              bgcolor: '#f5f5f5',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2.5,
                }}
              >
                <HeadsetMicIcon sx={{ color: '#ffffff', fontSize: 26 }} />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: '#333333',
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  Need Help?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666666',
                    fontWeight: 400,
                    fontSize: '13px',
                  }}
                >
                  Contact our customer support
                </Typography>
              </Box>
            </Box>
          </TouchableCard>
        </Box>

        {/* About Us */}
        <Box sx={{ px: 2.5, pb: 3 }}>
          <TouchableCard
            onClick={navigateToAbout}
            sx={{
              p: 2.5,
              bgcolor: '#f5f5f5',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#455a64',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2.5,
                }}
              >
                <BusinessIcon sx={{ color: '#ffffff', fontSize: 26 }} />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: '#333333',
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  About Motex Transport
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666666',
                    fontWeight: 400,
                    fontSize: '13px',
                  }}
                >
                  Learn more about our company
                </Typography>
              </Box>
            </Box>
          </TouchableCard>
        </Box>
      </Box>
    </PullToRefresh>
  );
};

export default MobileHome; 