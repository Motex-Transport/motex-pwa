import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { HelmetProvider } from 'react-helmet-async';
import './fonts/custom-fonts.css'; // Import custom fonts

// Import pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import TableListPage from './pages/TableListPage';
import TableDetailPage from './pages/TableDetailPage';
import InstantQuotePage from './pages/InstantQuotePage';
import QuoteSuccessPage from './pages/QuoteSuccessPage';
import GalleryPage from './pages/GalleryPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import ServicesPage from './pages/ServicesPage';
import PwaWrapper from './components/pwa/PwaWrapper';
import PwaDetector from './components/pwa/PwaDetector';
import InstallPwaBanner from './components/pwa/InstallPwaBanner';
import WindowsInstallPrompt from './components/pwa/WindowsInstallPrompt';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development' || 
                     window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1';

function App() {
  // Check if the app is running on Windows
  const isWindows = /Windows NT/.test(window.navigator.userAgent);
  
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PwaWrapper>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/instant-quote" element={<InstantQuotePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/quote-success" element={<QuoteSuccessPage />} />
            </Routes>
          </Router>
          <InstallPwaBanner />
          {isWindows && <WindowsInstallPrompt />}
        </PwaWrapper>
        {isDevelopment && <PwaDetector />}
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;