import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#DE1F27',
      light: '#FF5252',
      dark: '#C41920',
    },
    secondary: {
      main: '#FF2992',
      light: '#FF5CAF',
      dark: '#C21B6F',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: 'rgba(0, 0, 0, 0.6)',
    }
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: '"Poppins", sans-serif',
    },
    subtitle2: {
      fontFamily: '"Poppins", sans-serif',
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontFamily: '"Poppins", sans-serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;