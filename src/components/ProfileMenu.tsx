import { User, Settings, LogOut, Shield } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser, selectRoleDisplayName } from '../store/selectors/authSelectors';

interface ProfileMenuProps {
  onSignOut: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
}

export function ProfileMenu({ onSignOut, onSettingsClick, onProfileClick }: ProfileMenuProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const roleDisplayName = useAppSelector(selectRoleDisplayName);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 pr-3 transition-colors"
      >
        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white">
          <User className="w-5 h-5" />
        </div>
        <span className="hidden md:block text-sm">{currentUser?.fullName || 'User'}</span>
      </button>

      {/* Profile Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium">{currentUser?.fullName || 'User'}</p>
            <p className="text-xs text-gray-500">{currentUser?.email || 'user@example.com'}</p>
            <div className="flex items-center gap-1 mt-2">
              <Shield className="w-3 h-3 text-blue-600" />
              <p className="text-xs text-blue-600 font-medium">{roleDisplayName}</p>
            </div>
          </div>
          <button
            onClick={() => {
              onProfileClick();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            My Profile
          </button>
          <button 
            onClick={() => {
              onSettingsClick();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <div className="border-t border-gray-200 mt-2 pt-2">
            <button
              onClick={onSignOut}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}