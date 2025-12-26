import { User, Mail, Phone, Smartphone, Shield, Globe, Package, Calendar } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { useAppSelector } from '../store/hooks';

export function Profile() {
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Profile' },
        ]}
      />

      <div className="mt-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl mb-1">{currentUser?.name || 'User'}</h2>
              <p className="text-gray-600">{currentUser?.role || 'Role not specified'}</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <p className="text-gray-900">{currentUser?.name || 'Not provided'}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <p className="text-gray-900">{currentUser?.email || 'Not provided'}</p>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Role
                </label>
                <p className="text-gray-900">{currentUser?.role || 'Not provided'}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <p className="text-gray-900">{currentUser?.phone || 'Not provided'}</p>
              </div>

              {/* Cell */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Smartphone className="w-4 h-4 inline mr-2" />
                  Cell Number
                </label>
                <p className="text-gray-900">{currentUser?.cell || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Business Information Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Origin Country */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Origin Country
                </label>
                <p className="text-gray-900">{currentUser?.originCountry || 'Not provided'}</p>
              </div>

              {/* Destination Country */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Destination Country
                </label>
                <p className="text-gray-900">{currentUser?.destinationCountry || 'Not provided'}</p>
              </div>

              {/* Product */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Package className="w-4 h-4 inline mr-2" />
                  Product
                </label>
                <p className="text-gray-900">{currentUser?.product || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Created At */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Member Since
                </label>
                <p className="text-gray-900">
                  {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Not available'}
                </p>
              </div>

              {/* Updated At */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Last Updated
                </label>
                <p className="text-gray-900">
                  {currentUser?.updatedAt ? new Date(currentUser.updatedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Not available'}
                </p>
              </div>
            </div>
          </div>

          {/* Notification Preferences Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Notification Preferences
            </h3>
            <div className="space-y-4 mb-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  currentUser?.notifications?.email 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {currentUser?.notifications?.email ? 'Enabled' : 'Disabled'}
                </div>
              </div>

              {/* SMS Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via SMS</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  currentUser?.notifications?.sms 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {currentUser?.notifications?.sms ? 'Enabled' : 'Disabled'}
                </div>
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive push notifications</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  currentUser?.notifications?.push 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {currentUser?.notifications?.push ? 'Enabled' : 'Disabled'}
                </div>
              </div>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900">
                This is your profile information in read-only mode. To edit your details, please visit the Settings page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}