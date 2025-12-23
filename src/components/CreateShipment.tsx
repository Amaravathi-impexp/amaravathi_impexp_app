import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { mockApi } from '../services/mock-api';

interface CreateShipmentProps {
  onBack: () => void;
  onShipmentCreated?: () => void;
}

export function CreateShipment({ onBack, onShipmentCreated }: CreateShipmentProps) {
  const [shipmentType, setShipmentType] = useState<'import' | 'export'>('import');
  const [hsCode, setHsCode] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [complianceCritical, setComplianceCritical] = useState<'yes' | 'no'>('no');
  const [originCountry, setOriginCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [mode, setMode] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [eta, setEta] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Generate shipment ID
      const shipmentId = `AMRV-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      
      // Call the create API
      await mockApi.shipments.create({
        shipmentId,
        customerName: 'Customer Name', // You can add this to the form if needed
        origin: originCountry,
        destination: destinationCountry,
        departureDate: pickupDate,
        arrivalDate: eta,
        containerType: mode,
        cargoType: productName,
        weight: parseFloat(weight) || 0,
        volume: parseFloat(quantity) || 0,
        value: 0, // You can add this to the form if needed
        currency: 'USD',
        incoterms: 'FOB',
      });
      
      setSuccess(true);
      
      // Redirect back after 2 seconds
      setTimeout(() => {
        if (onShipmentCreated) {
          onShipmentCreated();
        } else {
          onBack();
        }
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shipments</span>
        </button>
        <h1 className="text-2xl mb-2">Create Shipment</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        {/* Shipment Type */}
        <div className="mb-8">
          <label className="block mb-3">Shipment Type</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shipmentType"
                value="import"
                checked={shipmentType === 'import'}
                onChange={() => setShipmentType('import')}
                className="w-4 h-4 accent-blue-600 bg-white"
              />
              <span>Import</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shipmentType"
                value="export"
                checked={shipmentType === 'export'}
                onChange={() => setShipmentType('export')}
                className="w-4 h-4 accent-blue-600 bg-white"
              />
              <span>Export</span>
            </label>
          </div>
        </div>

        {/* Cargo Details */}
        <div className="mb-8">
          <h2 className="mb-4">Cargo Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HS Code */}
            <div>
              <label htmlFor="hsCode" className="block text-sm mb-2">
                HS Code
              </label>
              <input
                type="text"
                id="hsCode"
                value={hsCode}
                onChange={(e) => setHsCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter HS Code"
              />
            </div>

            {/* Product Name */}
            <div>
              <label htmlFor="productName" className="block text-sm mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Product Name"
              />
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm mb-2">
                Quantity
              </label>
              <input
                type="text"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Quantity"
              />
            </div>

            {/* Weight */}
            <div>
              <label htmlFor="weight" className="block text-sm mb-2">
                Weight
              </label>
              <input
                type="text"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Weight"
              />
            </div>
          </div>

          {/* Compliance Critical */}
          <div className="mt-6">
            <label className="block mb-3">Compliance Critical</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="complianceCritical"
                  value="yes"
                  checked={complianceCritical === 'yes'}
                  onChange={() => setComplianceCritical('yes')}
                  className="w-4 h-4 accent-blue-600 bg-white"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="complianceCritical"
                  value="no"
                  checked={complianceCritical === 'no'}
                  onChange={() => setComplianceCritical('no')}
                  className="w-4 h-4 accent-blue-600 bg-white"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Trade Details */}
        <div className="mb-8">
          <h2 className="mb-4">Trade Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Origin Country */}
            <div>
              <label htmlFor="originCountry" className="block text-sm mb-2">
                Origin Country
              </label>
              <select
                id="originCountry"
                value={originCountry}
                onChange={(e) => setOriginCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Origin Country</option>
                <option value="india">India</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="uae">United Arab Emirates</option>
                <option value="china">China</option>
                <option value="singapore">Singapore</option>
                <option value="australia">Australia</option>
                <option value="japan">Japan</option>
                <option value="germany">Germany</option>
                <option value="netherlands">Netherlands</option>
                <option value="spain">Spain</option>
                <option value="canada">Canada</option>
              </select>
            </div>

            {/* Destination Country */}
            <div>
              <label htmlFor="destinationCountry" className="block text-sm mb-2">
                Destination Country
              </label>
              <select
                id="destinationCountry"
                value={destinationCountry}
                onChange={(e) => setDestinationCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Destination Country</option>
                <option value="india">India</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="uae">United Arab Emirates</option>
                <option value="china">China</option>
                <option value="singapore">Singapore</option>
                <option value="australia">Australia</option>
                <option value="japan">Japan</option>
                <option value="germany">Germany</option>
                <option value="netherlands">Netherlands</option>
                <option value="spain">Spain</option>
                <option value="canada">Canada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Logistics */}
        <div className="mb-8">
          <h2 className="mb-4">Logistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mode */}
            <div>
              <label htmlFor="mode" className="block text-sm mb-2">
                Mode
              </label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Mode</option>
                <option value="sea">Sea</option>
                <option value="air">Air</option>
                <option value="road">Road</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="mb-8">
          <h2 className="mb-4">Dates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Date */}
            <div>
              <label htmlFor="pickupDate" className="block text-sm mb-2">
                Pickup Date
              </label>
              <input
                type="date"
                id="pickupDate"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* ETA */}
            <div>
              <label htmlFor="eta" className="block text-sm mb-2">
                ETA
              </label>
              <input
                type="date"
                id="eta"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Shipment
          </button>
        </div>
        
        {/* Loading, Error, and Success Messages */}
        {loading && <p className="mt-4 text-blue-500">Creating shipment...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-500">Shipment created successfully!</p>}
      </form>
    </div>
  );
}