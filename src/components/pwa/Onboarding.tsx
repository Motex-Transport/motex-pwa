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
      title: "Book Transport in Seconds",
      description: "From parcels to premium rides — get started effortlessly.",
      icon: <img src="/illustrations/delivery-truck.svg" alt="Delivery Truck" style={{ width: 180, height: 180 }} />,
      bgColor: "#fffff0", // Light yellow
      textColor: "#000000"
    },
    {
      title: "Track Every Booking",
      description: "Stay informed with real-time updates and booking status",
      icon: <img src="/illustrations/location-tracking.svg" alt="Location Tracking" style={{ width: 180, height: 180 }} />,
      bgColor: "#ffebee", // Light pink
      textColor: "#000000"
    },
    {
      title: "We're With You Every Step",
      description: "Transparent communication and real-time booking updates.",
      icon: <img src="/illustrations/delivery-service.svg" alt="Delivery Service" style={{ width: 180, height: 180 }} />,
      bgColor: "#e8f5e9", // Light green
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
      {/* Top navigation - Next button and pagination dots */}
      {activeStep < maxSteps - 1 && (
        <Box 
          sx={{ 
            position: 'fixed', 
            top: 16, 
            right: 16, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            zIndex: 10,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            {[0, 1, 2].map((dot) => (
              <Box
                key={`dot-${dot}`}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: dot === activeStep ? '#000000' : 'rgba(0,0,0,0.3)',
                }}
              />
            ))}
          </Box>
          <Button
            onClick={handleNext}
            variant="contained"
            disableElevation
            sx={{ 
              bgcolor: '#000000',
              color: '#ffffff',
              borderRadius: 10,
              px: 4,
              textTransform: 'none',
              fontWeight: 'medium',
              fontSize: '1rem',
              '&:hover': {
                bgcolor: '#333333'
              }
            }}
          >
            Next
          </Button>
        </Box>
      )}

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
                px: 4,
                pt: { xs: 12, sm: 14 }, // Increased top padding to make room for top nav
                pb: 14, // Bottom padding for controls
              }}
            >
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                {step.icon}
              </Box>
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: step.textColor,
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: { xs: '2rem', sm: '2.5rem' },
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
          justifyContent: activeStep === maxSteps - 1 ? 'center' : 'flex-start',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {activeStep < maxSteps - 1 ? (
          <Button
            onClick={handleClose}
            variant="text"
            sx={{ 
              color: '#000000',
              fontWeight: 'medium',
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Skip
          </Button>
        ) : (
          <Button
            onClick={onComplete}
            variant="contained"
            disableElevation
            fullWidth
            sx={{ 
              bgcolor: '#000000',
              color: '#ffffff',
              borderRadius: 10,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 'medium',
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: '#333333'
              }
            }}
          >
            Let's Start
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Onboarding; 