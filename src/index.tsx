import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Only redirect if running as PWA
// Check for PWA mode by looking for display-mode: standalone or the pwa URL parameter
const isPwa = () => {
  return (
    window.matchMedia('(display-mode: standalone)').matches || 
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    // Check for iOS standalone mode
    (navigator as any).standalone === true || 
    window.location.search.includes('pwa=true')
  );
};

// Redirect to motextransport.com.au only if in PWA mode
if (isPwa()) {
  window.location.href = 'https://motextransport.com.au';
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Error during service worker registration:', error);
      });
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
