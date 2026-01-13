import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';
import { SimpleFooter } from './SimpleFooter';
import { LeftMenu } from './LeftMenu';
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
import { useAppSelector } from '../store/hooks';
import { selectIsAdmin, selectCurrentUser } from '../store/selectors/authSelectors';

interface MainLayoutProps {
  onSignOut: () => void;
}

export function MainLayout({ onSignOut }: MainLayoutProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const isAdmin = useAppSelector(selectIsAdmin);
  
  const [activeSection, setActiveSection] = useState<'overview' | 'shipments' | 'users' | 'partners' | 'settings' | 'profile' | 'payments' | 'analytics' | 'documents' | 'roles' | 'upload-documents' | 'training'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminExpanded, setAdminExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Redirect based on user status
  // CREATED status: Incomplete profile → Settings page
  // ACTIVE status: Complete profile → Dashboard overview
  useEffect(() => {
    if (currentUser?.status === 'CREATED') {
      // New user with incomplete profile - redirect to Settings
      setActiveSection('settings');
    } else if (currentUser?.status === 'ACTIVE') {
      // Active user with complete profile - ensure on Dashboard
      setActiveSection('overview');
    }
  }, [currentUser?.status]);

  // Handle section change with access control
  const handleSectionChange = (section: any) => {
    // Check if the section requires admin access
    const adminOnlySections = ['users', 'roles', 'analytics'];
    
    if (adminOnlySections.includes(section) && !isAdmin) {
      // Don't allow non-admin users to access admin sections
      alert('Access denied. This section is only available to administrators.');
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
        onLogoClick={() => handleSectionChange('overview')}
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
          {activeSection === "overview" && <Dashboard />}
          {activeSection === "shipments" && <Shipments />}
          {activeSection === "partners" && <PartnerDirectory />}
          
          {/* Admin-only sections */}
          {activeSection === "users" && isAdmin && <UsersComponent />}
          {activeSection === "roles" && isAdmin && <Roles />}
          {activeSection === "analytics" && isAdmin && <Analytics />}
          
          {activeSection === "payments" && <PaymentsInvoicing />}
          {activeSection === "documents" && (
            <Documents
              onNavigateToUpload={() => setActiveSection("upload-documents")}
            />
          )}
          {activeSection === "upload-documents" && <UploadDocuments />}
          {activeSection === "settings" && <SettingsComponent />}
          {activeSection === "profile" && <ProfileComponent />}
          {activeSection === "training" && <TrainingSchedule />}
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
    </Box>
  );
}