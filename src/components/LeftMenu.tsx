import { 
  LayoutDashboard, 
  Ship, 
  BarChart3, 
  Folder, 
  Users as UsersIcon, 
  DollarSign,
  Shield,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  GraduationCap,
  Home as HomeIcon,
  FileCheck,
  UserCheck,
  Settings as SettingsIcon
} from 'lucide-react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/selectors/authSelectors';
import { hasPermission } from '../utils/roleUtils';
import { Permission } from '../utils/permissions';

interface LeftMenuProps {
  activeSection: string;
  onSectionChange: (section: any) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  isAdmin: boolean;
  adminExpanded: boolean;
  onAdminToggle: () => void;
}

export function LeftMenu({
  activeSection,
  onSectionChange,
  sidebarOpen,
  onToggleSidebar,
  isAdmin,
  adminExpanded,
  onAdminToggle,
}: LeftMenuProps) {
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
  const canViewSettings = hasPermission(currentUser, Permission.VIEW_SETTINGS);

  return (
    <Box
      component="aside"
      sx={{
        width: sidebarOpen ? 256 : 80,
        bgcolor: 'white',
        borderRight: 1,
        borderColor: 'divider',
        position: 'fixed',
        left: 0,
        top: '96px', // Header height (96px)
        bottom: 0,
        transition: 'width 0.3s',
        zIndex: 40,
        display: { xs: 'none', lg: 'block' },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Sidebar Content */}
        <Box component="nav" sx={{ flexGrow: 1, px: 1.5, py: 2 }}>
          <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Home */}
            <ListItemButton
              onClick={() => onSectionChange("home")}
              selected={activeSection === "home"}
              sx={{
                borderRadius: 2,
                gap: 1.5,
                px: 1.5,
                py: 0.75,
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                '&.Mui-selected': {
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                  },
                },
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                <HomeIcon size={20} />
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary="Home" primaryTypographyProps={{ variant: 'body2' }} />}
            </ListItemButton>

            {/* Dashboard */}
            {canViewDashboard && (
              <ListItemButton
                onClick={() => onSectionChange("overview")}
                selected={activeSection === "overview"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <LayoutDashboard size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Dashboard" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}

            {/* Shipments */}
            {canViewShipments && (
              <ListItemButton
                onClick={() => onSectionChange("shipments")}
                selected={activeSection === "shipments"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <Ship size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Shipments" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}

            {/* Analytics - Admin Only */}
            {canViewAnalytics && (
              <ListItemButton
                onClick={() => onSectionChange("analytics")}
                selected={activeSection === "analytics"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <BarChart3 size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Analytics" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}

            {/* Documents */}
            {canViewDocuments && (
              <ListItemButton
                onClick={() => onSectionChange("documents")}
                selected={activeSection === "documents"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <Folder size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Documents" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}

            {/* Partner Directory */}
            {canViewPartners && (
              <ListItemButton
                onClick={() => onSectionChange("partners")}
                selected={activeSection === "partners"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <UsersIcon size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Partner Directory" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}

            {/* Payments Invoicing */}
            {canViewPayments && (
              <ListItemButton
                onClick={() => onSectionChange("payments")}
                selected={activeSection === "payments"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <DollarSign size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Payments Invoicing" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}

            {/* My Trainings - For ROLE_TRADER */}
            {canViewMyTrainings && (
              <ListItemButton
                onClick={() => onSectionChange("my-trainings")}
                selected={activeSection === "my-trainings"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <Calendar size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="My Trainings" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}

            {/* Trainings - For ROLE_ADMIN and ROLE_SUPER_USER */}
            {canManageAllTrainings && (
              <ListItemButton
                onClick={() => onSectionChange("trainings")}
                selected={activeSection === "trainings"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <GraduationCap size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Trainings" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}

            {/* Licensing Requirements - For ROLE_SUPER_USER and ROLE_TRADER */}
            {canViewLicensing && (
              <ListItemButton
                onClick={() => onSectionChange("licensing-requirements")}
                selected={activeSection === "licensing-requirements"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <FileCheck size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Licensing Requirements" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}

            {/* Profile Verification - For ROLE_SUPER_USER and ROLE_TRADER */}
            {canViewProfileVerification && (
              <ListItemButton
                onClick={() => onSectionChange("profile-verification")}
                selected={activeSection === "profile-verification"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <UserCheck size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Profile Verification" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}

            {/* Admin - with submenu - Admin Only */}
            {(canViewUsers || canViewRoles) && (
              <Box>
                <ListItemButton
                  onClick={() => {
                    onAdminToggle();
                    if (!sidebarOpen) {
                      onToggleSidebar();
                    }
                  }}
                  selected={activeSection === "users" || activeSection === "roles"}
                  sx={{
                    borderRadius: 2,
                    gap: 1.5,
                    px: 1.5,
                    py: 0.75,
                    justifyContent: sidebarOpen ? 'space-between' : 'center',
                    '&.Mui-selected': {
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.lighter',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                      <Shield size={20} />
                    </ListItemIcon>
                    {sidebarOpen && <ListItemText primary="Admin" primaryTypographyProps={{ variant: 'body2' }} />}
                  </Box>
                  {sidebarOpen && (
                    <ChevronDown
                      size={16}
                      style={{
                        transition: 'transform 0.2s',
                        transform: adminExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  )}
                </ListItemButton>

                {/* Submenu */}
                <Collapse in={adminExpanded && sidebarOpen} timeout="auto" unmountOnExit>
                  <List disablePadding sx={{ ml: 4, mt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {canViewUsers && (
                      <ListItemButton
                        onClick={() => onSectionChange("users")}
                        selected={activeSection === "users"}
                        sx={{
                          borderRadius: 2,
                          gap: 1.5,
                          px: 1.5,
                          py: 1,
                          '&.Mui-selected': {
                            bgcolor: 'primary.lighter',
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.lighter',
                            },
                          },
                          '&:hover': {
                            bgcolor: 'grey.100',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                          <UsersIcon size={16} />
                        </ListItemIcon>
                        <ListItemText primary="Users" primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItemButton>
                    )}

                    {canViewRoles && (
                      <ListItemButton
                        onClick={() => onSectionChange("roles")}
                        selected={activeSection === "roles"}
                        sx={{
                          borderRadius: 2,
                          gap: 1.5,
                          px: 1.5,
                          py: 1,
                          '&.Mui-selected': {
                            bgcolor: 'primary.lighter',
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.lighter',
                            },
                          },
                          '&:hover': {
                            bgcolor: 'grey.100',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                          <Shield size={16} />
                        </ListItemIcon>
                        <ListItemText primary="Roles" primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItemButton>
                    )}
                  </List>
                </Collapse>
              </Box>
            )}

            {/* Settings */}
            {canViewSettings && (
              <ListItemButton
                onClick={() => onSectionChange("settings")}
                selected={activeSection === "settings"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 0.75,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
                  <SettingsIcon size={20} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'body2' }} />}
              </ListItemButton>
            )}
          </List>
        </Box>

        {/* Collapse/Expand Button */}
        <Box sx={{ p: 1.5, borderTop: 1, borderColor: 'divider' }}>
          <ListItemButton
            onClick={onToggleSidebar}
            sx={{
              borderRadius: 2,
              gap: 1,
              px: 1.5,
              py: 1,
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            {!sidebarOpen ? (
              <ChevronRight size={20} />
            ) : (
              <>
                <ChevronLeft size={20} />
                <Typography variant="body2">Collapse</Typography>
              </>
            )}
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );
}