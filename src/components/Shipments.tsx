import {
  Ship,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Pencil,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import { CreateShipment } from "./CreateShipment";
import { mockApi } from "../services/mock-api";
import type { Shipment } from "../types";

export function Shipments() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const response = await mockApi.shipments.getAll({ page: 1, limit: 50 });
      setShipments(response.data);
    } catch (error) {
      console.error('Failed to fetch shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShipmentCreated = () => {
    setShowCreateForm(false);
    fetchShipments(); // Refresh the list
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-blue-100 text-blue-800";
      case "Cleared":
        return "bg-green-100 text-green-800";
      case "Delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLocationColor = (location: string) => {
    switch (location) {
      case "Port":
        return "bg-purple-100 text-purple-800";
      case "Customs":
        return "bg-orange-100 text-orange-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertColor = (alert: string | null) => {
    if (!alert) return "";
    switch (alert) {
      case "Delay":
        return "bg-red-100 text-red-800";
      case "Inspection":
        return "bg-yellow-100 text-yellow-800";
      case "Hold":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (showCreateForm) {
    return (
      <CreateShipment onBack={() => setShowCreateForm(false)} onShipmentCreated={handleShipmentCreated} />
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl mb-2">Shipments</h1>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create
        </button>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <h2>Recent Shipments</h2>
          <div className="flex items-center gap-2">
            {searchExpanded && (
              <input
                type="text"
                placeholder="Search shipments..."
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
          </div>
        </div>
        <div className="overflow-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Shipment ID
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Cargo
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Current Location
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  ETA
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Alerts
                </th>
                <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {shipments.map((shipment) => {
                return (
                  <tr
                    key={shipment.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm">
                        {shipment.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {shipment.cargo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getLocationColor(shipment.currentLocation)}`}
                      >
                        {shipment.currentLocation}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getStatusColor(shipment.status)}`}
                      >
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shipment.eta}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.alert ? (
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getAlertColor(shipment.alert)}`}
                        >
                          {shipment.alert}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          -
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                          title="Modify"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}