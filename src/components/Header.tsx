import { Search, Bell, Menu, X, LayoutDashboard, Ship, Users, BarChart3, FileText, Settings as SettingsIcon, User, LogOut, Home as HomeIcon, DollarSign, Shield, Calendar, GraduationCap, FileCheck, UserCheck } from 'lucide-react';
import { Box, TextField, InputAdornment, IconButton, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useState } from 'react';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileMenu } from './ProfileMenu';
import { Logo } from './Logo';
import { useAppSelector } from '../store/hooks';
import { selectIsAdmin, selectCurrentUser } from '../store/selectors/authSelectors';
import { hasPermission } from '../utils/roleUtils';
import { Permission } from '../utils/permissions';

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
  // Check if user is admin and get current user for permissions
  const isAdmin = useAppSelector(selectIsAdmin);
  const currentUser = useAppSelector(selectCurrentUser);
  
  // Check permissions
  const canViewDashboard = hasPermission(currentUser, Permission.VIEW_DASHBOARD);
  const canViewShipments = hasPermission(currentUser, Permission.VIEW_SHIPMENTS);
  const canViewAnalytics = hasPermission(currentUser, Permission.VIEW_ANALYTICS);
  const canViewDocuments = hasPermission(currentUser, Permission.VIEW_DOCUMENTS);
  const canViewPartners = hasPermission(currentUser, Permission.VIEW_PARTNERS);
  const canViewPayments = hasPermission(currentUser, Permission.VIEW_PAYMENTS);
  const canViewMyTrainings = hasPermission(currentUser, Permission.VIEW_MY_TRAININGS);
  const canManageAllTrainings = hasPermission(currentUser, Permission.MANAGE_ALL_TRAININGS);
  const canViewLicensing = hasPermission(currentUser, Permission.VIEW_LICENSING);
  const canViewProfileVerification = hasPermission(currentUser, Permission.VIEW_PROFILE_VERIFICATION);
  const canViewUsers = hasPermission(currentUser, Permission.VIEW_USERS);
  const canViewRoles = hasPermission(currentUser, Permission.VIEW_ROLES);
  
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

          {/* Mobile Menu - Now with RBAC permissions */}
          <Collapse in={showMobileMenu}>
            <Box sx={{ display: { md: 'none' }, py: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'white' }}>
              <List component="nav" disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {/* Home - Always visible */}
                <ListItemButton
                  onClick={() => handleMobileMenuClick('home')}
                  selected={activeMenu === 'home'}
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
                    <HomeIcon size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>

                {/* Dashboard - Permission required */}
                {canViewDashboard && (
                  <ListItemButton
                    onClick={() => handleMobileMenuClick('overview')}
                    selected={activeMenu === 'overview'}
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
                )}

                {/* Shipments - Permission required */}
                {canViewShipments && (
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
                )}

                {/* Partner Directory - Permission required */}
                {canViewPartners && (
                  <ListItemButton
                    onClick={() => handleMobileMenuClick('partners')}
                    selected={activeMenu === 'partners'}
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
                )}

                {/* Analytics - Permission required */}
                {canViewAnalytics && (
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
                )}

                {/* Documents - Permission required */}
                {canViewDocuments && (
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
                )}

                {/* Payments & Invoicing - Permission required */}
                {canViewPayments && (
                  <ListItemButton
                    onClick={() => handleMobileMenuClick('payments')}
                    selected={activeMenu === 'payments'}
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
                      <DollarSign size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Payments" />
                  </ListItemButton>
                )}

                {/* Training Schedule - Permission required */}
                {canViewMyTrainings && (
                  <ListItemButton
                    onClick={() => handleMobileMenuClick('my-trainings')}
                    selected={activeMenu === 'my-trainings'}
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
                      <Calendar size={20} />
                    </ListItemIcon>
                    <ListItemText primary="My Training Schedule" />
                  </ListItemButton>
                )}

                {/* Licensing Requirements - Permission required */}
                {canViewLicensing && (
                  <ListItemButton
                    onClick={() => handleMobileMenuClick('licensing-requirements')}
                    selected={activeMenu === 'licensing-requirements'}
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
                      <FileCheck size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Licensing Requirements" />
                  </ListItemButton>
                )}

                {/* Profile Verification - Permission required */}
                {canViewProfileVerification && (
                  <ListItemButton
                    onClick={() => handleMobileMenuClick('profile-verification')}
                    selected={activeMenu === 'profile-verification'}
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
                      <UserCheck size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Profile Verification" />
                  </ListItemButton>
                )}

                {/* Admin Section - Only for users with admin permissions */}
                {(canViewUsers || canViewRoles || canManageAllTrainings) && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    
                    {/* Admin Training Management - Permission required */}
                    {canManageAllTrainings && (
                      <ListItemButton
                        onClick={() => handleMobileMenuClick('trainings')}
                        selected={activeMenu === 'trainings'}
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
                          <GraduationCap size={20} />
                        </ListItemIcon>
                        <ListItemText primary="Training Management" />
                      </ListItemButton>
                    )}

                    {/* Users - Permission required */}
                    {canViewUsers && (
                      <ListItemButton
                        onClick={() => handleMobileMenuClick('users')}
                        selected={activeMenu === 'users'}
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
                        <ListItemText primary="Users" />
                      </ListItemButton>
                    )}

                    {/* Roles - Permission required */}
                    {canViewRoles && (
                      <ListItemButton
                        onClick={() => handleMobileMenuClick('roles')}
                        selected={activeMenu === 'roles'}
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
                          <Shield size={20} />
                        </ListItemIcon>
                        <ListItemText primary="Roles" />
                      </ListItemButton>
                    )}
                  </>
                )}

                <Divider sx={{ my: 1 }} />

                {/* Settings - Always visible */}
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