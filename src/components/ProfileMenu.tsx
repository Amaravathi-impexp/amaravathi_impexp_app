import { User, Package, Bell, LogOut } from 'lucide-react';
import { useState } from 'react';

interface ProfileMenuProps {
  onSignOut: () => void;
}

export function ProfileMenu({ onSignOut }: ProfileMenuProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 pr-3 transition-colors"
      >
        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white">
          <User className="w-5 h-5" />
        </div>
        <span className="hidden md:block text-sm">John Doe</span>
      </button>

      {/* Profile Dropdown */}
      {showProfileMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
          </div>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
            <User className="w-4 h-4" />
            My Profile
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
            <Package className="w-4 h-4" />
            My Shipments
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
            <Bell className="w-4 h-4" />
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
