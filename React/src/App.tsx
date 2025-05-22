import React, { useMemo, useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import NotesList from './features/notes/NotesList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import EditNoteIcon from '@mui/icons-material/EditNote';

const drawerWidth = 260;
const primaryColors = {
  light: '#2563eb',
  dark: '#1d4ed8',
};

function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Avatar 
        sx={{ 
          bgcolor: 'primary.main',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <EditNoteIcon sx={{ fontSize: 20 }} />
      </Avatar>
      <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
        Notes App
      </Typography>
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? primaryColors.light : primaryColors.dark,
        contrastText: '#fff',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0f172a',
        paper: mode === 'light' ? '#fff' : '#1e293b',
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      fontWeightBold: 600,
      h6: {
        fontSize: '1.25rem',
      },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'light' ? '#fff' : '#1e293b',
            borderRight: '1px solid',
            borderColor: mode === 'light' ? '#e2e8f0' : '#334155',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? primaryColors.light : primaryColors.dark,
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: mode === 'light' ? '#f1f5f9' : '#334155',
            },
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
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', pt: 2 },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', mt: 2, px: 1 }}>
            <List>
              <ListItem component="div" key="Home" sx={{ borderRadius: 2, mb: 1, cursor: 'pointer' }}>
                <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
                <ListItemText primary={<Typography fontWeight={600}>Home</Typography>} />
              </ListItem>
              <ListItem component="div" key="Notes" sx={{ borderRadius: 2, cursor: 'pointer' }}>
                <ListItemIcon><NoteIcon color="primary" /></ListItemIcon>
                <ListItemText primary={<Typography fontWeight={600}>Notes</Typography>} />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: { xs: 2, sm: 4 }, minHeight: '100vh' }}>
          <Toolbar />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 4 }}>
            Notes Feed
          </Typography>
          <NotesList />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
