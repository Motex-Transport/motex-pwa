import React from 'react';
import { 
  Paper, 
  BottomNavigation as MuiBottomNavigation, 
  BottomNavigationAction,
  useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import PersonIcon from '@mui/icons-material/Person';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  // Current path is used to determine which navigation item is active
  const currentPath = location.pathname;
  
  // Set the active value based on the current path
  let activeValue = '';
  
  if (currentPath === '/' || currentPath === '') {
    activeValue = '/';
  } else if (currentPath.includes('/instant-quote') || currentPath.includes('/map-pickup-drop')) {
    activeValue = '/instant-quote';
  } else if (currentPath.includes('/my-requests')) {
    activeValue = '/my-requests';
  } else if (currentPath.includes('/contact-us') || currentPath.includes('/support')) {
    activeValue = '/contact-us';
  } else if (currentPath.includes('/profile')) {
    activeValue = '/profile';
  }
  
  // Handle navigation
  const handleNavChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };
  
  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        borderRadius: 0,
      }} 
      elevation={3}
    >
      <MuiBottomNavigation
        value={activeValue}
        onChange={handleNavChange}
        showLabels
        sx={{
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 0',
            color: '#757575',
          },
          '& .MuiBottomNavigationAction-root.Mui-selected': {
            color: theme.palette.primary.main,
          }
        }}
      >
        <BottomNavigationAction 
          label="Home" 
          value="/" 
          icon={<HomeIcon />} 
          sx={{ 
            fontSize: '0.7rem',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.7rem',
            },
          }}
        />
        <BottomNavigationAction 
          label="Quote" 
          value="/instant-quote" 
          icon={<ReceiptIcon />} 
          sx={{ 
            fontSize: '0.7rem',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.7rem',
            },
          }}
        />
        <BottomNavigationAction 
          label="Requests" 
          value="/my-requests" 
          icon={<HistoryIcon />} 
          sx={{ 
            fontSize: '0.7rem',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.7rem',
            },
          }}
        />
        <BottomNavigationAction 
          label="Support" 
          value="/contact-us" 
          icon={<HeadsetMicIcon />} 
          sx={{ 
            fontSize: '0.7rem',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.7rem',
            },
          }}
        />
        <BottomNavigationAction 
          label="Profile" 
          value="/profile" 
          icon={<PersonIcon />} 
          sx={{ 
            fontSize: '0.7rem',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.7rem',
            },
          }}
        />
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNav; 