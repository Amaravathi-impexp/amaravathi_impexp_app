import { useState, useEffect } from 'react';
import { Box, Alert, Snackbar } from '@mui/material';
import { Header } from '../../components/Header';
import { SimpleFooter } from '../../components/SimpleFooter';
import { LeftMenu } from '../../components/LeftMenu';
import { Home } from './Home';
import { Dashboard } from './Dashboard';
import { Shipments } from './Shipments';
import { Users as UsersComponent } from './Users';
import { PartnerDirectory } from './PartnerDirectory';
import { Settings as SettingsComponent } from './Settings';
import { Profile as ProfileComponent } from './Profile';
import { PaymentsInvoicing } from './PaymentsInvoicing';
import { Analytics } from './Analytics';
import { Documents } from './Documents';
import { Roles } from './Roles';
import { UploadDocuments } from './UploadDocuments';
import { TrainingSchedule } from './TrainingSchedule';
import { AdminTrainings } from './AdminTrainings';
import { LicensingRequirements } from './LicensingRequirements';
import { ProfileVerification } from './ProfileVerification';
import { ProtectedComponent } from '../../components/ProtectedComponent';
import { useAppSelector } from '../../store/hooks';
import { selectIsAdmin, selectCurrentUser } from '../../store/selectors/authSelectors';
import { hasPermission } from '../../utils/roleUtils';
import { Permission } from '../../utils/permissions';

interface MainLayoutProps {
  onSignOut: () => void;
}

export function MainLayout({ onSignOut }: MainLayoutProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const isAdmin = useAppSelector(selectIsAdmin);
  
  const [activeSection, setActiveSection] = useState<'home' | 'overview' | 'shipments' | 'users' | 'partners' | 'settings' | 'profile' | 'payments' | 'analytics' | 'documents' | 'roles' | 'upload-documents' | 'my-trainings' | 'trainings' | 'licensing-requirements' | 'profile-verification'>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminExpanded, setAdminExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [accessDeniedMessage, setAccessDeniedMessage] = useState('');

  // Redirect based on user status
  // CREATED status: Incomplete profile → Settings page (or show on Home with prompt)
  // ACTIVE status: Complete profile → Home page
  useEffect(() => {
    if (currentUser?.status === 'CREATED') {
      // New user with incomplete profile - redirect to Settings
      setActiveSection('settings');
    } else if (currentUser?.status === 'ACTIVE') {
      // Active user with complete profile - show Home
      setActiveSection('home');
    }
  }, [currentUser?.status]);

  // Handle section change with permission-based access control
  const handleSectionChange = (section: any) => {
    // Define permission requirements for each section
    const sectionPermissions: Record<string, Permission> = {
      'users': Permission.VIEW_USERS,
      'roles': Permission.VIEW_ROLES,
      'analytics': Permission.VIEW_ANALYTICS,
    };

    // Check if section requires specific permission
    const requiredPermission = sectionPermissions[section];
    
    if (requiredPermission && !hasPermission(currentUser, requiredPermission)) {
      // Access denied - show message
      setAccessDeniedMessage('Access denied. You do not have permission to view this section.');
      return;
    }
    
    setActiveSection(section);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header - Fixed and Full Width */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showMobileMenu={showMobileMenu}
        onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
        activeMenu={activeSection}
        onMenuChange={handleSectionChange}
        onSignOut={onSignOut}
        onLogoClick={() => handleSectionChange('home')}
      />

      {/* Main Content Wrapper */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          pt: '96px', // Top padding for fixed header (no TopRibbon)
          pl: {
            xs: 0,
            lg: sidebarOpen ? '256px' : '80px',
          },
          transition: 'padding-left 0.3s',
        }}
      >
        {/* Body Area - Main Content */}
        <Box
          component="main"
          sx={{
            maxWidth: '1280px',
            mx: 'auto',
            px: { xs: 2, sm: 3, lg: 4 },
            py: 4,
            width: '100%',
            flexGrow: 1,
          }}
        >
          {activeSection === "home" && <Home />}
          {activeSection === "overview" && <Dashboard />}
          {activeSection === "shipments" && <Shipments />}
          {activeSection === "partners" && <PartnerDirectory />}
          
          {/* Admin-only sections with permission protection */}
          {activeSection === "users" && (
            <ProtectedComponent permission={Permission.VIEW_USERS}>
              <UsersComponent />
            </ProtectedComponent>
          )}
          {activeSection === "roles" && (
            <ProtectedComponent permission={Permission.VIEW_ROLES}>
              <Roles />
            </ProtectedComponent>
          )}
          {activeSection === "analytics" && (
            <ProtectedComponent permission={Permission.VIEW_ANALYTICS}>
              <Analytics />
            </ProtectedComponent>
          )}
          
          {activeSection === "payments" && <PaymentsInvoicing />}
          {activeSection === "documents" && (
            <Documents
              onNavigateToUpload={() => setActiveSection("upload-documents")}
            />
          )}
          {activeSection === "upload-documents" && <UploadDocuments />}
          {activeSection === "settings" && <SettingsComponent />}
          {activeSection === "profile" && <ProfileComponent />}
          
          {/* My Trainings - For ROLE_TRADER */}
          {activeSection === "my-trainings" && (
            <ProtectedComponent permission={Permission.VIEW_MY_TRAININGS}>
              <TrainingSchedule />
            </ProtectedComponent>
          )}
          
          {/* Trainings Management - For ROLE_ADMIN and ROLE_SUPER_USER */}
          {activeSection === "trainings" && (
            <ProtectedComponent permission={Permission.MANAGE_ALL_TRAININGS}>
              <AdminTrainings />
            </ProtectedComponent>
          )}
          
          {/* Licensing Requirements - For ROLE_ADMIN and ROLE_SUPER_USER */}
          {activeSection === "licensing-requirements" && (
            <ProtectedComponent permission={Permission.VIEW_LICENSING}>
              <LicensingRequirements />
            </ProtectedComponent>
          )}
          
          {/* Profile Verification - For ROLE_ADMIN and ROLE_SUPER_USER */}
          {activeSection === "profile-verification" && (
            <ProtectedComponent permission={Permission.VIEW_PROFILE_VERIFICATION}>
              <ProfileVerification />
            </ProtectedComponent>
          )}
        </Box>

        {/* Footer - Adjusts with sidebar */}
        <Box sx={{ mt: 'auto' }}>
          <SimpleFooter />
        </Box>
      </Box>

      {/* Left Sidebar */}
      <LeftMenu
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isAdmin={isAdmin}
        adminExpanded={adminExpanded}
        onAdminToggle={() => setAdminExpanded(!adminExpanded)}
      />

      {/* Access Denied Snackbar */}
      <Snackbar
        open={accessDeniedMessage !== ''}
        autoHideDuration={6000}
        onClose={() => setAccessDeniedMessage('')}
      >
        <Alert
          onClose={() => setAccessDeniedMessage('')}
          severity="error"
          sx={{ width: '100%' }}
        >
          {accessDeniedMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}