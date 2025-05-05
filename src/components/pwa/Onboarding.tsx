import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Define onboarding slides with content matching the screenshots
  const slides = [
    {
      title: "Equality for All",
      description: "Everyone deserves the same great service",
      image: "/1 motex.png",
      bgColor: "#ffffff", 
      textColor: "#000000"
    },
    {
      title: "Fast Reliable Delivery",
      description: "Your packages delivered on time, every time",
      image: "/2 motex.png",
      bgColor: "#ffffff",
      textColor: "#000000"
    },
    {
      title: "Your Location, Our Destination",
      description: "Track your delivery in real-time with ease",
      image: "/3 motex.png",
      bgColor: "#ffffff",
      textColor: "#000000"
    }
  ];

  const maxSteps = slides.length;

  const handleNext = () => {
    if (activeStep < maxSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      onComplete();
    }
  };

  const handleClose = () => {
    onComplete();
  };

  const handleStepChange = (swiper: any) => {
    setActiveStep(swiper.activeIndex);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: slides[activeStep].bgColor,
        zIndex: 9999,
        transition: 'background-color 0.5s ease',
      }}
    >
      {/* Top navigation - pagination dots */}
      <Box 
        sx={{ 
          position: 'fixed', 
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
        {[0, 1, 2].map((dot) => (
          <Box
            key={`dot-${dot}`}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: dot === activeStep ? '#DE1F27' : 'rgba(0,0,0,0.3)',
            }}
          />
        ))}
      </Box>

      <Swiper
        onSlideChange={handleStepChange}
        pagination={false}
        modules={[Pagination]}
        className="mySwiper"
        style={{ width: '100%', height: '100%' }}
      >
        {slides.map((step, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: 3,
                py: 6,
              }}
            >
              <Box 
                sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '100%', 
                  maxWidth: '400px',
                  mb: 2
                }}
              >
                <img 
                  src={step.image} 
                  alt={step.title} 
                  style={{ 
                    width: '100%', 
                    maxHeight: '60vh',
                    objectFit: 'contain'
                  }} 
                />
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    color: step.textColor,
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: { xs: '1.75rem', sm: '2rem' },
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.7)',
                    fontFamily: '"Poppins", sans-serif',
                    maxWidth: '600px',
                    mx: 'auto',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom controls - Skip button or Let's Start button */}
      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          p: 3, 
          display: 'flex', 
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        {activeStep < maxSteps - 1 ? (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={handleClose}
              variant="text"
              sx={{ 
                color: '#000000',
                fontWeight: 'medium',
                textTransform: 'none',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '1rem'
              }}
            >
              Skip
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              disableElevation
              sx={{ 
                bgcolor: '#DE1F27',
                color: '#ffffff',
                borderRadius: 8,
                px: 4,
                textTransform: 'none',
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 'medium',
                fontSize: '1rem',
                '&:hover': {
                  bgcolor: '#c41920'
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
              bgcolor: '#DE1F27',
              color: '#ffffff',
              borderRadius: 8,
              py: 1.5,
              textTransform: 'none',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 'medium',
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#c41920'
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