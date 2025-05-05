import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Redirect to the external website
    window.location.href = 'https://motextransport.com.au';
  }, []);

  return (
    <div className="redirect-container">
      <img src="/MOTEX+Logo.png" alt="Motex Transport Logo" className="logo" />
      <h1>Redirecting to Motex Transport</h1>
      <p>You will be redirected to the official Motex Transport website in a moment...</p>
      <a 
        href="https://motextransport.com.au" 
        className="redirect-button"
      >
        Click here if you are not redirected automatically
      </a>
    </div>
  );
}

export default App;