import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppBar, Toolbar, Container, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Logo } from '../common/Logo';
import { TopRibbon } from './TopRibbon';

interface NavigationProps {
  onSignInClick?: () => void;
  onScrollToSection?: (sectionId: string) => void;
  currentView?: string;
  hideAuthButton?: boolean;
  showTopRibbon?: boolean;
}

export function Navigation({ onSignInClick, onScrollToSection, currentView = 'home', hideAuthButton = false, showTopRibbon = true }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Why TIMPEX.club', sectionId: 'why-timpex' },
    { label: 'Who is this for', sectionId: 'who-is-this-for' },
    { label: 'What We Offer', sectionId: 'what-we-offer' },
    { label: 'How it Works', sectionId: 'how-it-works' },
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
                onClick={onScrollToSection ? () => onScrollToSection('home') : undefined} 
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
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5, ml: 'auto', flexWrap: 'nowrap' }}>
              {navItems.map((item) => (
                <Button
                  key={item.sectionId}
                  onClick={onScrollToSection ? () => onScrollToSection(item.sectionId) : undefined}
                  sx={{
                    color: currentView === item.sectionId ? 'primary.main' : 'text.primary',
                    fontWeight: currentView === item.sectionId ? 600 : 400,
                    fontSize: '0.875rem',
                    px: 1.5,
                    py: 1,
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: '2px',
                      bgcolor: 'primary.main',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    },
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'rgba(26, 61, 50, 0.05)',
                      transform: 'translateY(-2px)',
                      '&::before': {
                        width: '80%',
                      },
                    },
                    transition: 'all 0.3s ease',
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
                    px: 2.5,
                    py: 1,
                    fontSize: '0.9rem',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    whiteSpace: 'nowrap',
                    minWidth: 'auto',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(26, 61, 50, 0.3)',
                    },
                    transition: 'all 0.3s ease',
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
            <ListItem key={item.sectionId} disablePadding>
              <ListItemButton
                onClick={() => {
                  onScrollToSection?.(item.sectionId);
                  setIsMenuOpen(false);
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      color: currentView === item.sectionId ? 'primary.main' : 'text.primary',
                      fontWeight: currentView === item.sectionId ? 600 : 400,
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