import { Bell } from 'lucide-react';
import { useState } from 'react';

export function NotificationDropdown() {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      message: 'Shipment AMRV-2024-001 is now in transit',
      time: '2 hours ago',
    },
    {
      id: 2,
      message: 'Customs clearance completed for AMRV-2024-004',
      time: '5 hours ago',
    },
    {
      id: 3,
      message: 'Shipment AMRV-2024-002 has been delivered',
      time: '1 day ago',
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
              >
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-gray-200 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
