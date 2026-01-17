import { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
  hideAuthButton?: boolean;
  showTopRibbon?: boolean;
}

export function Navigation({ onSignInClick, onHomeClick, onAboutClick, onCareersClick, onContactClick, currentView = 'home', hideAuthButton = false, showTopRibbon = true }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', onClick: onHomeClick, view: 'home' },
    { label: 'About', onClick: onAboutClick, view: 'about' },
    { label: 'Contact', onClick: onContactClick, view: 'contact' },
  ];

  return (
    <>
      {showTopRibbon && <TopRibbon />}
      <AppBar 
        position="fixed" 
        sx={{ 
          top: '40px', 
          bgcolor: '#f0f7ed', 
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
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 }, height: 96, overflow: 'hidden' }}>
              <IconButton 
                onClick={onHomeClick} 
                sx={{ 
                  p: 0,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': { opacity: 0.8 },
                  transition: 'opacity 0.2s',
                  overflow: 'hidden',
                }}
              >
                <Logo className="h-[210px]" />
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
              {!hideAuthButton && (
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
                  Login / Enroll
                </Button>
              )}
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
            bgcolor: '#f0f7ed',
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
          {!hideAuthButton && (
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
                Login / Enroll
              </Button>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}