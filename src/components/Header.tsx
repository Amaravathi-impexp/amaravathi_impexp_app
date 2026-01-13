import { Search, Bell, Menu, X, LayoutDashboard, Ship, Users, BarChart3, FileText, Settings as SettingsIcon, User, LogOut } from 'lucide-react';
import { Box, TextField, InputAdornment, IconButton, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useState } from 'react';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileMenu } from './ProfileMenu';
import { Logo } from './Logo';
import { useAppSelector } from '../store/hooks';
import { selectIsAdmin } from '../store/selectors/authSelectors';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showMobileMenu: boolean;
  onToggleMobileMenu: () => void;
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  onSignOut: () => void;
  onLogoClick: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  showMobileMenu,
  onToggleMobileMenu,
  activeMenu,
  onMenuChange,
  onSignOut,
  onLogoClick,
}: HeaderProps) {
  // Check if user is admin
  const isAdmin = useAppSelector(selectIsAdmin);
  
  const handleMobileMenuClick = (menu: string) => {
    onMenuChange(menu);
    onToggleMobileMenu();
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          bgcolor: 'white',
          borderBottom: 1,
          borderColor: 'divider',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          boxShadow: 1,
        }}
      >
        <Box sx={{ maxWidth: '100%', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 96 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', height: 96, overflow: 'hidden' }}>
              <IconButton
                onClick={onLogoClick}
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

            {/* Right Side - Search, Notifications and Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {/* Search */}
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <TextField
                  size="small"
                  placeholder="Search shipments..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  sx={{ width: 250 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={16} style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Notifications */}
              <NotificationDropdown />

              {/* Profile */}
              <ProfileMenu 
                onSignOut={onSignOut} 
                onSettingsClick={() => onMenuChange('settings')}
                onProfileClick={() => onMenuChange('profile')}
              />

              {/* Mobile Menu Button */}
              <IconButton
                sx={{ display: { xs: 'flex', md: 'none' } }}
                onClick={onToggleMobileMenu}
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </IconButton>
            </Box>
          </Box>

          {/* Mobile Menu */}
          <Collapse in={showMobileMenu}>
            <Box sx={{ display: { md: 'none' }, py: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'white' }}>
              <List component="nav" disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <ListItemButton
                  onClick={() => handleMobileMenuClick('dashboard')}
                  selected={activeMenu === 'dashboard'}
                  sx={{
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.lighter',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    <LayoutDashboard size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton
                  onClick={() => handleMobileMenuClick('shipments')}
                  selected={activeMenu === 'shipments'}
                  sx={{
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.lighter',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    <Ship size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Shipments" />
                </ListItemButton>

                <ListItemButton
                  onClick={() => handleMobileMenuClick('partner-directory')}
                  selected={activeMenu === 'partner-directory'}
                  sx={{
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.lighter',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    <Users size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Partner Directory" />
                </ListItemButton>

                <ListItemButton
                  onClick={() => handleMobileMenuClick('analytics')}
                  selected={activeMenu === 'analytics'}
                  sx={{
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.lighter',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    <BarChart3 size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
                </ListItemButton>

                <ListItemButton
                  onClick={() => handleMobileMenuClick('documents')}
                  selected={activeMenu === 'documents'}
                  sx={{
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.lighter',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    <FileText size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Documents" />
                </ListItemButton>

                <ListItemButton
                  onClick={() => handleMobileMenuClick('settings')}
                  selected={activeMenu === 'settings'}
                  sx={{
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.lighter',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    <SettingsIcon size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />

                <ListItemButton
                  onClick={onSignOut}
                  sx={{
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: 'error.lighter',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    <LogOut size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </ListItemButton>
              </List>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </>
  );
}