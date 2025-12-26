import { Eye, Edit, Plus, Search, Shield } from 'lucide-react';
import { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';

const roles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full system access with all administrative privileges and user management',
    users: 2,
    permissions: ['All Permissions', 'User Management', 'System Settings', 'Analytics', 'Reports'],
    color: 'red',
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Administrative access to manage operations, shipments, and documentation',
    users: 4,
    permissions: ['Shipments', 'Analytics', 'Documents', 'Payments', 'Partner Directory'],
    color: 'blue',
  },
  {
    id: 3,
    name: 'Importer',
    description: 'Access to import operations, shipment tracking, and documentation',
    users: 12,
    permissions: ['Import Shipments', 'Track Cargo', 'Upload Documents', 'View Analytics'],
    color: 'green',
  },
  {
    id: 4,
    name: 'Exporter',
    description: 'Access to export operations, shipment management, and compliance documents',
    users: 15,
    permissions: ['Export Shipments', 'Track Cargo', 'Upload Documents', 'View Analytics'],
    color: 'purple',
  },
];

export function Roles() {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleColor = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'blue':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'green':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'purple':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'gray':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Admin' },
          { label: 'Roles' },
        ]}
      />

      {/* Roles Management */}
      <div className="bg-white rounded-lg shadow-sm mt-6">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2>Role Management</h2>
          <div className="flex items-center gap-2">
            {searchExpanded && (
              <input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                autoFocus
              />
            )}
            <button
              onClick={() => setSearchExpanded(!searchExpanded)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Create Role
            </button>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`border-2 rounded-lg p-6 hover:shadow-md transition-all ${getRoleColor(role.color)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${role.color === 'red' ? 'bg-red-200' : role.color === 'blue' ? 'bg-blue-200' : role.color === 'green' ? 'bg-green-200' : role.color === 'purple' ? 'bg-purple-200' : 'bg-gray-200'} rounded-lg flex items-center justify-center`}>
                      <Shield className={`w-6 h-6 ${role.color === 'red' ? 'text-red-700' : role.color === 'blue' ? 'text-blue-700' : role.color === 'green' ? 'text-green-700' : role.color === 'purple' ? 'text-purple-700' : 'text-gray-700'}`} />
                    </div>
                    <div>
                      <h3 className="mb-1">{role.name}</h3>
                      <p className="text-xs opacity-75">{role.users} users</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm mb-4 opacity-90">{role.description}</p>

                <div>
                  <p className="text-xs uppercase tracking-wider mb-2 opacity-75">Permissions</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/50 rounded text-xs"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Details Table */}
      <div className="bg-white rounded-lg shadow-sm mt-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2>Role Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Role Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${role.color === 'red' ? 'bg-red-100 text-red-800' : role.color === 'blue' ? 'bg-blue-100 text-blue-800' : role.color === 'green' ? 'bg-green-100 text-green-800' : role.color === 'purple' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                        {role.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{role.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{role.users}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Modify"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}