import { useState } from 'react';
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
import { useAppSelector } from '../store/hooks';

interface MainLayoutProps {
  onSignOut: () => void;
}

export function MainLayout({ onSignOut }: MainLayoutProps) {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [activeSection, setActiveSection] = useState<'overview' | 'shipments' | 'users' | 'partners' | 'settings' | 'profile' | 'payments' | 'analytics' | 'documents' | 'roles' | 'upload-documents'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminExpanded, setAdminExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isAdmin = currentUser?.role === 'Admin';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Fixed and Full Width */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showMobileMenu={showMobileMenu}
        onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
        activeMenu={activeSection}
        onMenuChange={setActiveSection}
        onSignOut={onSignOut}
      />

      {/* Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col pt-[120px] transition-all duration-300 ${sidebarOpen ? "lg:pl-64" : "lg:pl-20"}`}
      >
        {/* Body Area - Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
          {activeSection === "overview" && <Dashboard />}
          {activeSection === "shipments" && <Shipments />}
          {activeSection === "partners" && <PartnerDirectory />}
          {activeSection === "users" && <UsersComponent />}
          {activeSection === "roles" && <Roles />}
          {activeSection === "payments" && <PaymentsInvoicing />}
          {activeSection === "analytics" && <Analytics />}
          {activeSection === "documents" && (
            <Documents
              onNavigateToUpload={() => setActiveSection("upload-documents")}
            />
          )}
          {activeSection === "upload-documents" && <UploadDocuments />}
          {activeSection === "settings" && <SettingsComponent />}
          {activeSection === "profile" && <ProfileComponent />}
        </main>

        {/* Footer - Adjusts with sidebar */}
        <div className="mt-auto">
          <SimpleFooter />
        </div>
      </div>

      {/* Left Sidebar */}
      <LeftMenu
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isAdmin={isAdmin}
        adminExpanded={adminExpanded}
        onAdminToggle={() => setAdminExpanded(!adminExpanded)}
      />
    </div>
  );
}