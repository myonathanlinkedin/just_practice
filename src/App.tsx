import React, { useMemo, useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import NotesList from './features/notes/NotesList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const drawerWidth = 260;
const primaryBlue = {
  light: '#1976d2',
  dark: '#1565c0',
};

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? primaryBlue.light : primaryBlue.dark,
        contrastText: '#fff',
      },
      background: {
        default: mode === 'light' ? '#f3f6f8' : '#18191a',
        paper: mode === 'light' ? '#fff' : '#242526',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeightBold: 600,
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'light' ? '#fff' : '#1d2226',
            borderRight: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? primaryBlue.light : primaryBlue.dark,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          },
        },
      },
    },
  }), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Avatar 
              sx={{ 
                mr: 2, 
                bgcolor: '#fff', 
                color: primaryBlue.light, 
                width: 40, 
                height: 40, 
                fontSize: 24,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease'
              }}
            >
              <MenuBookIcon />
            </Avatar>
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700, 
                letterSpacing: 1,
                background: mode === 'light' 
                  ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                  : 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Notes App
            </Typography>
            <IconButton 
              onClick={toggleTheme} 
              sx={{ 
                color: mode === 'light' ? primaryBlue.light : '#fff',
                '&:hover': {
                  bgcolor: mode === 'light' 
                    ? 'rgba(25, 118, 210, 0.08)' 
                    : 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: drawerWidth, 
              boxSizing: 'border-box', 
              pt: 2,
              boxShadow: '1px 0 10px rgba(0,0,0,0.08)'
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', mt: 2 }}>
            <List>
              <ListItem 
                component="button" 
                key="Home" 
                sx={{ 
                  borderRadius: 2, 
                  mb: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: mode === 'light' 
                      ? 'rgba(25, 118, 210, 0.08)' 
                      : 'rgba(255, 255, 255, 0.08)'
                  }
                }}
              >
                <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography 
                      fontWeight={600}
                      sx={{
                        color: mode === 'light' ? 'text.primary' : '#fff'
                      }}
                    >
                      Home
                    </Typography>
                  } 
                />
              </ListItem>
              <ListItem 
                component="button" 
                key="Notes" 
                sx={{ 
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: mode === 'light' 
                      ? 'rgba(25, 118, 210, 0.08)' 
                      : 'rgba(255, 255, 255, 0.08)'
                  }
                }}
              >
                <ListItemIcon><NoteIcon color="primary" /></ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography 
                      fontWeight={600}
                      sx={{
                        color: mode === 'light' ? 'text.primary' : '#fff'
                      }}
                    >
                      Notes
                    </Typography>
                  } 
                />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            bgcolor: 'background.default', 
            p: { xs: 1, sm: 3 }, 
            minHeight: '100vh',
            transition: 'all 0.2s ease'
          }}
        >
          <Toolbar />
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 3,
              fontWeight: 700,
              background: mode === 'light' 
                ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                : 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Notes Feed
          </Typography>
          <NotesList />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App; 