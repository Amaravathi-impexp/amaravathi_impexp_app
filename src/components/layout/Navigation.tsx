import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AppBar, Toolbar, Container, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Logo } from '../common/Logo';
import { TopRibbon } from './TopRibbon';

interface NavigationProps {
  onSignInClick?: () => void;
  onHomeClick?: () => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onContactClick?: () => void;
  currentView?: string;
}

export function Navigation({ onSignInClick, onHomeClick, onAboutClick, onCareersClick, onContactClick, currentView = 'home' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', onClick: onHomeClick, view: 'home' },
    { label: 'About', onClick: onAboutClick, view: 'about' },
    { label: 'Careers', onClick: onCareersClick, view: 'careers' },
    { label: 'Contact', onClick: onContactClick, view: 'contact' },
  ];

  return (
    <>
      <TopRibbon />
      <AppBar 
        position="sticky" 
        sx={{ 
          top: '40px', 
          bgcolor: 'white', 
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          zIndex: 40,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ height: 96, px: { xs: 2, sm: 3, lg: 4 } }} disableGutters>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 } }}>
              <IconButton 
                onClick={onHomeClick} 
                sx={{ 
                  p: 0,
                  '&:hover': { opacity: 0.8 },
                  transition: 'opacity 0.2s',
                }}
              >
                <Logo className="h-[86px]" />
              </IconButton>
            </Box>

            {/* Desktop Navigation - aligned right */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3, ml: 'auto' }}>
              {navItems.map((item) => (
                <Button
                  key={item.view}
                  onClick={item.onClick}
                  sx={{
                    color: currentView === item.view ? 'primary.main' : 'text.primary',
                    fontWeight: currentView === item.view ? 600 : 400,
                    fontSize: '1.125rem',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'transparent',
                    },
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <IconButton
                sx={{
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ChevronDown className="w-5 h-5" />
              </IconButton>
              <Button
                onClick={onSignInClick}
                variant="contained"
                sx={{
                  px: 3,
                  py: 1.25,
                  fontSize: '1.125rem',
                  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                  whiteSpace: 'nowrap',
                }}
              >
                Sign In / Sign Up
              </Button>
            </Box>

            {/* Mobile menu button */}
            <IconButton
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              sx={{ 
                display: { xs: 'flex', md: 'none' },
                ml: 'auto',
              }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            top: '136px', // 40px TopRibbon + 96px Toolbar
            borderTop: '1px solid',
            borderColor: 'grey.200',
          },
        }}
      >
        <List sx={{ py: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.view} disablePadding>
              <ListItemButton
                onClick={() => {
                  item.onClick?.();
                  setIsMenuOpen(false);
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      color: currentView === item.view ? 'primary.main' : 'text.primary',
                      fontWeight: currentView === item.view ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem>
            <Button
              onClick={onSignInClick}
              variant="contained"
              fullWidth
              sx={{
                py: 1.25,
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
              }}
            >
              Sign In / Sign Up
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}