import { Star, Search, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CreatePartner } from './CreatePartner';
import { mockApi } from '../services/mock-api';
import type { Partner } from '../types';

export function PartnerDirectory() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await mockApi.partners.getAll({ page: 1, limit: 50 });
      setPartners(response.data);
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePartnerCreated = () => {
    setShowCreateForm(false);
    fetchPartners(); // Refresh the list
  };

  const getPartnerTypeColor = (type: string) => {
    switch (type) {
      case 'Exporter':
        return 'bg-blue-100 text-blue-800';
      case 'Importer':
        return 'bg-green-100 text-green-800';
      case 'Freight Agent':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  if (showCreateForm) {
    return <CreatePartner onBack={() => setShowCreateForm(false)} onPartnerCreated={handlePartnerCreated} />;
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2">Partner Directory</h1>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-5 h-5" />
          Create
        </button>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2>Partners</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Partner Type
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getPartnerTypeColor(partner.partnerType)}`}>
                      {partner.partnerType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{partner.companyName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{partner.country}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStars(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{partner.email || partner.phone}</span>
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