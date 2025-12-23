import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { mockApi } from '../services/mock-api';

interface CreatePartnerProps {
  onBack: () => void;
  onPartnerCreated?: () => void;
}

export function CreatePartner({ onBack, onPartnerCreated }: CreatePartnerProps) {
  const [formData, setFormData] = useState({
    partnerType: '',
    name: '',
    country: '',
    email: '',
    cell: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const countries = [
    'Australia',
    'Brazil',
    'Canada',
    'China',
    'France',
    'Germany',
    'India',
    'Japan',
    'Saudi Arabia',
    'Singapore',
    'South Korea',
    'UAE',
    'UK',
    'USA',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await mockApi.partners.create({
        companyName: formData.name,
        contactPerson: 'Contact Person', // You can add this to the form if needed
        email: formData.email,
        phone: formData.cell,
        address: '',
        city: '',
        state: '',
        country: formData.country,
        postalCode: '',
        partnerType: formData.partnerType,
        servicesOffered: [],
      });
      
      setSuccess(true);
      
      // Redirect back after 2 seconds
      setTimeout(() => {
        if (onPartnerCreated) {
          onPartnerCreated();
        } else {
          onBack();
        }
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create partner');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
          Back to Partner Directory
        </button>
        <h1 className="text-2xl mb-2">Create Partner</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Partner Type */}
            <div>
              <label htmlFor="partnerType" className="block text-sm mb-2">
                Partner Type
              </label>
              <input
                type="text"
                id="partnerType"
                name="partnerType"
                value={formData.partnerType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Exporter, Importer, Freight Agent"
                required
              />
            </div>

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
                placeholder="Partner company name"
                required
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm mb-2">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="contact@example.com"
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
              Create Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}