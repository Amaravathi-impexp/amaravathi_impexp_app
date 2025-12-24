import { 
  Ship, 
  Package, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  User, 
  Building2, 
  Weight, 
  Box, 
  AlertCircle, 
  Upload,
  Save,
  X,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  Trash2,
  Plus
} from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import type { Shipment } from '../types';
import { useState } from 'react';

interface ModifyShipmentProps {
  shipment: Shipment;
  onBack: () => void;
  onShipmentModified: () => void;
}

export function ModifyShipment({ shipment, onBack, onShipmentModified }: ModifyShipmentProps) {
  // Form state for shipment details
  const [formData, setFormData] = useState({
    // Basic Info
    shipmentType: 'Export',
    mode: 'Sea Freight',
    incoterms: 'FOB',
    
    // Origin & Destination
    origin: shipment.origin || 'Mumbai, India',
    destination: shipment.destination || 'Los Angeles, USA',
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
    
    // Status & Location
    currentLocation: shipment.currentLocation,
    status: shipment.status,
    
    // Parties
    shipper: 'ABC Electronics Pvt Ltd',
    shipperAddress: '123 Industrial Area, Mumbai, Maharashtra 400001, India',
    consignee: 'XYZ Imports LLC',
    consigneeAddress: '456 Commerce St, Los Angeles, CA 90001, USA',
    
    // Service Providers
    freightForwarder: 'Global Logistics Solutions',
    cha: 'Mumbai Customs Clearing Co.',
    shippingLine: 'Maersk Line',
    vesselName: 'MSC GULSUN',
    voyageNumber: 'VOY-2024-089',
    
    // Dates
    departureDate: '2024-12-05',
    estimatedArrival: shipment.eta,
    
    // Commercial
    cargoValue: 125000,
    currency: 'USD',
    freightCharges: 4500,
    insuranceValue: 130000,
    
    // Special Instructions
    specialInstructions: 'Handle with care. Temperature sensitive cargo.',
    
    // Alert
    alert: shipment.alert || '',
  });

  // Document upload state
  const [uploadedDocuments, setUploadedDocuments] = useState([
    { id: 1, name: 'Commercial Invoice', file: 'invoice.pdf', size: '2.4 MB', uploadedDate: 'Dec 24, 2024', status: 'approved' },
    { id: 2, name: 'Packing List', file: 'packing_list.pdf', size: '1.8 MB', uploadedDate: 'Dec 24, 2024', status: 'approved' },
    { id: 3, name: 'Bill of Lading', file: 'bol.pdf', size: '856 KB', uploadedDate: 'Dec 23, 2024', status: 'pending' },
  ]);

  const [documentType, setDocumentType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving shipment:', formData);
    onShipmentModified();
  };

  // Document upload handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleDocumentUpload = () => {
    if (selectedFile && documentType) {
      const newDoc = {
        id: uploadedDocuments.length + 1,
        name: documentType,
        file: selectedFile.name,
        size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'pending'
      };
      setUploadedDocuments([...uploadedDocuments, newDoc]);
      setSelectedFile(null);
      setDocumentType('');
    }
  };

  const handleDeleteDocument = (id: number) => {
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Booked':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Transit':
        return 'bg-purple-100 text-purple-800 border-purple-200';
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

  const getDocumentStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs border ${styles[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Determine which fields can be edited based on status
  const canEditBasicInfo = ['Booked', 'Delayed'].includes(formData.status);
  const canEditLocation = true; // Always editable for tracking
  const canEditDates = ['Booked'].includes(formData.status);
  const canEditCommercial = ['Booked'].includes(formData.status);

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Shipments', href: '#' },
          { label: shipment.id },
          { label: 'Modify' },
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
            <h1 className="text-2xl">Modify Shipment</h1>
            <p className="text-sm text-gray-600 mt-1">Shipment ID: {shipment.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700">Some fields may be locked based on the current shipment status: <span className={`ml-2 px-2 py-1 rounded text-xs border ${getStatusColor(formData.status)}`}>{formData.status}</span></p>
            <p className="text-xs text-blue-600 mt-1">Contact support if you need to modify locked fields.</p>
          </div>
        </div>
      </div>

      {/* Shipment Details Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="mb-6 flex items-center gap-2">
          <Ship className="w-5 h-5 text-blue-600" />
          Shipment Details
        </h2>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm pb-2 border-b">Basic Information</h3>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Shipment Type</label>
              <select
                value={formData.shipmentType}
                onChange={(e) => handleInputChange('shipmentType', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="Export">Export</option>
                <option value="Import">Import</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Mode</label>
              <select
                value={formData.mode}
                onChange={(e) => handleInputChange('mode', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="Sea Freight">Sea Freight</option>
                <option value="Air Freight">Air Freight</option>
                <option value="Road Freight">Road Freight</option>
                <option value="Rail Freight">Rail Freight</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Incoterms</label>
              <select
                value={formData.incoterms}
                onChange={(e) => handleInputChange('incoterms', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="FOB">FOB (Free On Board)</option>
                <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                <option value="EXW">EXW (Ex Works)</option>
                <option value="DDP">DDP (Delivered Duty Paid)</option>
                <option value="FCA">FCA (Free Carrier)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Current Location</label>
              <input
                type="text"
                value={formData.currentLocation}
                onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Booked">Booked</option>
                <option value="In Transit">In Transit</option>
                <option value="Cleared">Cleared</option>
                <option value="Delivered">Delivered</option>
                <option value="Delayed">Delayed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Alert Status</label>
              <select
                value={formData.alert}
                onChange={(e) => handleInputChange('alert', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No Alert</option>
                <option value="Delay">Delay</option>
                <option value="Inspection">Inspection</option>
                <option value="Hold">Hold</option>
              </select>
            </div>

            <h3 className="text-sm pb-2 border-b mt-6">Route Information</h3>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Origin</label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Origin Port</label>
              <input
                type="text"
                value={formData.originPort}
                onChange={(e) => handleInputChange('originPort', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Destination</label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Destination Port</label>
              <input
                type="text"
                value={formData.destinationPort}
                onChange={(e) => handleInputChange('destinationPort', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Column 2: Container & Cargo */}
          <div className="space-y-4">
            <h3 className="text-sm pb-2 border-b">Container Details</h3>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Container Number</label>
              <input
                type="text"
                value={formData.containerNumber}
                onChange={(e) => handleInputChange('containerNumber', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Container Type</label>
              <select
                value={formData.containerType}
                onChange={(e) => handleInputChange('containerType', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="20ft Standard">20ft Standard</option>
                <option value="40ft Standard">40ft Standard</option>
                <option value="40ft High Cube">40ft High Cube</option>
                <option value="20ft Reefer">20ft Reefer</option>
                <option value="40ft Reefer">40ft Reefer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Seal Number</label>
              <input
                type="text"
                value={formData.sealNumber}
                onChange={(e) => handleInputChange('sealNumber', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <h3 className="text-sm pb-2 border-b mt-6">Cargo Information</h3>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Cargo Description</label>
              <input
                type="text"
                value={formData.cargoDescription}
                onChange={(e) => handleInputChange('cargoDescription', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', Number(e.target.value))}
                  disabled={!canEditBasicInfo}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Volume (m³)</label>
                <input
                  type="number"
                  value={formData.volume}
                  onChange={(e) => handleInputChange('volume', Number(e.target.value))}
                  disabled={!canEditBasicInfo}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Number of Packages</label>
              <input
                type="number"
                value={formData.numberOfPackages}
                onChange={(e) => handleInputChange('numberOfPackages', Number(e.target.value))}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">HS Code</label>
              <input
                type="text"
                value={formData.hsCode}
                onChange={(e) => handleInputChange('hsCode', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <h3 className="text-sm pb-2 border-b mt-6">Dates & Schedule</h3>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Departure Date</label>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => handleInputChange('departureDate', e.target.value)}
                disabled={!canEditDates}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Estimated Arrival</label>
              <input
                type="text"
                value={formData.estimatedArrival}
                onChange={(e) => handleInputChange('estimatedArrival', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Column 3: Parties & Commercial */}
          <div className="space-y-4">
            <h3 className="text-sm pb-2 border-b">Parties Involved</h3>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Shipper</label>
              <input
                type="text"
                value={formData.shipper}
                onChange={(e) => handleInputChange('shipper', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Shipper Address</label>
              <textarea
                value={formData.shipperAddress}
                onChange={(e) => handleInputChange('shipperAddress', e.target.value)}
                disabled={!canEditBasicInfo}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Consignee</label>
              <input
                type="text"
                value={formData.consignee}
                onChange={(e) => handleInputChange('consignee', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Consignee Address</label>
              <textarea
                value={formData.consigneeAddress}
                onChange={(e) => handleInputChange('consigneeAddress', e.target.value)}
                disabled={!canEditBasicInfo}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <h3 className="text-sm pb-2 border-b mt-6">Service Providers</h3>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Freight Forwarder</label>
              <input
                type="text"
                value={formData.freightForwarder}
                onChange={(e) => handleInputChange('freightForwarder', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Customs House Agent</label>
              <input
                type="text"
                value={formData.cha}
                onChange={(e) => handleInputChange('cha', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Shipping Line</label>
              <input
                type="text"
                value={formData.shippingLine}
                onChange={(e) => handleInputChange('shippingLine', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Vessel Name</label>
              <input
                type="text"
                value={formData.vesselName}
                onChange={(e) => handleInputChange('vesselName', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Voyage Number</label>
              <input
                type="text"
                value={formData.voyageNumber}
                onChange={(e) => handleInputChange('voyageNumber', e.target.value)}
                disabled={!canEditBasicInfo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <h3 className="text-sm pb-2 border-b mt-6">Commercial Details</h3>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                disabled={!canEditCommercial}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Cargo Value</label>
              <input
                type="number"
                value={formData.cargoValue}
                onChange={(e) => handleInputChange('cargoValue', Number(e.target.value))}
                disabled={!canEditCommercial}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Freight Charges</label>
              <input
                type="number"
                value={formData.freightCharges}
                onChange={(e) => handleInputChange('freightCharges', Number(e.target.value))}
                disabled={!canEditCommercial}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Insurance Value</label>
              <input
                type="number"
                value={formData.insuranceValue}
                onChange={(e) => handleInputChange('insuranceValue', Number(e.target.value))}
                disabled={!canEditCommercial}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Special Instructions</label>
              <textarea
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Document Management
        </h2>

        {/* Upload Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left: Upload Form */}
          <div>
            <h3 className="text-sm mb-4">Upload New Document</h3>
            
            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm mb-2">Drop files here or <label className="text-blue-600 cursor-pointer hover:underline">
                Browse
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </label></p>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
              {selectedFile && (
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded inline-block">
                  <p className="text-xs text-green-700">✓ {selectedFile.name}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Document Type</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type...</option>
                <option value="Commercial Invoice">Commercial Invoice</option>
                <option value="Packing List">Packing List</option>
                <option value="Bill of Lading">Bill of Lading</option>
                <option value="Certificate of Origin">Certificate of Origin</option>
                <option value="Customs Declaration">Customs Declaration</option>
                <option value="Insurance Certificate">Insurance Certificate</option>
                <option value="Shipping Bill">Shipping Bill</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              onClick={handleDocumentUpload}
              disabled={!selectedFile || !documentType}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Add Document
            </button>
          </div>

          {/* Right: Uploaded Documents List */}
          <div>
            <h3 className="text-sm mb-4">Uploaded Documents ({uploadedDocuments.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {uploadedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.file} • {doc.size} • {doc.uploadedDate}</p>
                    </div>
                    {getDocumentStatusBadge(doc.status)}
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" 
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {uploadedDocuments.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No documents uploaded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons at Bottom */}
      <div className="flex items-center justify-end gap-3 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}