// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useRef, useCallback } from 'react';
import SplashScreen from '../components/SplashScreen';
import GlobalStyles from '@mui/material/GlobalStyles';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  AppBar, 
  Toolbar,
  Stack,
  Link,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  LocalShipping as LocalShippingIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  ArrowForward as ArrowForwardIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Menu as MenuIcon,
  Speed as SpeedIcon,
  Public as PublicIcon,
  Inventory as InventoryIcon,
  Apartment as ApartmentIcon,
  EventAvailable as EventAvailableIcon,
  Business as BusinessIcon,
  Close as CloseIcon
} from '@mui/icons-material';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import InstallPwaButton from '../components/pwa/InstallPwaButton';

// Import fonts
// Oswald font is loaded via Google Fonts in embedded code
// Poppins and Bebas Neue fonts are loaded via Google Fonts in embedded code

// Define color constants at the top of the file
const RED_COLOR = '#DE1F27';
const PINK_RED = '#FF2992'; 
const CARD_BG_COLOR = "rgba(0, 0, 0, 0.8)";

const GradientBackground = styled(Box)(({ theme }) => ({
  background: '#000000',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden'
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.4)',
    '& .service-title': {
      color: RED_COLOR,
    }
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '12px',
  }
}));

const CircleBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  opacity: 0.3, // Increased opacity from 0.15 to 0.3
  background: 'radial-gradient(circle, rgba(222, 31, 39, 0.8) 0%, rgba(0,0,0,0) 70%)', // Increased color intensity
  zIndex: 0,
  filter: 'blur(20px)', // Added blur effect to make it more visible
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  background: '#000000',
  padding: theme.spacing(4, 0),
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  }
}));

// Add this new styled component for the testimonials section
const TestimonialSection = styled(Box)(({ theme }) => ({
  background: '#000000',
  padding: theme.spacing(8, 0),
  color: 'white',
}));

const TestimonialCard = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

// Add this new styled component for the decorative line
const DecorativeLine = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '2px',
  width: '100%',
  background: '#000000',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
  }
}));

// Add TextFade component
const TextFade = ({
  direction = 'down',
  children,
  staggerChildren = 0.1,
}: {
  direction?: 'up' | 'down';
  children: React.ReactNode;
  staggerChildren?: number;
}) => {
  const FADE_ANIMATION = {
    show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.3 } },
    hidden: { opacity: 0, y: direction === 'down' ? -18 : 18 },
  };
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      style={{ width: '100%', textAlign: 'center' }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_ANIMATION}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
};

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  touchAction: 'pan-y',
}));

const CarouselTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  width: '100%',
}));

// Add mouse follower gradient effect from ServicesPage.tsx
const GradientLight = styled('div')({
  position: 'absolute',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${RED_COLOR}30 0%, ${PINK_RED}15 40%, transparent 70%)`,
  filter: 'blur(60px)',
  opacity: 0.8,
  pointerEvents: 'none',
  transition: 'transform 0.15s ease-out, width 0.2s ease, height 0.2s ease',
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
});

// Add this new type definition after the existing types
type ServiceItem = {
  id: string;
  icon: React.ReactNode;
  title: string;
};

// Add this new component before the LandingPage component
const MobileServiceCarousel = ({ onServiceClick }: { onServiceClick: (serviceTitle: string) => void }) => {
  const [activeSet, setActiveSet] = useState(0);
  
  const services: ServiceItem[][] = [
    [
      { id: 'parcel', icon: <LocalShippingIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Parcel Delivery' },
      { id: 'transport', icon: <BusinessIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Fragile Freight' },
      { id: 'packers', icon: <InventoryIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Interstate Delivery' },
    ],
    [
      { id: 'courier', icon: <PublicIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Door to Door Service' },
      { id: 'sameday', icon: <SpeedIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Same Day Delivery' },
      { id: 'chauffeur', icon: <ApartmentIcon sx={{ color: RED_COLOR, fontSize: 24 }} />, title: 'Chauffeur' },
    ],
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSet((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSet}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <Grid container spacing={2} justifyContent="center" sx={{ py: 1 }}>
          {services[activeSet].map((service, index) => (
            <Grid 
              key={service.id} 
              item 
              xs={4}
              sx={{ 
                textAlign: 'center',
                p: 0.5
              }}
            >
              <Box
                onClick={() => onServiceClick(service.title)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 1.5,
                  px: 0.5,
                  width: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    '& .service-icon-bg': {
                      bgcolor: 'rgba(222, 31, 39, 0.15)',
                    },
                    '& .service-text': {
                      color: RED_COLOR,
                    }
                  }
                }}
              >
                <Box
                  className="service-icon-bg"
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: 'rgba(222, 31, 39, 0.08)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 1,
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  {service.icon}
                </Box>
                <Typography
                  className="service-text"
                  align="center"
                  sx={{
                    color: 'white',
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    width: '100%',
                    transition: 'color 0.3s ease',
                    mt: 0.5
                  }}
                >
                  {service.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        {/* Dots indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          {[0, 1].map((dot) => (
            <Box
              key={`dot-${dot}`}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                mx: 0.5,
                cursor: 'pointer',
                backgroundColor: dot === activeSet ? RED_COLOR : 'rgba(255,255,255,0.3)',
                transition: 'background-color 0.3s',
              }}
              onClick={() => setActiveSet(dot)}
            />
          ))}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

const LandingPage = () => {
  const handleServiceClick = (serviceTitle: string) => {
    // Navigate to the instant quote page with the selected service
    navigate('/instant-quote', { state: { selectedService: serviceTitle } });
    window.scrollTo(0, 0);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Add mouse position state for gradient light effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const movingTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Group services into slides of 3
  const slidesCount = 3; // Now 3 slides
  
  // Define the service card type
  type ServiceCard = {
    id: string;
    title: string;
    description: string;
    image: string;
  };

  // Define the slide type
  type Slide = {
    id: string;
    services: ServiceCard[];
  };
  
  // Service cards data
  const serviceCards: ServiceCard[] = [
    {
      id: 'parcel-delivery',
      title: "Parcel Delivery",
      description: "Fast and secure parcel delivery solutions for businesses and individuals. We ensure your packages arrive safely and on schedule.",
      image: "/services-15.jpg",
    },
    {
      id: 'fragile-freight',
      title: "Fragile Freight",
      description: "Specialized handling for delicate and valuable items. Our experts use proper techniques and materials to protect your fragile shipments.",
      image: "/gallery 6.jpeg",
    },
    {
      id: 'chauffeur-services',
      title: "Chauffeur Services",
      description: "Professional chauffeur services with experienced drivers. We provide reliable transportation for executives, special events, and VIP clients.",
      image: "/chauffeur-2.jpg",
    },
    {
      id: 'door-to-door',
      title: "Door to Door Service",
      description: "Convenient pickup and delivery directly from your location to the destination. Let us handle the logistics while you focus on your business.",
      image: "/gallery 2.jpg",
    },
    {
      id: 'same-day-delivery',
      title: "Same Day Delivery",
      description: "Urgent deliveries handled with speed and reliability. Our same-day service ensures your time-sensitive packages reach their destination promptly.",
      image: "/gallery 3.jpg",
    },
    {
      id: 'interstate-delivery',
      title: "Interstate Delivery",
      image: "/upscalemedia-transformed.jpeg",
      description: "Seamless interstate logistics solutions connecting businesses across Australia. Our fleet ensures safe and timely delivery across state lines.",
    }
  ];
  
  // Create slides array - split services into groups of 2
  const slides: Slide[] = [
    {
      id: 'first-slide',
      services: serviceCards.slice(0, 2)
    },
    {
      id: 'second-slide',
      services: serviceCards.slice(2, 4)
    },
    {
      id: 'third-slide',
      services: serviceCards.slice(4, 6)
    }
  ];
  
  // Create desktop slides array - split services into groups of 3
  const desktopSlides: Slide[] = [
    {
      id: 'desktop-first-slide',
      services: serviceCards.slice(0, 3)
    },
    {
      id: 'desktop-second-slide',
      services: serviceCards.slice(3, 6)
    }
  ];
  
  const maxActiveSlide = slidesCount - 1;
  const desktopSlidesCount = desktopSlides.length;
  
  const handleNextSlide = useCallback(() => {
    if (isMobile) {
      setActiveSlide(prev => (prev === maxActiveSlide ? 0 : prev + 1));
    } else {
      setActiveSlide(prev => (prev === desktopSlidesCount - 1 ? 0 : prev + 1));
    }
  }, [maxActiveSlide, desktopSlidesCount, isMobile]);
  
  // Setup auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [handleNextSlide]); // Include handleNextSlide since it's used in the effect

  // Handle swipe/trackpad gestures
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
      e.preventDefault();
    }
    setCurrentTranslate(activeSlide * -100);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    let currentX: number;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }
    
    const diff = (currentX - startX) / (carouselRef.current?.clientWidth || 1) * 100;
    const newTranslate = currentTranslate + diff;
    
    // Apply boundaries - don't allow dragging beyond first or last slide
    if (newTranslate > 0) {
      return;
    }
    
    if (newTranslate < -maxActiveSlide * 100) {
      return;
    }
    
    carouselRef.current?.style.setProperty('transform', `translateX(${newTranslate}%)`);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(false);
    
    // Calculate the final position to snap to
    const carouselWidth = carouselRef.current?.offsetWidth || 0;
    const pxPerSlide = carouselWidth;
    const dragged = currentTranslate - (-activeSlide * pxPerSlide);
    const threshold = pxPerSlide * 0.2;
    
    if (dragged > threshold) {
      // Dragged right enough to go to previous slide
      setActiveSlide(Math.max(0, activeSlide - 1));
    } else if (dragged < -threshold) {
      // Dragged left enough to go to next slide
      setActiveSlide(Math.min(slidesCount - 1, activeSlide + 1));
    } else {
      // Not dragged enough, snap back
      setActiveSlide(activeSlide);
    }
  };

  // Reset transition on slide change
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transition = isDragging ? 'none' : 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(-${activeSlide * 100}%)`;
    }
  }, [activeSlide, isDragging]);

  const [showSplash, setShowSplash] = useState(() => {
    // Check if this is the first visit in the current session
    return !sessionStorage.getItem('hasVisited');
  });

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Mark that the user has visited in this session
    sessionStorage.setItem('hasVisited', 'true');
  };

  // Function to handle navigation with scroll to top
  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Add useEffect for mouse tracking only on desktop devices
  useEffect(() => {
    // Skip mouse tracking on mobile to improve performance
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Update gradient position
      if (gradientRef.current) {
        gradientRef.current.style.left = `${e.clientX}px`;
        gradientRef.current.style.top = `${e.clientY}px`;
      }
      
      // Use requestAnimationFrame to optimize performance
      requestAnimationFrame(() => {
        setMousePos({ 
          x: e.clientX, 
          y: e.clientY 
        });
        
        setIsMoving(true);
        
        if (movingTimeout.current) {
          clearTimeout(movingTimeout.current);
        }
        
        movingTimeout.current = setTimeout(() => {
          setIsMoving(false);
        }, 150);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (movingTimeout.current) {
        clearTimeout(movingTimeout.current);
      }
    };
  }, [isMobile]);

  // Handle next offer slide as a no-op since we've removed activeOfferSlide
  const handleNextOfferSlide = useCallback(() => {
    // This is kept as an empty function since it's referenced elsewhere
    // but all related functionality is being removed
  }, []);

  // Setup auto-scroll effect for offer carousel with mobile optimization
  useEffect(() => {
    // Skip automatic animation on mobile to improve performance
    if (isMobile) return;
    
    const interval = setInterval(() => {
      handleNextOfferSlide();
    }, 6000); // Change slide every 6 seconds
    
    return () => clearInterval(interval);
  }, [handleNextOfferSlide, isMobile]);
  
  // In the LandingPage component, add a new state variable
  const [activeTestimonialSlide, setActiveTestimonialSlide] = useState(0);
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);

  // Add a new function for handling testimonial slide changes
  const handleNextTestimonialSlide = useCallback(() => {
    setActiveTestimonialSlide((prev: number) => (prev === 2 ? 0 : prev + 1));
  }, []);

  // Set up auto-scroll for testimonials with mobile optimization
  useEffect(() => {
    // Use longer intervals on mobile to reduce CPU usage
    const intervalTime = isMobile ? 12000 : 8000;
    
    const interval = setInterval(() => {
      handleNextTestimonialSlide();
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [handleNextTestimonialSlide, isMobile]);

  // Add gradientRef definition
  const gradientRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <GradientBackground>
      {/* Add GlobalStyles for animations */}
      <GlobalStyles
        styles={{
          '@keyframes slideLogos': {
            '0%': {
              transform: 'translateX(0)',
            },
            '100%': {
              transform: 'translateX(-50%)',
            },
          },
          '@keyframes moveLeft': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-150px)' },
          },
          '@keyframes moveRight': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(150px)' },
          },
          '@keyframes pulse': {
            '0%': { opacity: 0.15, transform: 'translate(-50%, -50%) scale(1)' },
            '50%': { opacity: 0.25, transform: 'translate(-50%, -50%) scale(1.3)' },
            '100%': { opacity: 0.15, transform: 'translate(-50%, -50%) scale(1)' },
          },
          '@keyframes buttonShine': {
            '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(45deg)' },
            '20%, 100%': { transform: 'translateX(100%) translateY(100%) rotate(45deg)' },
          },
          '@keyframes shine': {
            '0%': { left: '-100%' },
            '20%, 100%': { left: '100%' }
          },
          '@keyframes ripple': {
            '0%': { transform: 'scale(0.8)', opacity: 0.3 },
            '50%': { transform: 'scale(1)', opacity: 0.5 },
            '100%': { transform: 'scale(0.8)', opacity: 0.3 },
          },
        }}
      />
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ py: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1100 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo on the left */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
            <Box 
              component="button"
              onClick={() => handleNavigation('/')}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer' 
              }}
            >
              <Box 
                component="img" 
                src="/MOTEX+Logo.png" 
                alt="MOTEX Logo" 
                sx={{ height: 28 }} 
              />
            </Box>
          </Box>
          
          {/* Desktop menu in the center */}
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '60%' }}>
              <Stack 
                direction="row" 
                spacing={3} 
                sx={{ 
                  color: 'white', 
                  fontFamily: '"Poppins", sans-serif', 
                  fontWeight: 400,
                  justifyContent: 'center',
                  fontSize: '16px',
                  lineHeight: '29px',
                }}
              >
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/')} 
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    color: RED_COLOR, 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Home
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/services')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Services
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/about-us')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  About Us
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/instant-quote')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Instant Quote
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/gallery')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Gallery
                </Link>
                <Link 
                  component="button" 
                  onClick={() => handleNavigation('/contact-us')}
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    '&:hover': { color: RED_COLOR },
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '16px',
                    lineHeight: '29px',
                    fontWeight: 400
                  }}
                >
                  Contact
                </Link>
              </Stack>
            </Box>
          )}
          
          {/* Get A Quote button on the right */}
          <Box sx={{ display: 'flex', width: '20%', justifyContent: 'flex-end' }}>
            {!isMobile && (
              <Button 
                component="button" 
                onClick={() => handleNavigation('/instant-quote')} 
                variant="contained" 
                sx={{ 
                  bgcolor: RED_COLOR, 
                  color: 'white',
                  textTransform: 'none',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 400,
                  fontSize: '15px',
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  minWidth: '130px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    bgcolor: '#c41922',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                  }
                }}
              >
                Get&nbsp;a&nbsp;Quote
              </Button>
            )}
            
            {/* Mobile menu icon */}
            {isMobile && (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsMobileMenuOpen(true)}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Toolbar spacer to prevent content from being hidden under fixed AppBar */}
      <Box sx={{ height: '64px' }} />
      
      {/* Update the Hero section to fix mobile text cropping */}
      <Box 
        sx={{
          backgroundImage: 'url(/bg-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 8, md: 12 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: 1,
          },
        }}
      >
        <GradientLight ref={gradientRef} sx={{ zIndex: 1 }} />

        <Container sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <img 
              src="/MOTEX+Logo.png" 
              alt="Motex Transport Logo" 
              style={{ 
                maxWidth: '280px', 
                width: '100%',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
              }} 
            />
          </Box>

          <Typography 
            variant="h1" 
            sx={{ 
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: '0 4px 8px rgba(0,0,0,0.8)',
              background: 'linear-gradient(90deg, #FFFFFF, #F5F5F5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: '#FFFFFF',
            }}
          >
            Sydney's Premier<br />Courier Service
          </Typography>

          <Typography 
            variant="h6" 
            sx={{ 
              color: '#f5f5f5',
              mb: 3,
              fontWeight: 300,
              maxWidth: '600px', 
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.15rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Fast, reliable, and personalized courier solutions for businesses and individuals across the Sydney Metropolitan area.
          </Typography>

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: 2, 
              justifyContent: 'center',
              mt: 4
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate('/instant-quote')}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, #DE1F27 30%, #FF8E53 90%)',
                border: 0,
                borderRadius: 50,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, #D31920 30%, #FF7E43 90%)',
                }
              }}
            >
              Get An Instant Quote
            </Button>
            
            <InstallPwaButton buttonText="Install Mobile App" />
          </Box>
        </Container>
      </Box>

      {/* Service Categories Section */}
      <Box sx={{ position: 'relative', mt: { xs: -6.5, sm: -8 }, mb: 6, zIndex: 10 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box 
            sx={{ 
              width: { xs: '95%', sm: '100%' },
              maxWidth: { xs: '1100px', sm: '1200px' },
              mx: 'auto',
              bgcolor: '#0A0A0A',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              py: { xs: 1.5, sm: 1.5 },
              px: { xs: 1.5, md: 4 },
              border: '1px solid rgba(222, 31, 39, 0.15)'
            }}
          >
            {/* Mobile view with rotating services - more compact */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <MobileServiceCarousel onServiceClick={handleServiceClick} />
            </Box>

            {/* Desktop view with all services */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Grid container spacing={0}>
                {/* Parcel Delivery */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    onClick={() => handleServiceClick("Parcel Delivery")}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                      px: 1.5,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        '& .service-title': {
                          color: RED_COLOR,
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <LocalShippingIcon sx={{ color: RED_COLOR, fontSize: 28 }} />
                    </Box>
                    <Typography
                      className="service-title"
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      Parcel Delivery
                    </Typography>
                  </Box>
                </Grid>

                {/* Transport */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    onClick={() => handleServiceClick("Fragile Freight")}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                      px: 1.5,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        '& .service-title': {
                          color: RED_COLOR,
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <BusinessIcon sx={{ color: RED_COLOR, fontSize: 28 }} />
                    </Box>
                    <Typography
                      className="service-title"
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      Fragile Freight
                    </Typography>
                  </Box>
                </Grid>

                {/* Packers & Movers */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    onClick={() => handleServiceClick("Interstate Delivery")}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                      px: 1.5,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        '& .service-title': {
                          color: RED_COLOR,
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <InventoryIcon sx={{ color: RED_COLOR, fontSize: 28 }} />
                    </Box>
                    <Typography
                      className="service-title"
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      Interstate Delivery
                    </Typography>
                  </Box>
                </Grid>

                {/* Courier */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    onClick={() => handleServiceClick("Door to Door Service")}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                      px: 1.5,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        '& .service-title': {
                          color: RED_COLOR,
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <PublicIcon sx={{ color: RED_COLOR, fontSize: 28 }} />
                    </Box>
                    <Typography
                      className="service-title"
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      Door to Door Service
                    </Typography>
                  </Box>
                </Grid>

                {/* Same Day */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    onClick={() => handleServiceClick("Same Day Delivery")}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                      px: 1.5,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        '& .service-title': {
                          color: RED_COLOR,
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <SpeedIcon sx={{ color: RED_COLOR, fontSize: 28 }} />
                    </Box>
                    <Typography
                      className="service-title"
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      Same Day Delivery
                    </Typography>
                  </Box>
                </Grid>

                {/* Chauffeur */}
                <Grid item sm sx={{ borderRight: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Box
                    onClick={() => handleServiceClick("Chauffeur")}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 1.5,
                      px: 1.5,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        '& .service-title': {
                          color: RED_COLOR,
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        bgcolor: 'rgba(222, 31, 39, 0.08)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <ApartmentIcon sx={{ color: RED_COLOR, fontSize: 28 }} />
                    </Box>
                    <Typography
                      className="service-title"
                      align="center"
                      sx={{
                        color: 'white',
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      Chauffeur
                    </Typography>
                  </Box>
                </Grid>

                {/* Get a Quote button */}
                <Grid 
                  item 
                  sm="auto"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 4
                  }}
                >
                  <Button
                    onClick={() => handleNavigation('/instant-quote')}
                    sx={{ 
                      backgroundColor: RED_COLOR, 
                      color: 'white',
                      textTransform: 'none',
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 500,
                      fontSize: '16px',
                      borderRadius: '50px',
                      px: 3.5,
                      py: 1.25,
                      minWidth: '140px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        backgroundColor: '#c41922',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                      }
                    }}
                  >
                    Get&nbsp;a&nbsp;Quote
                    <Box 
                      component="span" 
                      sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        ml: 0.5,
                        fontSize: '1rem'
                      }}
                    >
                      →
                    </Box>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Wrap all content except hero section in a ContentSection with mouse gradient effect */}
      <Box ref={contentSectionRef} sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Mouse follower gradient light - positioned relative to viewport */}
        <GradientLight 
          sx={{ 
            left: mousePos.x,
            top: mousePos.y,
            width: isMoving ? '600px' : '400px',
            height: isMoving ? '600px' : '400px',
            opacity: isMoving ? 0.85 : 0.7,
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 1
          }} 
        />

        {/* Services Section */}
        <Box id="services-section" sx={{ pt: -1, pb:6 , position: 'relative', zIndex: 2 }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.3 : 0.6 }}
            >
              <Typography variant="h2" align="center" sx={{ 
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3.5rem' },
                fontWeight: 700,
                mb: { xs: 1, md: 2 },
                color: 'white',
                fontFamily: '"Oswald", sans-serif',
              }}>
                OUR SERVICES
              </Typography>
            </motion.div>
            <Typography variant="body1" align="center" sx={{ 
              maxWidth: 700,
              mx: 'auto',
              mb: { xs: 3, md: 6 },
              color: 'rgba(255, 255, 255, 0.65)',
              fontFamily: '"Poppins", sans-serif',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            }}>
              From local deliveries to interstate transport, our comprehensive range of services is designed to meet all your logistics needs with efficiency and reliability.
            </Typography>
            
            <CarouselContainer>
              {/* Carousel Track */}
              <CarouselTrack 
                ref={carouselRef}
                sx={{ 
                  transform: `translateX(-${activeSlide * 100}%)`,
                }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                {isMobile ? 
                  // Mobile view - 2 cards per slide
                  slides.map((slide) => (
                    <Box 
                      key={slide.id} 
                      sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap',
                        width: '100%',
                        flexShrink: 0,
                        gap: 0 // Remove gap between cards
                      }}
                    >
                      {slide.services.map((card) => (
                        <Box 
                          key={card.id} 
                          sx={{ 
                            p: { xs: 1, sm: 2 }, // Add padding between cards
                            width: '50%' // Mobile always shows 2 cards (50% width)
                          }}
                        >
                          <ServiceCard onClick={() => handleServiceClick(card.title)}>
                            <CardMedia
                              component="img"
                              height={100}
                              image={card.image}
                              alt={card.title}
                              sx={{ 
                                opacity: 0.8,
                                height: { xs: 100, sm: 150 }
                              }}
                            />
                            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                              <Typography 
                                variant="h5" 
                                className="service-title"
                                sx={{ 
                                  mb: { xs: 0.5, sm: 1 },
                                  fontWeight: 600,
                                  color: 'white',
                                  fontFamily: '"Poppins", sans-serif',
                                  fontSize: { xs: '0.9rem', sm: '1.1rem' }
                                }}
                              >
                                {card.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'rgba(255,255,255,0.7)',
                                  fontFamily: '"Poppins", sans-serif',
                                  lineHeight: '1.5',
                                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                  fontWeight: 400,
                                  display: { xs: 'none', sm: 'block' }
                                }}
                              >
                                {card.description}
                              </Typography>
                            </CardContent>
                          </ServiceCard>
                        </Box>
                      ))}
                    </Box>
                  ))
                : 
                  // Desktop view - 3 cards per slide
                  desktopSlides.map((slide) => (
                    <Box 
                      key={slide.id} 
                      sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap',
                        width: '100%',
                        flexShrink: 0,
                        gap: 0 // Remove gap between cards
                      }}
                    >
                      {slide.services.map((card) => (
                        <Box 
                          key={card.id} 
                          sx={{ 
                            p: 2, // Add padding between cards
                            width: '33.333%' // Desktop shows 3 cards (33.333% width)
                          }}
                        >
                          <ServiceCard onClick={() => handleServiceClick(card.title)}>
                            <CardMedia
                              component="img"
                              height={200}
                              image={card.image}
                              alt={card.title}
                              sx={{ 
                                opacity: 0.8,
                                height: 200
                              }}
                            />
                            <CardContent sx={{ p: 3 }}>
                              <Typography 
                                variant="h5" 
                                className="service-title"
                                sx={{ 
                                  mb: 2,
                                  fontWeight: 600,
                                  color: 'white',
                                  fontFamily: '"Poppins", sans-serif',
                                  fontSize: '1.5rem'
                                }}
                              >
                                {card.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'rgba(255,255,255,0.7)',
                                  fontFamily: '"Poppins", sans-serif',
                                  lineHeight: '1.5',
                                  fontSize: '16px',
                                  fontWeight: 400
                                }}
                              >
                                {card.description}
                              </Typography>
                            </CardContent>
                          </ServiceCard>
                        </Box>
                      ))}
                    </Box>
                  ))
                }
              </CarouselTrack>
            </CarouselContainer>
            
            {/* Dots indicator for current slide - changes based on view */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
              {isMobile ? 
                // Mobile - 3 dots (3 slides with 2 cards each)
                [
                  { id: 'dot-first-slide', value: 0 }, 
                  { id: 'dot-second-slide', value: 1 },
                  { id: 'dot-third-slide', value: 2 }
                ].map((dot) => (
                  <Box
                    key={dot.id}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      mx: 0.5,
                      cursor: 'pointer',
                      backgroundColor: dot.value === activeSlide ? RED_COLOR : 'rgba(255,255,255,0.3)',
                      transition: 'background-color 0.3s',
                    }}
                    onClick={() => setActiveSlide(dot.value)}
                  />
                ))
              : 
                // Desktop - 2 dots (2 slides with 3 cards each)
                [
                  { id: 'dot-desktop-first-slide', value: 0 }, 
                  { id: 'dot-desktop-second-slide', value: 1 }
                ].map((dot) => (
                  <Box
                    key={dot.id}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      mx: 0.5,
                      cursor: 'pointer',
                      backgroundColor: dot.value === activeSlide ? RED_COLOR : 'rgba(255,255,255,0.3)',
                      transition: 'background-color 0.3s',
                    }}
                    onClick={() => setActiveSlide(dot.value)}
                  />
                ))
              }
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                component={RouterLink}
                to="/services"
                variant="outlined" 
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  textTransform: 'none',
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 400,
                  fontSize: '15px',
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    borderColor: RED_COLOR,
                    bgcolor: 'rgba(222, 31, 39, 0.1)'
                  }
                }}
              >
                View All Services
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Decorative Line */}
        <DecorativeLine />

        <LogoContainer>
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ 
              color: 'white',
              mb: 4, 
              letterSpacing: 1, 
              fontWeight: 800,
              fontFamily: '"Oswald", sans-serif'
            }}>
              TRUSTED BY
            </Typography>
            
            
            <Box className="logo-slide-container">
              <Box className="logo-slide">
                {[
                  { src: "/Sydney+Visitor+Centre_Small.png", alt: "Sydney Visitor Centre", id: "svc-1" },
                  { src: "/motex-transport-hunter-valley-wedding-planner.png", alt: "Hunter Valley Wedding Planner", id: "hvwp-1" },
                  { src: "/motex-transport-cwci-logo.png", alt: "CWCI", id: "cwci-1" },
                  { src: "/Sydney+Visitor+Centre_Small.png", alt: "Sydney Visitor Centre", id: "svc-2" },
                  { src: "/motex-transport-hunter-valley-wedding-planner.png", alt: "Hunter Valley Wedding Planner", id: "hvwp-2" },
                  { src: "/motex-transport-cwci-logo.png", alt: "CWCI", id: "cwci-2" }
                ].map((logo) => (
                  <Box 
                    key={logo.id}
                    component="img" 
                    src={logo.src} 
                    alt={logo.alt}
                    sx={{
                      height: '60px',
                      mx: 6,
                      opacity: 1,
                      transition: 'transform 0.3s',
                      filter: 'brightness(1)',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Container>
        </LogoContainer>

        {/* Decorative Line */}
        <DecorativeLine />

        {/* Why Choose Us Section */}
        <Box sx={{ 
          py: 10, 
          backgroundColor: '#000000',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Circular/Elliptical background patterns - increased size and added animation */}
          <CircleBackground sx={{ 
            top: '10%', 
            left: '5%',
            width: '350px', // Increased size
            height: '350px', // Increased size
            animation: 'pulse 8s infinite ease-in-out',
          }} />
          <CircleBackground sx={{ 
            top: '30%', 
            right: '8%', 
            width: '280px', // Increased size
            height: '280px', // Increased size
            background: 'radial-gradient(circle, rgba(255, 41, 146, 0.8) 0%, rgba(0,0,0,0) 70%)',
            animation: 'pulse 12s infinite ease-in-out',
          }} />
          <CircleBackground sx={{ 
            bottom: '15%', 
            left: '15%', 
            width: '400px', // Increased size
            height: '400px', // Increased size
            background: 'radial-gradient(circle, rgba(117, 57, 255, 0.7) 0%, rgba(0,0,0,0) 70%)',
            animation: 'pulse 10s infinite ease-in-out',
          }} />
          <CircleBackground sx={{ 
            bottom: '25%', 
            right: '15%', 
            width: '320px', // Increased size
            height: '320px', // Increased size
            animation: 'pulse 14s infinite ease-in-out',
          }} />
          
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h2" align="center" sx={{ 
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3.5rem' },
              fontWeight: 700,
              mb: { xs: 1, md: 2 },
              color: 'white',
              fontFamily: '"Oswald", sans-serif',
            }}>
              WHAT WE OFFER
            </Typography>
            
            <Typography variant="body1" align="center" sx={{ 
              maxWidth: 700,
              mx: 'auto',
              mb: { xs: 3, md: 6 },
              color: 'rgba(255, 255, 255, 0.65)',
              fontFamily: '"Poppins", sans-serif',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            }}>
              MOTEX Transport provides comprehensive logistics solutions designed to meet your specific business needs with reliability and efficiency.
            </Typography>
            
            <Grid 
              container 
              spacing={{ xs: 2, md: 3 }} 
              justifyContent="center"
              alignItems="stretch"
            >
              {/* Dedicated Drivers */}
              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    background: CARD_BG_COLOR,
                    height: "100%",
                    borderRadius: "16px",
                    p: { xs: 2, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      "& .section-heading": {
                        color: RED_COLOR
                      }
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                    <Typography 
                      variant="h4"
                      className="section-heading" 
                      sx={{ 
                        mb: { xs: 1, md: 2 },
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 700,
                        color: 'white',
                        transition: 'color 0.3s ease',
                        fontSize: { xs: '1.25rem', md: '1.5rem' }
                      }}
                    >
                      Dedicated Drivers
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: { xs: 2, md: 3 },
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontFamily: '"Poppins", sans-serif',
                        minHeight: { xs: '40px', md: '60px' },
                        fontSize: { xs: '0.85rem', md: '1rem' }
                      }}
                    >
                      Professional drivers who meet your service standards.
                    </Typography>
                    
                    <Divider sx={{ my: { xs: 1.5, md: 3 }, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    
                    <Box sx={{ mb: 3, display: { xs: 'none', sm: 'block' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Customer service focused
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Strong communication skills
                        </Typography>
                      </Box>
                      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Professional presentation
                        </Typography>
                      </Box>
                      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Timely deliveries guaranteed
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Skilled Equipment Operators */}
              <Grid item xs={6} md={4}>
                <Card
                  sx={{
                    background: CARD_BG_COLOR,
                    height: "100%",
                    borderRadius: "16px",
                    p: { xs: 2, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      "& .section-heading": {
                        color: RED_COLOR
                      }
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                    <Typography 
                      variant="h4"
                      className="section-heading" 
                      sx={{ 
                        mb: { xs: 1, md: 2 },
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 700,
                        color: 'white',
                        transition: 'color 0.3s ease',
                        fontSize: { xs: '1.25rem', md: '1.5rem' }
                      }}
                    >
                      Skilled Operators
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      mb: { xs: 2, md: 3 },
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontFamily: '"Poppins", sans-serif',
                      minHeight: { xs: '40px', md: '60px' },
                      fontSize: { xs: '0.85rem', md: '1rem' }
                    }}>
                      Equipped with forklift licenses and proper tools.
                    </Typography>
                    
                    <Divider sx={{ my: { xs: 1.5, md: 3 }, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    
                    <Box sx={{ mb: 3, display: { xs: 'none', sm: 'block' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Certified forklift operators
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Proper equipment for all jobs
                        </Typography>
                      </Box>
                      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Versatile cargo handling
                        </Typography>
                      </Box>
                      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Self-sufficient delivery process
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Modern Fleet */}
              <Grid 
                item 
                xs={6} 
                md={4} 
                sx={{ 
                  ml: { xs: 'auto', sm: 0 },
                  mr: { xs: 'auto', sm: 0 },
                  maxWidth: { xs: 'calc(50% - 16px)', sm: 'none' }
                }}
              >
                <Card
                  sx={{
                    background: CARD_BG_COLOR,
                    height: "100%",
                    borderRadius: "16px",
                    p: { xs: 2, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      "& .section-heading": {
                        color: RED_COLOR
                      }
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 1, md: 2 } }}>
                    <Typography 
                      variant="h4"
                      className="section-heading" 
                      sx={{ 
                        mb: { xs: 1, md: 2 },
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 700,
                        color: 'white',
                        transition: 'color 0.3s ease',
                        fontSize: { xs: '1.25rem', md: '1.5rem' }
                      }}
                    >
                      Modern Fleet
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      mb: { xs: 2, md: 3 },
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontFamily: '"Poppins", sans-serif',
                      minHeight: { xs: '40px', md: '60px' },
                      fontSize: { xs: '0.85rem', md: '1rem' }
                    }}>
                      Current model trucks and Mercedes Benz vehicles.
                    </Typography>
                    
                    <Divider sx={{ my: { xs: 1.5, md: 3 }, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    
                    <Box sx={{ mb: 3, display: { xs: 'none', sm: 'block' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Latest model trucks
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Mercedes Benz Sprinters
                        </Typography>
                      </Box>
                      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Mercedes Benz Vito vans
                        </Typography>
                      </Box>
                      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                        <Box 
                          sx={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: '#DE1F27', 
                            mr: 1.5,
                            flexShrink: 0
                          }} 
                        />
                        <Typography variant="body2" sx={{ 
                          color: 'white',
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: { xs: '0.8rem', md: '1rem' }
                        }}>
                          Regularly maintained
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Decorative Line */}
        <DecorativeLine />

        <Box 
          sx={{ 
            py: { xs: 10, md: 14 },
            position: 'relative',
            background: 'linear-gradient(135deg, #000000 0%, #1a0005 100%)',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Simple accent background */}
          <Box 
            sx={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(222, 31, 39, 0.2) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(60px)',
              zIndex: 1,
            }}
          />

          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
            <Grid 
              container 
              spacing={{ xs: 6, md: 8 }} 
              alignItems="center" 
              sx={{ position: 'relative' }}
            >
              {/* Left side with content */}
              <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                <motion.div
                  initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.3 : 0.6 }}
                >
                  <Box sx={{ 
                    p: { xs: 3, md: 5 },
                    borderRadius: '16px',
                    background: 'rgba(15, 15, 15, 0.6)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}>
                    <Box>
                      
                      <Typography variant="h2" sx={{ 
                        fontSize: { xs: '1.75rem', sm: '2rem', md: '3rem' },
                        fontWeight: 800,
                        mb: 2,
                        color: '#FFFFFF',
                        fontFamily: '"Oswald", sans-serif',
                        lineHeight: 1.2,
                        wordBreak: { xs: 'break-word', sm: 'normal' },
                        letterSpacing: { xs: '-0.5px', md: 'normal' }
                      }}>
                        GET YOUR TRANSPORT QUOTE IN SECONDS
                      </Typography>
                      
                      <Typography variant="body1" sx={{ 
                        mb: { xs: 2, md: 4 },
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        lineHeight: 1.5,
                        fontFamily: '"Poppins", sans-serif',
                      }}>
                        Skip the waiting and paperwork. Our instant quote system delivers 
                        quotes instantly so you can book your shipment and get moving.
                      </Typography>
                      
                      {/* Features */}
                      <Box sx={{ mb: { xs: 2, md: 4 } }}>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <InventoryIcon sx={{ fontSize: { xs: 20, md: 25 }, color: RED_COLOR, mr: 2 }} />
                          <Typography variant="body2" sx={{ color: 'white', fontFamily: '"Poppins", sans-serif', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                            All package sizes and weights accommodated
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EventAvailableIcon sx={{ fontSize: { xs: 20, md: 25 }, color: RED_COLOR, mr: 2 }} />
                          <Typography variant="body2" sx={{ color: 'white', fontFamily: '"Poppins", sans-serif', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                            Same-day and scheduled deliveries available
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Button
                        variant="contained" 
                        onClick={() => handleNavigation('/instant-quote')}
                        sx={{ 
                          bgcolor: RED_COLOR, 
                          color: 'white',
                          textTransform: 'none',
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 400,
                          fontSize: '15px',
                          borderRadius: '50px',
                          padding: '8px 24px',
                          minWidth: '130px',
                          whiteSpace: 'nowrap',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            bgcolor: '#c41922',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)'
                          }
                        }}
                      >
                        Get&nbsp;a&nbsp;Quote
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
              
              {/* Right side with image */}
              <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box 
                    sx={{ 
                      position: 'relative',
                      height: { xs: '300px', md: '500px' },
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    <Box 
                      component="img"
                      loading="lazy"
                      src="/PHOTO-2025-03-22-21-36-55.jpg"
                      alt="Get Instant Quote"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                      height: '40%',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      p: 3
                    }}>
                      
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Decorative Line */}
        <DecorativeLine />

        {/* Testimonials Section */}
        <TestimonialSection>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" sx={{ 
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3.5rem' },
              fontWeight: 700,
              mb: { xs: 3, md: 6 },
              color: 'white',
              fontFamily: '"Oswald", sans-serif',
            }}>
              WHAT OUR CLIENTS SAY ABOUT US
            </Typography>
            
            {/* Desktop view - static grid */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Grid container spacing={3}>
                {/* Hunter Valley Wedding Planner Testimonial */}
                <Grid item md={6}>
                  <Box sx={{ p: 2 }}>

                    <TestimonialCard>
                      <Box
                        component="img"
                        src="/motex-transport-hunter-valley-wedding-planner.png"
                        alt="Hunter Valley Wedding Planner"
                        sx={{
                          height: { xs: '40px', sm: '60px', md: '80px' },
                          mb: { xs: 2, md: 4 },
                          display: 'block',
                          filter: 'brightness(1.2)',
                        }}
                      />
                      
                      <Typography variant="body1" sx={{ 
                        mb: 2, 
                        lineHeight: 1.6,
                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: 'italic',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' },
                        height: { xs: '150px', sm: '200px', md: 'auto' },
                        overflow: { xs: 'auto', md: 'visible' },
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 10, sm: 'unset' },
                        WebkitBoxOrient: 'vertical'
                      }}>
                        "The service we received from Motex Transport was extremely professional, efficient and cost effective. Roy was an absolute life saver for us, during an extremely busy period for the business. We had multiple delivery drops - one being on a Saturday - and nothing was an issue. We liked that we could communicate directly with the driver, which was extremely reassuring for us when goods needed to be delivered within allocated time slots. He also continued to communicate with us in terms of delivery ETA's and updates. This really saved us sooooo much stress and pressure. We hope to continue to use Motex moving forward. Well done and thank you for your professionalism and wonderful service."
                      </Typography>
                      
                      <Typography variant="subtitle1" sx={{ 
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' }
                      }}>
                        - Natalie, <Box component="a" href="https://huntervalleyweddingplanner.com.au/" target="_blank" rel="noopener" sx={{ color: '#c6b47a', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Hunter Valley Wedding Planner</Box>
                      </Typography>
                    </TestimonialCard>
                  </Box>
                </Grid>
                
                {/* CWCI Australia Testimonial */}
                <Grid item md={6}>
                  <Box sx={{ p: 2 }}>

                    <TestimonialCard>
                      <Box
                        component="img"
                        src="/motex-transport-cwci-logo.png"
                        alt="CWCI Australia"
                        sx={{
                          height: { xs: '40px', sm: '60px', md: '80px' },
                          mb: { xs: 2, md: 4 },
                          display: 'block',
                          filter: 'brightness(1.2)',
                        }}
                      />
                      
                      <Typography variant="body1" sx={{ 
                        mb: 2, 
                        lineHeight: 1.6,
                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: 'italic',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                        height: { xs: '200px', sm: '250px', md: 'auto' },
                        overflow: { xs: 'hidden', md: 'visible' }
                      }}>
                        "Our premises are a challenge for deliveries with stairs and uneven surfaces, however Roy (Motex) has for many years delivered boxes to us with efficiency, care and cheerfulness. This makes a huge difference as we are a small staff yet often have deliveries varying from 5 - 30 boxes at different times of the year. This enables us to function well and always be on top of stock and supply. I would highly recommend Motex Transport to any size or type of business - you won't be disappointed!"
                      </Typography>
                      
                      <Typography variant="subtitle1" sx={{ 
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' }
                      }}>
                        - Christine, <Box component="a" href="https://cwciaus.org.au/" target="_blank" rel="noopener" sx={{ color: '#9b3dba', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>CWCI Australia</Box>
                      </Typography>
                    </TestimonialCard>
                  </Box>
                </Grid>
                
                {/* Sydney Visitor Centre Testimonial */}
                <Grid item md={12}>
                  <Box sx={{ p: 2, maxWidth: '800px', mx: 'auto' }}>

                    <TestimonialCard sx={{ textAlign: 'center' }}>
                      <Box
                        component="img"
                        src="/Sydney+Visitor+Centre_Small.png"
                        alt="Sydney Visitor Centre"
                        sx={{
                          height: { xs: '40px', sm: '50px', md: '60px' },
                          mb: { xs: 2, md: 4 },
                          display: 'block',
                          mx: 'auto',
                          filter: 'brightness(1.2)',
                        }}
                      />
                      
                      <Typography variant="body1" sx={{ 
                        mb: 2, 
                        lineHeight: 1.6,
                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: 'italic',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                        maxWidth: '800px',
                        mx: 'auto'
                      }}>
                        "The Motex Team consistently go that extra mile for the customer. In order to free up the time of our staff on the ground, the Motex team go above and beyond the typical expectations to ensure we as the customer are always put first whilst carrying out the job to an exemplary level. I would highly recommend and endorse Motex as being an excellent company, and we will most certainly continue to use their services."
                      </Typography>
                      
                      <Typography variant="subtitle1" sx={{ 
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' }
                      }}>
                        - Adam, <Box component="a" href="https://visitorcentre.com.au/" target="_blank" rel="noopener" sx={{ color: '#0066b3', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sydney Visitor Centre</Box>
                      </Typography>
                    </TestimonialCard>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
            {/* Mobile view - carousel */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <CarouselContainer>
                <CarouselTrack 
                  ref={testimonialCarouselRef}
                  sx={{ 
                    transform: `translateX(-${activeTestimonialSlide * 100}%)`,
                  }}
                >
                  {/* First Slide - Hunter Valley Wedding Planner */}
                  <Box 
                    sx={{ 
                      display: 'flex',
                      width: '100%',
                      flexShrink: 0,
                      justifyContent: 'center',
                      p: { xs: 2 }
                    }}
                  >
                    <TestimonialCard sx={{ width: '100%' }}>
                      <Box
                        component="img"
                        src="/motex-transport-hunter-valley-wedding-planner.png"
                        alt="Hunter Valley Wedding Planner"
                        sx={{
                          height: { xs: '40px', sm: '60px' },
                          mb: { xs: 2 },
                          display: 'block',
                          filter: 'brightness(1.2)',
                        }}
                      />
                      
                      <Typography variant="body1" sx={{ 
                        mb: 2, 
                        lineHeight: 1.6,
                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: 'italic',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        maxHeight: '180px',
                        overflow: 'auto'
                      }}>
                        "The service we received from Motex Transport was extremely professional, efficient and cost effective. Roy was an absolute life saver for us, during an extremely busy period for the business. We had multiple delivery drops - one being on a Saturday - and nothing was an issue. We liked that we could communicate directly with the driver, which was extremely reassuring for us when goods needed to be delivered within allocated time slots. He also continued to communicate with us in terms of delivery ETA's and updates. This really saved us sooooo much stress and pressure. We hope to continue to use Motex moving forward. Well done and thank you for your professionalism and wonderful service."
                      </Typography>
                      
                      <Typography variant="subtitle1" sx={{ 
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', sm: '0.85rem' }
                      }}>
                        - Natalie, <Box component="a" href="https://huntervalleyweddingplanner.com.au/" target="_blank" rel="noopener" sx={{ color: '#c6b47a', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Hunter Valley Wedding Planner</Box>
                      </Typography>
                    </TestimonialCard>
                  </Box>
                  
                  {/* Second Slide - CWCI Australia */}
                  <Box 
                    sx={{ 
                      display: 'flex',
                      width: '100%',
                      flexShrink: 0,
                      justifyContent: 'center',
                      p: { xs: 2 }
                    }}
                  >
                    <TestimonialCard sx={{ width: '100%' }}>
                      <Box
                        component="img"
                        src="/motex-transport-cwci-logo.png"
                        alt="CWCI Australia"
                        sx={{
                          height: { xs: '40px', sm: '60px' },
                          mb: { xs: 2 },
                          display: 'block',
                          filter: 'brightness(1.2)',
                        }}
                      />
                      
                      <Typography variant="body1" sx={{ 
                        mb: 2, 
                        lineHeight: 1.6,
                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: 'italic',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        maxHeight: '180px',
                        overflow: 'auto'
                      }}>
                        "Our premises are a challenge for deliveries with stairs and uneven surfaces, however Roy (Motex) has for many years delivered boxes to us with efficiency, care and cheerfulness. This makes a huge difference as we are a small staff yet often have deliveries varying from 5 - 30 boxes at different times of the year. This enables us to function well and always be on top of stock and supply. I would highly recommend Motex Transport to any size or type of business - you won't be disappointed!"
                      </Typography>
                      
                      <Typography variant="subtitle1" sx={{ 
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', sm: '0.85rem' }
                      }}>
                        - Christine, <Box component="a" href="https://cwciaus.org.au/" target="_blank" rel="noopener" sx={{ color: '#9b3dba', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>CWCI Australia</Box>
                      </Typography>
                    </TestimonialCard>
                  </Box>
                  
                  {/* Third Slide - Sydney Visitor Centre */}
                  <Box 
                    sx={{ 
                      display: 'flex',
                      width: '100%',
                      flexShrink: 0,
                      justifyContent: 'center',
                      p: { xs: 2 }
                    }}
                  >
                    <TestimonialCard sx={{ width: '100%', textAlign: 'center' }}>
                      <Box
                        component="img"
                        src="/Sydney+Visitor+Centre_Small.png"
                        alt="Sydney Visitor Centre"
                        sx={{
                          height: { xs: '40px', sm: '50px' },
                          mb: { xs: 2 },
                          display: 'block',
                          mx: 'auto',
                          filter: 'brightness(1.2)',
                        }}
                      />
                      
                      <Typography variant="body1" sx={{ 
                        mb: 2, 
                        lineHeight: 1.6,
                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: 'italic',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        maxHeight: '180px',
                        overflow: 'auto'
                      }}>
                        "The Motex Team consistently go that extra mile for the customer. In order to free up the time of our staff on the ground, the Motex team go above and beyond the typical expectations to ensure we as the customer are always put first whilst carrying out the job to an exemplary level. I would highly recommend and endorse Motex as being an excellent company, and we will most certainly continue to use their services."
                      </Typography>
                      
                      <Typography variant="subtitle1" sx={{ 
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: { xs: '0.75rem', sm: '0.85rem' }
                      }}>
                        - Adam, <Box component="a" href="https://visitorcentre.com.au/" target="_blank" rel="noopener" sx={{ color: '#0066b3', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sydney Visitor Centre</Box>
                      </Typography>
                    </TestimonialCard>
                  </Box>
                </CarouselTrack>
              </CarouselContainer>
              
              {/* Dots indicator for testimonial slides - mobile only */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                {[
                  { id: 'testimonial-dot-1', value: 0 }, 
                  { id: 'testimonial-dot-2', value: 1 },
                  { id: 'testimonial-dot-3', value: 2 }
                ].map((dot) => (
                  <Box
                    key={dot.id}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      mx: 0.5,
                      cursor: 'pointer',
                      backgroundColor: dot.value === activeTestimonialSlide ? RED_COLOR : 'rgba(255,255,255,0.3)',
                      transition: 'background-color 0.3s',
                    }}
                    onClick={() => setActiveTestimonialSlide(dot.value)}
                  />
                ))}
              </Box>
            </Box>
          </Container>
        </TestimonialSection>

        {/* Decorative Line */}
        <DecorativeLine />

        <Box sx={{ bgcolor: RED_COLOR, py: 6 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={5}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box 
                    component="img" 
                    src="/MOTEX+Logo.png" 
                    alt="MOTEX Logo" 
                    sx={{ 
                      height: 40, 
                      filter: 'brightness(0) invert(1)'
                    }} 
                  />
                </Box>
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.9, mb: 3, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                  MOTEX Transport is a leading provider of logistics and transportation services across Australia, offering reliable and efficient solutions for businesses of all sizes.
                </Typography>
                
                {/* Social Media Icons */}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <IconButton 
                    sx={{ 
                      color: 'white', 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.3)' }
                    }}
                    component="a"
                    href="https://www.instagram.com/motextransport/"
                  >
                    <InstagramIcon />
                  </IconButton>
                </Stack>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontFamily: '"Poppins", sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
                  Quick Links
                </Typography>
                <Stack spacing={1}>
                  <Link href="/" color="inherit" underline="hover" sx={{ color: 'white', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    Home
                  </Link>
                  <Link href="/about-us" color="inherit" underline="hover" sx={{ color: 'white', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    About Us
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ color: 'white', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    Services
                  </Link>
                  <Link href="/instant-quote" color="inherit" underline="hover" sx={{ color: 'white', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    Instant Quote
                  </Link>
                  <Link href="/gallery" color="inherit" underline="hover" sx={{ color: 'white', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    Gallery
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ color: 'white', fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    Contact
                  </Link>
                </Stack>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontFamily: '"Poppins", sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ color: 'white', mr: 1.5 }} />
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.9, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                  Rozelle NSW 2039, Australia
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ color: 'white', mr: 1.5 }} />
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.9, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    +61 423 440 056
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ color: 'white', mr: 1.5 }} />
                  <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
                    motextransportau@gmail.com
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', my: 4 }} />
            
            <Typography variant="body2" align="center" sx={{ color: 'white', opacity: 0.9, fontFamily: '"Poppins", sans-serif', fontWeight: 300 }}>
              © {new Date().getFullYear()} MOTEX Transport. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
      
      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 300 },
            backgroundColor: '#050505',
            padding: { xs: 2, sm: 3 }
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton 
            onClick={() => setIsMobileMenuOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box component="img" src="/MOTEX+Logo.png" alt="MOTEX Logo" sx={{ width: 120, my: 2 }} />
        
        <List>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' }
              }}
            >
              <ListItemText 
                primary="Home" 
                primaryTypographyProps={{ 
                  fontFamily: '"Poppins", sans-serif', 
                  fontWeight: 600, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/services');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Services" 
                primaryTypographyProps={{ 
                  fontFamily: '"Poppins", sans-serif', 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/about-us');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="About Us" 
                primaryTypographyProps={{ 
                  fontFamily: '"Poppins", sans-serif', 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/instant-quote');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Instant Quote" 
                primaryTypographyProps={{ 
                  fontFamily: '"Poppins", sans-serif', 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/gallery');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Gallery" 
                primaryTypographyProps={{ 
                  fontFamily: '"Poppins", sans-serif', 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => {
                handleNavigation('/contact-us');
                setIsMobileMenuOpen(false);
              }}
              sx={{ 
                py: 1.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
              }}
            >
              <ListItemText 
                primary="Contact Us" 
                primaryTypographyProps={{ 
                  fontFamily: '"Poppins", sans-serif', 
                  fontWeight: 400, 
                  color: 'white',
                  fontSize: { xs: '0.95rem', sm: '1rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
        
        <Box sx={{ p: 2, mt: 2 }}>
          <Button 
            onClick={() => {
              handleNavigation('/instant-quote');
              setIsMobileMenuOpen(false);
            }}
            variant="contained" 
            fullWidth
            sx={{
              backgroundColor: RED_COLOR,
              color: 'white',
              fontFamily: '"Oswald", sans-serif',
              fontWeight: 500,
              py: 1,
              borderRadius: 1,
              transition: '0.3s',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': {
                backgroundColor: '#c50000',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            Get a Quote
          </Button>
        </Box>
      </Drawer>
    </GradientBackground>
    </>
  );
};

export default LandingPage;