import { Package, TrendingUp, Clock, MapPin, Bell, User, LogOut, Search, Ship, Truck, CheckCircle, AlertCircle, Menu, X, FileText, DollarSign, AlertTriangle, Upload, Navigation, ChevronLeft, ChevronRight, LayoutDashboard, BarChart3, Folder, Users, Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { SimpleFooter } from './SimpleFooter';
import { Shipments } from './Shipments';
import { PartnerDirectory } from './PartnerDirectory';
import { Settings } from './Settings';
import { PaymentsInvoicing } from './PaymentsInvoicing';
import { Analytics } from './Analytics';
import { Documents } from './Documents';

interface DashboardProps {
  onSignOut: () => void;
}

const recentShipments = [
  {
    id: 'AMRV-2024-001',
    status: 'In Transit',
    origin: 'Mumbai, India',
    destination: 'New York, USA',
    eta: 'Dec 28, 2024',
    progress: 65,
    icon: Ship,
  },
  {
    id: 'AMRV-2024-002',
    status: 'Delivered',
    origin: 'Dubai, UAE',
    destination: 'London, UK',
    eta: 'Dec 20, 2024',
    progress: 100,
    icon: CheckCircle,
  },
  {
    id: 'AMRV-2024-003',
    status: 'Pending Pickup',
    origin: 'Singapore',
    destination: 'Sydney, Australia',
    eta: 'Dec 30, 2024',
    progress: 20,
    icon: Clock,
  },
  {
    id: 'AMRV-2024-004',
    status: 'Customs Clearance',
    origin: 'Shanghai, China',
    destination: 'Los Angeles, USA',
    eta: 'Dec 25, 2024',
    progress: 45,
    icon: AlertCircle,
  },
];

const stats = [
  { label: 'Shipments in Progress', value: '12', change: '+3', icon: Ship, color: 'blue' },
  { label: 'Pending Docs', value: '8', change: '+2', icon: FileText, color: 'orange' },
  { label: 'Payments Due', value: '5', change: '-1', icon: DollarSign, color: 'green' },
  { label: 'Alerts', value: '3', change: '+1', icon: AlertTriangle, color: 'red' },
];

export function Dashboard({ onSignOut }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Pending Pickup':
        return 'bg-yellow-100 text-yellow-800';
      case 'Customs Clearance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed and Full Width */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={onSignOut} className="hover:opacity-80 transition-opacity">
                <Logo className="h-12" />
              </button>
            </div>

            {/* Right Side - Notifications and Profile */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search shipments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>

              {/* Notifications */}
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
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm">Shipment AMRV-2024-001 is now in transit</p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm">Customs clearance completed for AMRV-2024-004</p>
                        <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm">Shipment AMRV-2024-002 has been delivered</p>
                        <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
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
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
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

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                <button className="text-left px-4 py-2 text-blue-600 bg-blue-50 rounded">Dashboard</button>
                <button className="text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">Shipments</button>
                <button className="text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">Analytics</button>
                <button className="text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">Documents</button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Wrapper */}
      <div className={`flex-1 flex flex-col pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {activeMenu === 'dashboard' && (
            <>
              {/* KPI Cards - Single Row */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const colorClasses = {
                      blue: 'bg-blue-100 text-blue-600',
                      green: 'bg-green-100 text-green-600',
                      orange: 'bg-orange-100 text-orange-600',
                      red: 'bg-red-100 text-red-600',
                    }[stat.color];

                    return (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 ${colorClasses} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change}
                          </span>
                        </div>
                        <div className="text-3xl mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Faster Workflows, Risk Visibility, and Context - Single Row */}
              <div className="mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Quick Actions */}
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <h2 className="text-lg">Faster Workflows</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
                      <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm mb-0.5">New Shipment</h3>
                          <p className="text-xs text-gray-600">Book and schedule instantly</p>
                        </div>
                      </a>

                      <div className="border-t border-gray-200 my-3"></div>

                      <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <Upload className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-sm mb-0.5">Upload Documents</h3>
                          <p className="text-xs text-gray-600">Invoices, packing lists, customs docs</p>
                        </div>
                      </a>

                      <div className="border-t border-gray-200 my-3"></div>

                      <a href="#" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <Navigation className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-sm mb-0.5">Track Cargo</h3>
                          <p className="text-xs text-gray-600">Real-time tracking and updates</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Alerts Panel */}
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <h2 className="text-lg">Risk Visibility</h2>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        {/* Customs Issue Alert */}
                        <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <AlertCircle className="w-5 h-5 text-red-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-sm mb-1 text-red-900">Customs Issue</h3>
                                <p className="text-xs text-red-700">AMRV-2024-004 requires additional documentation</p>
                                <p className="text-xs text-red-600 mt-1">Shipment: Shanghai → Los Angeles</p>
                              </div>
                              <span className="text-xs text-red-600">2h ago</span>
                            </div>
                          </div>
                        </div>

                        {/* Delay Alert */}
                        <div className="flex gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                              <Clock className="w-5 h-5 text-orange-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-sm mb-1 text-orange-900">Shipment Delay</h3>
                                <p className="text-xs text-orange-700">AMRV-2024-001 delayed due to weather conditions</p>
                                <p className="text-xs text-orange-600 mt-1">New ETA: Dec 30, 2024</p>
                              </div>
                              <span className="text-xs text-orange-600">5h ago</span>
                            </div>
                          </div>
                        </div>

                        {/* Compliance Warning */}
                        <div className="flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-sm mb-1 text-yellow-900">Compliance Warning</h3>
                                <p className="text-xs text-yellow-700">Certificate of Origin expires in 3 days</p>
                                <p className="text-xs text-yellow-600 mt-1">Action required before Dec 24</p>
                              </div>
                              <span className="text-xs text-yellow-600">1d ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-700">View all alerts</a>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <h2 className="text-lg">Context</h2>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        {/* Shipment Activity */}
                        <div className="flex gap-3 pb-4 border-b border-gray-100">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Ship className="w-5 h-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">Shipment <span className="font-medium">AMRV-2024-002</span> delivered successfully</p>
                            <p className="text-xs text-gray-500 mt-1">Dubai → London • 3 hours ago</p>
                          </div>
                        </div>

                        {/* Payment Activity */}
                        <div className="flex gap-3 pb-4 border-b border-gray-100">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">Payment received for <span className="font-medium">INV-2024-156</span></p>
                            <p className="text-xs text-gray-500 mt-1">Amount: $12,450.00 • 5 hours ago</p>
                          </div>
                        </div>

                        {/* Message Activity */}
                        <div className="flex gap-3 pb-4 border-b border-gray-100">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Bell className="w-5 h-5 text-purple-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">New message from <span className="font-medium">Port Authority</span></p>
                            <p className="text-xs text-gray-500 mt-1">Regarding AMRV-2024-003 • 6 hours ago</p>
                          </div>
                        </div>

                        {/* Document Activity */}
                        <div className="flex gap-3 pb-4 border-b border-gray-100">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                              <FileText className="w-5 h-5 text-orange-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">Invoice uploaded for <span className="font-medium">AMRV-2024-005</span></p>
                            <p className="text-xs text-gray-500 mt-1">Invoice #INV-2024-157 • 8 hours ago</p>
                          </div>
                        </div>

                        {/* Shipment Activity 2 */}
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Truck className="w-5 h-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">Shipment <span className="font-medium">AMRV-2024-001</span> departed from port</p>
                            <p className="text-xs text-gray-500 mt-1">Mumbai, India • 12 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-700">View all activity</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMenu === 'shipments' && <Shipments />}
          {activeMenu === 'partner-directory' && <PartnerDirectory />}
          {activeMenu === 'settings' && <Settings />}
          {activeMenu === 'payments-invoicing' && <PaymentsInvoicing />}
          {activeMenu === 'analytics' && <Analytics />}
          {activeMenu === 'documents' && <Documents />}
        </main>

        {/* Footer */}
        <SimpleFooter />
      </div>

      {/* Left Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 transition-all duration-300 z-40 hidden lg:block`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Content */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {/* Dashboard */}
            <button
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                activeMenu === 'dashboard' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </button>

            {/* Shipments */}
            <button
              onClick={() => setActiveMenu('shipments')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                activeMenu === 'shipments' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Ship className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Shipments</span>}
            </button>

            {/* Analytics */}
            <button
              onClick={() => setActiveMenu('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                activeMenu === 'analytics' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Analytics</span>}
            </button>

            {/* Documents */}
            <button
              onClick={() => setActiveMenu('documents')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                activeMenu === 'documents' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Folder className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Documents</span>}
            </button>

            {/* Partner Directory */}
            <button
              onClick={() => setActiveMenu('partner-directory')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                activeMenu === 'partner-directory' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Partner Directory</span>}
            </button>

            {/* Settings */}
            <button
              onClick={() => setActiveMenu('settings')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                activeMenu === 'settings' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SettingsIcon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>

            {/* Payments Invoicing */}
            <button
              onClick={() => setActiveMenu('payments-invoicing')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                activeMenu === 'payments-invoicing' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <DollarSign className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Payments Invoicing</span>}
            </button>
          </nav>

          {/* Collapse/Expand Button */}
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarCollapsed ? (
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
    </div>
  );
}