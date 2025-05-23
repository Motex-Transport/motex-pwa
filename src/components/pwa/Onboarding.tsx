import React, { useState, useRef } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  
  // Define onboarding slides with content and existing images from the public folder
  const slides = [
    {
      title: "Book Transport in Seconds",
      description: "From parcels to premium rides — get started effortlessly.",
      image: "/illustrations/delivery-truck.svg",
      bgColor: "#FFFCDF", // Light yellow
    },
    {
      title: "Track Every Booking",
      description: "Stay informed with real-time updates and booking status",
      image: "/illustrations/location-tracking.svg",
      bgColor: "#FFDCE5", // Light pink
    },
    {
      title: "We're With You Every Step",
      description: "Transparent communication and real-time booking updates.",
      image: "/illustrations/delivery-service.svg",
      bgColor: "#DFFCEA", // Light green
    },
  ];

  const maxSteps = slides.length;

  const handleNext = () => {
    if (currentIndex < maxSteps - 1) {
      swiperRef.current.slideNext();
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden', // Prevent scrolling
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          left: 0,
          right: 0,
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          zIndex: 10,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={`dot-${index}`}
            sx={{
              width: index === currentIndex ? 20 : 10,
              height: 10,
              borderRadius: 5,
              transition: 'width 0.3s ease',
              backgroundColor: index === currentIndex ? theme.palette.primary.main : '#D9D9D9',
            }}
          />
        ))}
      </Box>

      <Box sx={{ flex: 1, width: '100%', overflow: 'hidden' }}>
        <Swiper
          onSlideChange={handleSlideChange}
          onSwiper={(swiper: any) => {
            swiperRef.current = swiper;
          }}
          pagination={false}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          style={{ width: '100%', height: '100%' }}
        >
          {slides.map((step, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  px: 3,
                  pt: 6,
                  pb: 12,
                  backgroundColor: step.bgColor,
                }}
              >
                <Box 
                  sx={{ 
                    flex: 1,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '100%', 
                    maxHeight: '50%',
                    mt: 4,
                  }}
                >
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    style={{ 
                      width: '180px', 
                      height: '180px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))'
                    }} 
                  />
                </Box>
                <Box sx={{ width: '100%', maxWidth: '450px', mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: '#000000',
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: { xs: '24px', sm: '28px' },
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666666',
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: { xs: '16px', sm: '18px' },
                      lineHeight: 1.5,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          p: 3, 
          display: 'flex', 
          justifyContent: 'center',
          zIndex: 10,
          backgroundColor: 'transparent'
        }}
      >
        {currentIndex < maxSteps - 1 ? (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={handleSkip}
              variant="outlined"
              sx={{ 
                color: '#333333',
                borderColor: '#E5E5E5',
                backgroundColor: '#F8F8F8',
                borderRadius: 2,
                py: 1.6,
                px: 4,
                textTransform: 'none',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                fontSize: '16px'
              }}
            >
              Skip
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              disableElevation
              sx={{ 
                bgcolor: theme.palette.primary.main,
                color: '#ffffff',
                borderRadius: 2,
                py: 1.6,
                px: 4,
                textTransform: 'none',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark
                }
              }}
            >
              Next
            </Button>
          </Box>
        ) : (
          <Button
            onClick={onComplete}
            variant="contained"
            disableElevation
            fullWidth
            sx={{ 
              bgcolor: theme.palette.primary.main,
              color: '#ffffff',
              borderRadius: 2,
              py: 1.6,
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: theme.palette.primary.dark
              }
            }}
          >
            Get Started
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Onboarding; 