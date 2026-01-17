import { User, Mail, Phone, Smartphone, Shield, Globe, Package, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Breadcrumb } from '../../components/Breadcrumb';
import { useAppSelector } from '../../store/hooks';

export function Profile() {
  const currentUser = useAppSelector((state) => state.auth.user);

  // Helper function to format roles for display
  const getRolesDisplay = () => {
    if (!currentUser?.roles || currentUser.roles.length === 0) return 'Not provided';
    return currentUser.roles.map(role => role.name).join(', ');
  };

  // Helper function to get primary role
  const getPrimaryRole = () => {
    if (!currentUser?.roles || currentUser.roles.length === 0) return 'Not provided';
    return currentUser.roles[0].name;
  };

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
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: '#1A3D32' }}>
              <User className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl mb-1">{currentUser?.fullName || 'User'}</h2>
              <p className="text-gray-600">{getPrimaryRole()}</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <User className="w-5 h-5" style={{ color: '#1A3D32' }} />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <p className="text-gray-900">{currentUser?.fullName || 'Not provided'}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900">{currentUser?.email || 'Not provided'}</p>
                  {currentUser?.emailVerified && (
                    <CheckCircle className="w-4 h-4 text-green-600" title="Email Verified" />
                  )}
                  {currentUser && !currentUser.emailVerified && (
                    <XCircle className="w-4 h-4 text-gray-400" title="Email Not Verified" />
                  )}
                </div>
              </div>

              {/* Role(s) */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Role(s)
                </label>
                <p className="text-gray-900">{getRolesDisplay()}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900">{currentUser?.phone || 'Not provided'}</p>
                  {currentUser?.phoneVerified && (
                    <CheckCircle className="w-4 h-4 text-green-600" title="Phone Verified" />
                  )}
                  {currentUser && !currentUser.phoneVerified && (
                    <XCircle className="w-4 h-4 text-gray-400" title="Phone Not Verified" />
                  )}
                </div>
              </div>

              {/* Account Status */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Account Status
                </label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  currentUser?.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800'
                    : currentUser?.status === 'PENDING_VERIFICATION'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {currentUser?.status === 'ACTIVE' && 'Active'}
                  {currentUser?.status === 'PENDING_VERIFICATION' && 'Pending Verification'}
                  {currentUser?.status === 'INACTIVE' && 'Inactive'}
                  {!currentUser?.status && 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          {/* Business Information Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" style={{ color: '#1A3D32' }} />
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Origin Country */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Origin Country
                </label>
                <p className="text-gray-900">{currentUser?.originCountry?.name || 'Not provided'}</p>
                {currentUser?.originCountry?.currency && (
                  <p className="text-sm text-gray-600">Currency: {currentUser.originCountry.currency}</p>
                )}
              </div>

              {/* Destination Country */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Destination Country
                </label>
                <p className="text-gray-900">{currentUser?.destinationCountry?.name || 'Not provided'}</p>
                {currentUser?.destinationCountry?.currency && (
                  <p className="text-sm text-gray-600">Currency: {currentUser.destinationCountry.currency}</p>
                )}
              </div>

              {/* Product Type */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <Package className="w-4 h-4 inline mr-2" />
                  Product Type
                </label>
                <p className="text-gray-900">{currentUser?.productType?.name || 'Not provided'}</p>
                {currentUser?.productType?.category && (
                  <p className="text-sm text-gray-600">Category: {currentUser.productType.category}</p>
                )}
                {currentUser?.productType?.hsCode && (
                  <p className="text-sm text-gray-600">HS Code: {currentUser.productType.hsCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" style={{ color: '#1A3D32' }} />
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
              <Mail className="w-5 h-5" style={{ color: '#1A3D32' }} />
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
          <div className="rounded-lg p-4 flex items-start gap-3" style={{ backgroundColor: '#f0f7ed', border: '1px solid #d4edda' }}>
            <Shield className="w-5 h-5 mt-0.5" style={{ color: '#1A3D32' }} />
            <div>
              <p className="text-sm" style={{ color: '#2D5A4A' }}>
                This is your profile information in read-only mode. To edit your details, please visit the Settings page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
