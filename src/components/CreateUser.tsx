import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface CreateUserProps {
  onBack: () => void;
}

export function CreateUser({ onBack }: CreateUserProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    cell: '',
    notifications: {
      email: false,
      sms: false,
      inApp: false,
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
      {/* Page Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Settings
        </button>
        <h1 className="text-2xl mb-2">Create User</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user name"
                required
              />
            </div>

            {/* Roles */}
            <div>
              <label htmlFor="role" className="block text-sm mb-2">
                Roles
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Exporter">Exporter</option>
                <option value="Importer">Importer</option>
              </select>
            </div>

            {/* Notifications */}
            <div>
              <label className="block text-sm mb-2">
                Notifications
              </label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email"
                    name="email"
                    checked={formData.notifications.email}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="email" className="ml-3 text-sm text-gray-700">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sms"
                    name="sms"
                    checked={formData.notifications.sms}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="sms" className="ml-3 text-sm text-gray-700">
                    SMS
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inApp"
                    name="inApp"
                    checked={formData.notifications.inApp}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="inApp" className="ml-3 text-sm text-gray-700">
                    In-App
                  </label>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1-555-0123"
                required
              />
            </div>

            {/* Cell */}
            <div>
              <label htmlFor="cell" className="block text-sm mb-2">
                Cell
              </label>
              <input
                type="tel"
                id="cell"
                name="cell"
                value={formData.cell}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1-555-0123"
                required
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-lg">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
