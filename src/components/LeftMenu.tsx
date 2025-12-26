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
    <aside
      className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 fixed left-0 top-[120px] bottom-0 transition-all duration-300 z-40 hidden lg:block`}
    >
      <div className="h-full flex flex-col">
        {/* Sidebar Content */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {/* Dashboard */}
          <button
            onClick={() => onSectionChange("overview")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              activeSection === "overview"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>

          {/* Shipments */}
          <button
            onClick={() => onSectionChange("shipments")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              activeSection === "shipments"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Ship className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Shipments</span>}
          </button>

          {/* Analytics - Admin Only */}
          {isAdmin && (
            <button
              onClick={() => onSectionChange("analytics")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                activeSection === "analytics"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>Analytics</span>}
            </button>
          )}

          {/* Documents */}
          <button
            onClick={() => onSectionChange("documents")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              activeSection === "documents"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Folder className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Documents</span>}
          </button>

          {/* Partner Directory */}
          <button
            onClick={() => onSectionChange("partners")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              activeSection === "partners"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <UsersIcon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Partner Directory</span>}
          </button>

          {/* Payments Invoicing */}
          <button
            onClick={() => onSectionChange("payments")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
              activeSection === "payments"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <DollarSign className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Payments Invoicing</span>}
          </button>

          {/* Admin - with submenu - Admin Only */}
          {isAdmin && (
            <div>
              <button
                onClick={() => {
                  onAdminToggle();
                  if (!sidebarOpen) {
                    onToggleSidebar();
                  }
                }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg transition-colors ${
                  activeSection === "users" || activeSection === "roles"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>Admin</span>}
                </div>
                {sidebarOpen && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      adminExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {adminExpanded && sidebarOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <button
                    onClick={() => onSectionChange("users")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                      activeSection === "users"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <UsersIcon className="w-4 h-4 flex-shrink-0" />
                    <span>Users</span>
                  </button>

                  <button
                    onClick={() => onSectionChange("roles")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                      activeSection === "roles"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    <span>Roles</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Collapse/Expand Button */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={onToggleSidebar}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {!sidebarOpen ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}