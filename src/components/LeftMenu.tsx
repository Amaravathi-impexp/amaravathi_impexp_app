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
  ChevronRight
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
        top: '120px',
        bottom: 0,
        transition: 'width 0.3s',
        zIndex: 40,
        display: { xs: 'none', lg: 'block' },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Sidebar Content */}
        <Box component="nav" sx={{ flexGrow: 1, px: 1.5, py: 2 }}>
          <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {/* Dashboard */}
            <ListItemButton
              onClick={() => onSectionChange("overview")}
              selected={activeSection === "overview"}
              sx={{
                borderRadius: 2,
                gap: 1.5,
                px: 1.5,
                py: 1.5,
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

            {/* Shipments */}
            <ListItemButton
              onClick={() => onSectionChange("shipments")}
              selected={activeSection === "shipments"}
              sx={{
                borderRadius: 2,
                gap: 1.5,
                px: 1.5,
                py: 1.5,
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

            {/* Analytics - Admin Only */}
            {isAdmin && (
              <ListItemButton
                onClick={() => onSectionChange("analytics")}
                selected={activeSection === "analytics"}
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  px: 1.5,
                  py: 1.5,
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
            <ListItemButton
              onClick={() => onSectionChange("documents")}
              selected={activeSection === "documents"}
              sx={{
                borderRadius: 2,
                gap: 1.5,
                px: 1.5,
                py: 1.5,
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

            {/* Partner Directory */}
            <ListItemButton
              onClick={() => onSectionChange("partners")}
              selected={activeSection === "partners"}
              sx={{
                borderRadius: 2,
                gap: 1.5,
                px: 1.5,
                py: 1.5,
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

            {/* Payments Invoicing */}
            <ListItemButton
              onClick={() => onSectionChange("payments")}
              selected={activeSection === "payments"}
              sx={{
                borderRadius: 2,
                gap: 1.5,
                px: 1.5,
                py: 1.5,
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

            {/* Admin - with submenu - Admin Only */}
            {isAdmin && (
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
                    py: 1.5,
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
                  </List>
                </Collapse>
              </Box>
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
