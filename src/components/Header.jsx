import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  useTheme 
} from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = () => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <AppBar position="sticky" sx={{ borderRadius: '2px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo512.png" alt="Spid2Prop" width="32" height="32" style={{ marginRight: '10px' }} />
          <Typography variant="h6" component="div">
            Spid2Prop
          </Typography>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              ml: 1.5, 
              color: 'text.secondary',
              display: { xs: 'none', sm: 'block' } 
            }}
          >
            Real Estate Data Backup Tool
          </Typography>
        </Box>
        
        <IconButton 
          onClick={toggleColorMode} 
          color="inherit"
          aria-label="toggle dark mode"
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 