import {
  Search,
  Menu,
  X,
  LayoutDashboard,
  Ship,
  Users,
  BarChart3,
  Folder,
  DollarSign,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';
import { Logo } from './Logo';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileMenu } from './ProfileMenu';
import { TopRibbon } from './TopRibbon';

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showMobileMenu: boolean;
  onToggleMobileMenu: () => void;
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  onSignOut: () => void;
}

export function DashboardHeader({
  searchQuery,
  onSearchChange,
  showMobileMenu,
  onToggleMobileMenu,
  activeMenu,
  onMenuChange,
  onSignOut,
}: DashboardHeaderProps) {
  const handleMobileMenuClick = (menu: string) => {
    onMenuChange(menu);
    onToggleMobileMenu();
  };

  return (
    <>
      <TopRibbon />
      <header className="bg-white border-b border-gray-200 fixed top-10 left-0 right-0 z-50 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={onSignOut}
                className="hover:opacity-80 transition-opacity"
              >
                <Logo className="h-14" />
              </button>
            </div>

            {/* Right Side - Search, Notifications and Profile */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search shipments..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>

              {/* Notifications */}
              <NotificationDropdown />

              {/* Profile */}
              <ProfileMenu onSignOut={onSignOut} />

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={onToggleMobileMenu}
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white">
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => handleMobileMenuClick('dashboard')}
                  className={`text-left px-4 py-2 rounded ${
                    activeMenu === 'dashboard'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </div>
                </button>
                <button
                  onClick={() => handleMobileMenuClick('shipments')}
                  className={`text-left px-4 py-2 rounded ${
                    activeMenu === 'shipments'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Ship className="w-5 h-5" />
                    <span>Shipments</span>
                  </div>
                </button>
                <button
                  onClick={() => handleMobileMenuClick('partner-directory')}
                  className={`text-left px-4 py-2 rounded ${
                    activeMenu === 'partner-directory'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    <span>Partner Directory</span>
                  </div>
                </button>
                <button
                  onClick={() => handleMobileMenuClick('analytics')}
                  className={`text-left px-4 py-2 rounded ${
                    activeMenu === 'analytics'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5" />
                    <span>Analytics</span>
                  </div>
                </button>
                <button
                  onClick={() => handleMobileMenuClick('documents')}
                  className={`text-left px-4 py-2 rounded ${
                    activeMenu === 'documents'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Folder className="w-5 h-5" />
                    <span>Documents</span>
                  </div>
                </button>
                <button
                  onClick={() => handleMobileMenuClick('payments')}
                  className={`text-left px-4 py-2 rounded ${
                    activeMenu === 'payments'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5" />
                    <span>Payments & Invoicing</span>
                  </div>
                </button>
                <button
                  onClick={() => handleMobileMenuClick('settings')}
                  className={`text-left px-4 py-2 rounded ${
                    activeMenu === 'settings'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <SettingsIcon className="w-5 h-5" />
                    <span>Settings</span>
                  </div>
                </button>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={onSignOut}
                    className="text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded w-full"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </div>
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}