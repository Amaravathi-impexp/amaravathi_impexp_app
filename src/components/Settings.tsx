import { User, Mail, Phone, Smartphone, Shield, Globe, Package, Bell, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateUser as updateUserAction } from '../store/slices/authSlice';
import { mockApi } from '../services/mock-api';

export function Settings() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cell: '',
    role: '',
    originCountry: '',
    destinationCountry: '',
    product: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });

  // Load user data from Redux
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '+1-555-0000',
        cell: currentUser.cell || '+1-555-0001',
        role: currentUser.role || '',
        originCountry: (currentUser as any).originCountry || '',
        destinationCountry: (currentUser as any).destinationCountry || '',
        product: (currentUser as any).product || '',
        notifications: {
          email: currentUser.notifications?.email ?? true,
          sms: currentUser.notifications?.sms ?? false,
          push: currentUser.notifications?.push ?? true,
        },
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentUser) {
      try {
        // Call the update API
        const updatedUser = await mockApi.auth.updateCurrentUser(currentUser.id, {
          role: formData.role,
          originCountry: formData.originCountry,
          destinationCountry: formData.destinationCountry,
          product: formData.product,
          notifications: formData.notifications,
        });
        
        // Update Redux store with the response
        dispatch(updateUserAction(updatedUser));
        
        alert('Settings updated successfully!');
      } catch (error) {
        console.error('Failed to update settings:', error);
        alert('Failed to update settings. Please try again.');
      }
    }
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
          { label: 'Settings' },
        ]}
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 max-w-5xl">
        {/* Personal Information Card - Non-Editable */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg">Personal Information</h2>
              <p className="text-sm text-gray-600">Your basic account details (non-editable)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                Full Name
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  disabled
                  readOnly
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Email Address
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  disabled
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Role & Permissions Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg">Role & Permissions</h2>
              <p className="text-sm text-gray-600">Update your user role</p>
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
                <option value="Importer">Importer</option>
                <option value="Exporter">Exporter</option>
              </select>
            </div>
          </div>

          {/* Role Description */}
          {formData.role && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Role Permissions:</span>
                {formData.role === 'Importer' && ' Can create import shipments and track deliveries.'}
                {formData.role === 'Exporter' && ' Can create export shipments and upload documentation.'}
              </p>
            </div>
          )}
        </div>

        {/* Route Information Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Globe className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h2 className="text-lg">Route Information</h2>
              <p className="text-sm text-gray-600">Specify origin and destination countries</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Origin Country */}
            <div>
              <label htmlFor="originCountry" className="block text-sm text-gray-700 mb-2">
                Origin Country <span className="text-red-500">*</span>
              </label>
              <select
                id="originCountry"
                name="originCountry"
                value={formData.originCountry}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select origin country</option>
                <option value="India">India</option>
                <option value="China">China</option>
                <option value="USA">United States</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="Singapore">Singapore</option>
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                <option value="Thailand">Thailand</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Germany">Germany</option>
                <option value="UK">United Kingdom</option>
                <option value="France">France</option>
                <option value="Netherlands">Netherlands</option>
              </select>
            </div>

            {/* Destination Country */}
            <div>
              <label htmlFor="destinationCountry" className="block text-sm text-gray-700 mb-2">
                Destination Country <span className="text-red-500">*</span>
              </label>
              <select
                id="destinationCountry"
                name="destinationCountry"
                value={formData.destinationCountry}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select destination country</option>
                <option value="India">India</option>
                <option value="China">China</option>
                <option value="USA">United States</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="Singapore">Singapore</option>
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                <option value="Thailand">Thailand</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Germany">Germany</option>
                <option value="UK">United Kingdom</option>
                <option value="France">France</option>
                <option value="Netherlands">Netherlands</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Information Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg">Product Information</h2>
              <p className="text-sm text-gray-600">Select the product type</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label htmlFor="product" className="block text-sm text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <select
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a product</option>
                <option value="Rice">Rice</option>
                <option value="Turmeric">Turmeric</option>
                <option value="Chillies">Chillies</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Preferences Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg">Notification Preferences</h2>
              <p className="text-sm text-gray-600">Choose how you receive updates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email Notifications */}
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
                 onClick={() => handleCheckboxChange({ target: { name: 'email', checked: !formData.notifications.email } } as any)}>
              <input
                type="checkbox"
                id="email-notif"
                name="email"
                checked={formData.notifications.email}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <label htmlFor="email-notif" className="text-sm cursor-pointer">
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
                id="sms-notif"
                name="sms"
                checked={formData.notifications.sms}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <label htmlFor="sms-notif" className="text-sm cursor-pointer">
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
                id="push-notif"
                name="push"
                checked={formData.notifications.push}
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <label htmlFor="push-notif" className="text-sm cursor-pointer">
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

        {/* Action Button at Bottom */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}