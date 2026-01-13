import { 
  Ship, 
  Package, 
  MapPin, 
  Calendar, 
  Clock, 
  Anchor, 
  DollarSign, 
  FileText, 
  User, 
  Building2, 
  Globe, 
  Weight, 
  Box, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp,
  ArrowRight,
  Truck,
  Navigation,
  Home,
  Flag,
  Info
} from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import type { Shipment } from '../types';

interface ViewShipmentDetailsProps {
  shipment: Shipment;
  onBack: () => void;
}

export function ViewShipmentDetails({ shipment, onBack }: ViewShipmentDetailsProps) {
  // Mock expanded shipment data
  const shipmentDetails = {
    ...shipment,
    // Basic Info
    shipmentType: 'Export',
    mode: 'Sea Freight',
    incoterms: 'FOB (Free On Board)',
    
    // Origin & Destination
    origin: shipment.origin || 'Jawaharlal Nehru Port, Mumbai, India',
    destination: shipment.destination || 'Port of Los Angeles, California, USA',
    originPort: 'INMUN - Jawaharlal Nehru Port',
    destinationPort: 'USLAX - Port of Los Angeles',
    
    // Container Info
    containerNumber: shipment.containerNumber || 'MSCU4567890',
    containerType: '40ft High Cube',
    sealNumber: 'SEAL-789456',
    
    // Cargo Details
    cargoDescription: shipment.cargo,
    weight: shipment.weight || 18500,
    volume: shipment.volume || 65,
    numberOfPackages: 450,
    hsCode: '8471.30.00',
    
    // Parties
    shipper: 'ABC Electronics Pvt Ltd',
    shipperAddress: '123 Industrial Area, Mumbai, Maharashtra 400001, India',
    consignee: 'XYZ Imports LLC',
    consigneeAddress: '456 Commerce St, Los Angeles, CA 90001, USA',
    notifyParty: 'XYZ Imports LLC',
    
    // Freight Forwarder
    freightForwarder: 'Global Logistics Solutions',
    forwarderContact: '+1-310-555-0123',
    
    // CHA (Customs House Agent)
    cha: 'Mumbai Customs Clearing Co.',
    chaContact: '+91-22-5555-0199',
    
    // Shipping Line
    shippingLine: 'Maersk Line',
    vesselName: 'MSC GULSUN',
    voyageNumber: 'VOY-2024-089',
    
    // Dates
    bookingDate: 'Dec 01, 2024',
    departureDate: 'Dec 05, 2024',
    estimatedArrival: shipment.eta,
    
    // Commercial
    cargoValue: 125000,
    currency: 'USD',
    freightCharges: 4500,
    insuranceValue: 130000,
    
    // Documents
    billOfLading: 'BL-2024-45678',
    commercialInvoice: 'INV-2024-001',
    packingList: 'PL-2024-001',
    certificateOfOrigin: 'COO-2024-456',
    
    // Status Info
    currentLocation: shipment.currentLocation,
    status: shipment.status,
    completionPercentage: getCompletionPercentage(shipment.status),
    
    // Special Instructions
    specialInstructions: 'Handle with care. Temperature sensitive cargo. Maintain 20-25°C. Notify consignee 48 hours before arrival.',
    
    // Tracking Timeline
    timeline: [
      { date: 'Dec 01, 2024 10:30 AM', location: 'Mumbai, India', status: 'Booking Confirmed', description: 'Shipment booking confirmed and container allocated', completed: true },
      { date: 'Dec 03, 2024 02:15 PM', location: 'Shipper Facility, Mumbai', status: 'Cargo Loaded', description: 'Container loaded at shipper facility', completed: true },
      { date: 'Dec 05, 2024 08:00 AM', location: 'Jawaharlal Nehru Port', status: 'Port Arrival', description: 'Container arrived at port terminal', completed: true },
      { date: 'Dec 06, 2024 11:45 AM', location: 'Jawaharlal Nehru Port', status: 'Customs Clearance', description: 'Export customs clearance completed', completed: true },
      { date: 'Dec 07, 2024 06:30 PM', location: 'Jawaharlal Nehru Port', status: 'Vessel Loaded', description: 'Container loaded on vessel MSC GULSUN', completed: true },
      { date: 'Dec 08, 2024 03:00 AM', location: 'Arabian Sea', status: 'Vessel Departed', description: 'Vessel departed from Mumbai Port', completed: true },
      { date: 'Dec 15, 2024 (Est)', location: 'Pacific Ocean', status: 'In Transit', description: 'Container in transit - crossing Pacific Ocean', completed: false, current: true },
      { date: 'Dec 25, 2024 (Est)', location: 'Port of Los Angeles', status: 'Port Arrival', description: 'Estimated arrival at destination port', completed: false },
      { date: 'Dec 26, 2024 (Est)', location: 'Port of Los Angeles', status: 'Customs Clearance', description: 'Import customs processing', completed: false },
      { date: 'Dec 28, 2024 (Est)', location: 'Los Angeles, CA', status: 'Final Delivery', description: 'Delivery to consignee address', completed: false },
    ],
  };

  function getCompletionPercentage(status: string): number {
    const statusMap: Record<string, number> = {
      'Booked': 20,
      'In Transit': 60,
      'Cleared': 85,
      'Delivered': 100,
      'Delayed': 50,
    };
    return statusMap[status] || 0;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Booked':
        return 'rounded-full px-2 py-1 text-xs border' + ' ' + 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit':
        return 'rounded-full px-2 py-1 text-xs border' + ' ' + 'bg-green-100 text-green-800 border-green-200';
      case 'Cleared':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Delayed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Shipments', href: '#' },
          { label: shipment.id },
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl">Shipment Details</h1>
            <p className="text-sm text-gray-600 mt-1">Tracking ID: {shipment.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 rounded-lg text-sm border ${getStatusColor(shipmentDetails.status)}`}>
            {shipmentDetails.status}
          </span>
        </div>
      </div>

      {/* Status Progress Bar */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm">Shipment Progress</h3>
          <span className="text-sm text-gray-600">{shipmentDetails.completionPercentage}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-500"
            style={{ backgroundColor: '#1A3D32', width: `${shipmentDetails.completionPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-3 text-xs text-gray-600">
          <span>Booked</span>
          <span>In Transit</span>
          <span>Cleared</span>
          <span>Delivered</span>
        </div>
      </div>

      {/* Main Content - Three Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Column 1: Basic Information */}
        <div className="space-y-6">
          {/* Shipment Type & Mode */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Ship className="w-5 h-5" style={{ color: '#1A3D32' }} />
              Shipment Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Shipment Type</label>
                <p className="text-sm mt-1">{shipmentDetails.shipmentType}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Mode</label>
                <p className="text-sm mt-1">{shipmentDetails.mode}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Incoterms</label>
                <p className="text-sm mt-1">{shipmentDetails.incoterms}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Current Location</label>
                <p className="text-sm mt-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  {shipmentDetails.currentLocation}
                </p>
              </div>
            </div>
          </div>

          {/* Origin & Destination */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-green-600" />
              Route Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Origin
                </label>
                <p className="text-sm mt-1">{shipmentDetails.origin}</p>
                <p className="text-xs text-gray-500 mt-1">{shipmentDetails.originPort}</p>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Destination
                </label>
                <p className="text-sm mt-1">{shipmentDetails.destination}</p>
                <p className="text-xs text-gray-500 mt-1">{shipmentDetails.destinationPort}</p>
              </div>
            </div>
          </div>

          {/* Container Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Box className="w-5 h-5" style={{ color: '#3D7A68' }} />
              Container Details
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Container Number</label>
                <p className="text-sm mt-1 font-mono">{shipmentDetails.containerNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Container Type</label>
                <p className="text-sm mt-1">{shipmentDetails.containerType}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Seal Number</label>
                <p className="text-sm mt-1 font-mono">{shipmentDetails.sealNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Cargo & Parties */}
        <div className="space-y-6">
          {/* Cargo Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-600" />
              Cargo Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Description</label>
                <p className="text-sm mt-1">{shipmentDetails.cargoDescription}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600">Weight</label>
                  <p className="text-sm mt-1 flex items-center gap-1">
                    <Weight className="w-4 h-4 text-gray-500" />
                    {shipmentDetails.weight.toLocaleString()} kg
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Volume</label>
                  <p className="text-sm mt-1">{shipmentDetails.volume} m³</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Number of Packages</label>
                <p className="text-sm mt-1">{shipmentDetails.numberOfPackages} packages</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">HS Code</label>
                <p className="text-sm mt-1 font-mono">{shipmentDetails.hsCode}</p>
              </div>
            </div>
          </div>

          {/* Parties Involved */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Parties Involved
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Shipper</label>
                <p className="text-sm mt-1">{shipmentDetails.shipper}</p>
                <p className="text-xs text-gray-500 mt-1">{shipmentDetails.shipperAddress}</p>
              </div>
              <div className="border-t pt-3">
                <label className="text-sm text-gray-600">Consignee</label>
                <p className="text-sm mt-1">{shipmentDetails.consignee}</p>
                <p className="text-xs text-gray-500 mt-1">{shipmentDetails.consigneeAddress}</p>
              </div>
              <div className="border-t pt-3">
                <label className="text-sm text-gray-600">Notify Party</label>
                <p className="text-sm mt-1">{shipmentDetails.notifyParty}</p>
              </div>
            </div>
          </div>

          {/* Service Providers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-600" />
              Service Providers
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Freight Forwarder</label>
                <p className="text-sm mt-1">{shipmentDetails.freightForwarder}</p>
                <p className="text-xs text-gray-500 mt-1">{shipmentDetails.forwarderContact}</p>
              </div>
              <div className="border-t pt-3">
                <label className="text-sm text-gray-600">Customs House Agent</label>
                <p className="text-sm mt-1">{shipmentDetails.cha}</p>
                <p className="text-xs text-gray-500 mt-1">{shipmentDetails.chaContact}</p>
              </div>
              <div className="border-t pt-3">
                <label className="text-sm text-gray-600">Shipping Line</label>
                <p className="text-sm mt-1">{shipmentDetails.shippingLine}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Vessel</label>
                <p className="text-sm mt-1">{shipmentDetails.vesselName}</p>
                <p className="text-xs text-gray-500 mt-1">Voyage: {shipmentDetails.voyageNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Dates, Commercial & Documents */}
        <div className="space-y-6">
          {/* Dates & Schedule */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              Schedule
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Booking Date</label>
                <p className="text-sm mt-1">{shipmentDetails.bookingDate}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Departure Date</label>
                <p className="text-sm mt-1">{shipmentDetails.departureDate}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Estimated Arrival</label>
                <p className="text-sm mt-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: '#3D7A68' }} />
                  {shipmentDetails.estimatedArrival}
                </p>
              </div>
            </div>
          </div>

          {/* Commercial Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Commercial Details
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Cargo Value</label>
                <p className="text-sm mt-1">{shipmentDetails.currency} {shipmentDetails.cargoValue.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Freight Charges</label>
                <p className="text-sm mt-1">{shipmentDetails.currency} {shipmentDetails.freightCharges.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Insurance Value</label>
                <p className="text-sm mt-1">{shipmentDetails.currency} {shipmentDetails.insuranceValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" style={{ color: '#1A3D32' }} />
              Documents
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm">Bill of Lading</p>
                    <p className="text-xs text-gray-500">{shipmentDetails.billOfLading}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm">Commercial Invoice</p>
                    <p className="text-xs text-gray-500">{shipmentDetails.commercialInvoice}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm">Packing List</p>
                    <p className="text-xs text-gray-500">{shipmentDetails.packingList}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm">Certificate of Origin</p>
                    <p className="text-xs text-gray-500">{shipmentDetails.certificateOfOrigin}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-600" />
              Special Instructions
            </h3>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">{shipmentDetails.specialInstructions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Timeline - Full Width */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" style={{ color: '#1A3D32' }} />
          Tracking Timeline
        </h2>
        <div className="space-y-4">
          {shipmentDetails.timeline.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    event.completed
                      ? 'bg-green-100'
                      : event.current
                      ? ''
                      : 'bg-gray-100'
                  }`}
                  style={event.current ? { backgroundColor: '#f0f7ed' } : undefined}
                >
                  {event.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : event.current ? (
                    <Truck className="w-5 h-5" style={{ color: '#1A3D32' }} />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                {index < shipmentDetails.timeline.length - 1 && (
                  <div className={`w-0.5 h-12 ${event.completed ? 'bg-green-300' : 'bg-gray-300'}`}></div>
                )}
              </div>
              <div 
                className={`flex-1 pb-6`}
                style={event.current ? { backgroundColor: '#f0f7ed', border: '1px solid #d4edda', borderRadius: '0.5rem', padding: '1rem', marginLeft: '-0.5rem' } : undefined}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm">{event.status}</h4>
                  <span className="text-xs text-gray-500">{event.date}</span>
                </div>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                {event.current && (
                  <div className="mt-2">
                    <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: '#d4edda', color: '#1A3D32' }}>Current Status</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}