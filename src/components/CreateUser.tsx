import { ArrowLeft, User, Mail, Phone, Smartphone, Shield, Bell, CheckCircle2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';

interface CreateUserProps {
  onBack: () => void;
}

export function CreateUser({ onBack }: CreateUserProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    cell: '',
    department: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User created:', formData);
    // Handle form submission
    onBack();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Settings', onClick: onBack },
          { label: 'Create User' },
        ]}
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 max-w-5xl">
        {/* Personal Information Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg">Personal Information</h2>
              <p className="text-sm text-gray-600">Basic details about the user</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="user@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
            </div>

            {/* Cell */}
            <div>
              <label htmlFor="cell" className="block text-sm text-gray-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="cell"
                  name="cell"
                  value={formData.cell}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Role & Department Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg">Role & Permissions</h2>
              <p className="text-sm text-gray-600">Define user access and department</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm text-gray-700 mb-2">
                User Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Exporter">Exporter</option>
                <option value="Importer">Importer</option>
                <option value="Freight Forwarder">Freight Forwarder</option>
                <option value="Customs Agent">Customs Agent</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm text-gray-700 mb-2">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select department</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Finance">Finance</option>
                <option value="Compliance">Compliance</option>
                <option value="IT">IT</option>
              </select>
            </div>
          </div>

          {/* Role Description */}
          {formData.role && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Role Permissions:</span>
                {formData.role === 'Admin' && ' Full system access with user management capabilities.'}
                {formData.role === 'Manager' && ' Can manage shipments, view reports, and coordinate team activities.'}
                {formData.role === 'Exporter' && ' Can create export shipments and upload documentation.'}
                {formData.role === 'Importer' && ' Can create import shipments and track deliveries.'}
                {formData.role === 'Freight Forwarder' && ' Can manage logistics and coordinate shipments.'}
                {formData.role === 'Customs Agent' && ' Can handle customs clearance and documentation.'}
                {formData.role === 'Viewer' && ' Read-only access to shipment information.'}
              </p>
            </div>
          )}
        </div>

        {/* Notification Preferences Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg">Notification Preferences</h2>
              <p className="text-sm text-gray-600">Choose how the user receives updates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email Notifications */}
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
                 onClick={() => handleCheckboxChange({ target: { name: 'email', checked: !formData.notifications.email } } as any)}>
              <input
                type="checkbox"
                id="email"
                name="email"
                checked={formData.notifications.email}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <label htmlFor="email" className="text-sm cursor-pointer">
                    Email
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Shipment updates & reports
                </p>
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
                 onClick={() => handleCheckboxChange({ target: { name: 'sms', checked: !formData.notifications.sms } } as any)}>
              <input
                type="checkbox"
                id="sms"
                name="sms"
                checked={formData.notifications.sms}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <label htmlFor="sms" className="text-sm cursor-pointer">
                    SMS
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Critical alerts via text
                </p>
              </div>
            </div>

            {/* Push Notifications */}
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
                 onClick={() => handleCheckboxChange({ target: { name: 'push', checked: !formData.notifications.push } } as any)}>
              <input
                type="checkbox"
                id="push"
                name="push"
                checked={formData.notifications.push}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <label htmlFor="push" className="text-sm cursor-pointer">
                    Push
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Real-time in-app updates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons at Bottom */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}