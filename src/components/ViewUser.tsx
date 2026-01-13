import { ArrowLeft, Mail, Phone, MapPin, Package, CheckCircle, XCircle, Shield } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { useGetUserByIdQuery } from '../store/api/usersApi';
import type { Role } from '../store/api/types';

interface ViewUserProps {
  userId: number;
  onBack: () => void;
}

export function ViewUser({ userId, onBack }: ViewUserProps) {
  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      case 'IMPORTER':
        return 'bg-green-100 text-green-800';
      case 'EXPT':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatRoleName = (role: Role) => {
    const roleCode = role.code.toUpperCase();
    switch (roleCode) {
      case 'ADMIN':
        return 'Admin';
      case 'IMPT':
        return 'Importer';
      case 'EXPT':
        return 'Exporter';
      default:
        return role.name || role.code;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PENDING_VERIFICATION':
        return 'bg-yellow-100 text-yellow-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <div>
        <Breadcrumb
          items={[
            { label: 'Admin' },
            { label: 'Users', onClick: onBack },
            { label: 'View User' },
          ]}
        />
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading user details...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div>
        <Breadcrumb
          items={[
            { label: 'Admin' },
            { label: 'Users', onClick: onBack },
            { label: 'View User' },
          ]}
        />
        <div className="flex items-center justify-center py-12">
          <div className="text-red-500">Error loading user details. Please try again.</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Admin' },
          { label: 'Users', onClick: onBack },
          { label: user.fullName },
        ]}
      />

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm mt-6">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2>User Details</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusColor(user.status)}`}>
              {formatStatus(user.status)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Personal Information */}
            <div>
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-gray-900 mt-1">{user.fullName}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-gray-900">{user.email}</p>
                    {user.emailVerified ? (
                      <CheckCircle className="w-4 h-4 text-green-600" title="Verified" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" title="Not Verified" />
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-gray-900">{user.phone}</p>
                    {user.phoneVerified ? (
                      <CheckCircle className="w-4 h-4 text-green-600" title="Verified" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" title="Not Verified" />
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">User ID</label>
                  <p className="text-gray-900 mt-1 text-sm font-mono">{user.id}</p>
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-600" />
                Business Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Origin Country
                  </label>
                  <p className="text-gray-900 mt-1">
                    {user.originCountry?.name || <span className="text-gray-400">Not specified</span>}
                  </p>
                  {user.originCountry && (
                    <p className="text-sm text-gray-500 mt-1">
                      Currency: {user.originCountry.currency}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Destination Country
                  </label>
                  <p className="text-gray-900 mt-1">
                    {user.destinationCountry?.name || <span className="text-gray-400">Not specified</span>}
                  </p>
                  {user.destinationCountry && (
                    <p className="text-sm text-gray-500 mt-1">
                      Currency: {user.destinationCountry.currency}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-500 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Product Type
                  </label>
                  {user.productType ? (
                    <div className="mt-1">
                      <p className="text-gray-900">{user.productType.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Category: {user.productType.category}
                      </p>
                      <p className="text-sm text-gray-500">
                        HS Code: {user.productType.hsCode}
                      </p>
                      <p className="text-sm text-gray-500">
                        Code: {user.productType.code}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-400 mt-1">Not specified</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Roles Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg mb-4">Roles & Permissions</h3>
            <div className="flex flex-wrap gap-2">
              {user.roles.map((role) => (
                <div
                  key={role.id}
                  className={`px-4 py-2 rounded-lg ${getRoleBadgeColor(role.code)}`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <div>
                      <p className="text-sm">{formatRoleName(role)}</p>
                      <p className="text-xs opacity-75">{role.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Status */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg mb-4">Verification Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm text-gray-500">Email Verification</label>
                <div className="flex items-center gap-2 mt-2">
                  {user.emailVerified ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Not Verified</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm text-gray-500">Phone Verification</label>
                <div className="flex items-center gap-2 mt-2">
                  {user.phoneVerified ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Not Verified</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm text-gray-500">Account Status</label>
                <div className="mt-2">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusColor(user.status)}`}>
                    {formatStatus(user.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}