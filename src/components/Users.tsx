import { Eye, Edit, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { CreateUser } from './CreateUser';
import { Breadcrumb } from './Breadcrumb';

const users = [
  {
    id: 1,
    name: 'John Anderson',
    roles: ['Admin'],
    notification: 'Email & SMS',
    phone: '+1-555-0101',
    cell: '+1-555-0102',
    originCountry: 'India',
    destinationCountry: 'USA',
    product: 'Rice',
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    roles: ['Importer'],
    notification: 'Email',
    phone: '+1-555-0201',
    cell: '+1-555-0202',
    originCountry: 'China',
    destinationCountry: 'UAE',
    product: 'Turmeric',
  },
  {
    id: 3,
    name: 'Michael Chen',
    roles: ['Exporter'],
    notification: 'SMS',
    phone: '+1-555-0301',
    cell: '+1-555-0302',
    originCountry: 'India',
    destinationCountry: 'UK',
    product: 'Chillies',
  },
  {
    id: 4,
    name: 'Emily Davis',
    roles: ['Importer'],
    notification: 'Email & SMS',
    phone: '+1-555-0401',
    cell: '+1-555-0402',
    originCountry: 'Vietnam',
    destinationCountry: 'Singapore',
    product: 'Rice',
  },
  {
    id: 5,
    name: 'Robert Johnson',
    roles: ['Exporter'],
    notification: 'Email',
    phone: '+1-555-0501',
    cell: '+1-555-0502',
    originCountry: 'India',
    destinationCountry: 'Germany',
    product: 'Turmeric',
  },
  {
    id: 6,
    name: 'Lisa Wong',
    roles: ['Admin'],
    notification: 'Email & SMS',
    phone: '+1-555-0601',
    cell: '+1-555-0602',
    originCountry: 'Thailand',
    destinationCountry: 'USA',
    product: 'Chillies',
  },
  {
    id: 7,
    name: 'David Brown',
    roles: ['Importer'],
    notification: 'SMS',
    phone: '+1-555-0701',
    cell: '+1-555-0702',
    originCountry: 'China',
    destinationCountry: 'Japan',
    product: 'Rice',
  },
  {
    id: 8,
    name: 'Amanda Taylor',
    roles: ['Exporter'],
    notification: 'Email',
    phone: '+1-555-0801',
    cell: '+1-555-0802',
    originCountry: 'India',
    destinationCountry: 'France',
    product: 'Turmeric',
  },
];

export function Users() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800';
      case 'Importer':
        return 'bg-blue-100 text-blue-800';
      case 'Exporter':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (showCreateForm) {
    return <CreateUser onBack={() => setShowCreateForm(false)} />;
  }

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Admin' },
          { label: 'Users' },
        ]}
      />

      {/* User Management Table */}
      <div className="bg-white rounded-lg shadow-sm mt-6">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2>Users</h2>
          <div className="flex items-center gap-2">
            {searchExpanded && (
              <input
                type="text"
                placeholder="Search users..."
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
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Role(s)
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Origin Country
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Destination Country
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Notification
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Cell
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{user.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className={`px-2 py-1 inline-flex text-xs leading-5 rounded-full ${getRoleColor(role)}`}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{user.originCountry}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{user.destinationCountry}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{user.product}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{user.notification}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{user.phone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{user.cell}</span>
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