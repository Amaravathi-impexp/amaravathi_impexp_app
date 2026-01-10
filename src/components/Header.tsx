import { Search, Bell, Menu, X, LayoutDashboard, Ship, Users, BarChart3, FileText, Settings as SettingsIcon, User, LogOut } from 'lucide-react';
import { TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileMenu } from './ProfileMenu';
import { Logo } from './Logo';
import { TopRibbon } from './TopRibbon';
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
      <TopRibbon />
      <header className="bg-white border-b border-gray-200 fixed top-10 left-0 right-0 z-50 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={onLogoClick}
                className="hover:opacity-80 transition-opacity"
              >
                <Logo className="h-[86px]" />
              </button>
            </div>

            {/* Right Side - Search, Notifications and Profile */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:block">
                <TextField
                  size="small"
                  placeholder="Search shipments..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  sx={{ width: 250 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search className="w-4 h-4 text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              {/* Notifications */}
              <NotificationDropdown />

              {/* Profile */}
              <ProfileMenu 
                onSignOut={onSignOut} 
                onSettingsClick={() => onMenuChange('settings')}
                onProfileClick={() => onMenuChange('profile')}
              />

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
                    <FileText className="w-5 h-5" />
                    <span>Documents</span>
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