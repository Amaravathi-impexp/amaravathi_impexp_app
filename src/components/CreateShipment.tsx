import { ArrowLeft, Package, Globe, Truck, Calendar, CheckCircle, AlertCircle, Ship, Plane, Box, Loader2, Users, Plus, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockApi } from '../services/mock-api';
import { Breadcrumb } from './Breadcrumb';
import { CreatePartner } from './CreatePartner';
import type { Partner } from '../types';

interface CreateShipmentProps {
  onBack: () => void;
  onShipmentCreated?: () => void;
}

export function CreateShipment({ onBack, onShipmentCreated }: CreateShipmentProps) {
  const [currentStep, setCurrentStep] = useState(1);
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
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('');
  const [showCreatePartner, setShowCreatePartner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await mockApi.partners.getAll({ page: 1, limit: 100 });
      setPartners(response.data);
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    }
  };

  const handlePartnerCreated = async (newPartner: Partner) => {
    await fetchPartners();
    setSelectedPartner(newPartner);
    setShowCreatePartner(false);
    setCurrentStep(4); // Return to Partner Selection step
  };

  const filteredPartners = partners.filter(partner =>
    partner.companyName.toLowerCase().includes(partnerSearchQuery.toLowerCase()) ||
    partner.country.toLowerCase().includes(partnerSearchQuery.toLowerCase())
  );

  // If showing create partner screen, render it
  if (showCreatePartner) {
    const preselectedPartnerType = shipmentType === 'import' ? 'importer' : 'exporter';
    return (
      <CreatePartner
        onBack={() => setShowCreatePartner(false)}
        onPartnerCreated={handlePartnerCreated}
        preselectedPartnerType={preselectedPartnerType}
      />
    );
  }

  const steps = [
    { number: 1, title: 'Shipment Type', icon: Package },
    { number: 2, title: 'Cargo Details', icon: Box },
    { number: 3, title: 'Route & Logistics', icon: Globe },
    { number: 4, title: 'Partner Selection', icon: Users },
    { number: 5, title: 'Review & Submit', icon: CheckCircle },
  ];

  const handleSubmit = async () => {
    // Only submit if we're on the final step
    if (currentStep !== 5) {
      return;
    }
    
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
        partnerId: selectedPartner?.id || '',
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent Enter key from submitting form on steps 1-3
    if (e.key === 'Enter' && currentStep !== 5) {
      e.preventDefault();
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return shipmentType !== '';
      case 2:
        return hsCode !== '' && productName !== '' && quantity !== '' && weight !== '';
      case 3:
        return originCountry !== '' && destinationCountry !== '' && mode !== '' && pickupDate !== '' && eta !== '';
      case 4:
        return selectedPartner !== null;
      default:
        return true;
    }
  };

  const canProceed = isStepValid(currentStep);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Full-Screen Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="text-center px-4">
            {/* Circular Progress */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              {/* Background Circle */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Animated Progress Circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="552.92"
                  className="animate-progress-circle"
                  style={{
                    animation: 'progressCircle 2s ease-in-out infinite'
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center Content - Rotating Icons */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  {/* Package - Top */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 animate-icon-rotate"
                    style={{ animationDelay: '0s' }}
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Ship - Right */}
                  <div 
                    className="absolute top-1/2 right-0 -translate-y-1/2 animate-icon-rotate"
                    style={{ animationDelay: '0.66s' }}
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Ship className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Plane - Left */}
                  <div 
                    className="absolute top-1/2 left-0 -translate-y-1/2 animate-icon-rotate"
                    style={{ animationDelay: '1.33s' }}
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Plane className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Center Spinning Loader */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text */}
            <h2 className="text-2xl text-gray-900 mb-2">Creating Your Shipment</h2>
            <p className="text-gray-600 mb-4">Please wait while we process your shipment details...</p>
            
            {/* Animated Dots */}
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          
          <style>{`
            @keyframes progressCircle {
              0% { 
                strokeDashoffset: 552.92;
              }
              50% { 
                strokeDashoffset: 138.23;
              }
              100% { 
                strokeDashoffset: 0;
              }
            }
            
            @keyframes icon-rotate {
              0%, 100% { 
                transform: scale(1);
                opacity: 1;
              }
              50% { 
                transform: scale(1.2);
                opacity: 0.8;
              }
            }
            
            .animate-icon-rotate {
              animation: icon-rotate 2s ease-in-out infinite;
            }
            
            @keyframes scale-in {
              0% { transform: scale(0.9); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-scale-in {
              animation: scale-in 0.3s ease-out;
            }
          `}</style>
        </div>
      )}

      {/* Success Overlay */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 transform scale-100 animate-scale-in">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <CheckCircle className="w-20 h-20 text-green-600" />
                <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-20"></div>
              </div>
              <h2 className="text-2xl text-green-900 mb-2">Shipment Created!</h2>
              <p className="text-gray-600 mb-4">Your shipment has been successfully created and is ready for processing.</p>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-sm text-green-700 mt-4">Redirecting to shipments...</p>
            </div>
          </div>
          <style>{`
            @keyframes scale-in {
              0% { transform: scale(0.9); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-scale-in {
              animation: scale-in 0.3s ease-out;
            }
          `}</style>
        </div>
      )}

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Shipments', onClick: onBack },
          { label: 'Create New Shipment' },
        ]}
      />

      {/* Progress Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-sm ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 bg-gray-200 mx-2 -mt-8">
                      <div
                        className={`h-full transition-all duration-300 ${
                          currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step 1: Shipment Type */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl">Select Shipment Type</h2>
                <p className="text-sm text-gray-600">Choose whether this is an import or export shipment</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                className={`relative flex items-center p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  shipmentType === 'import'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  name="shipmentType"
                  value="import"
                  checked={shipmentType === 'import'}
                  onChange={() => setShipmentType('import')}
                  className="sr-only"
                />
                <div className="flex items-center gap-4 w-full">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    shipmentType === 'import' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Ship className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">Import</h3>
                    <p className="text-sm text-gray-600">Bringing goods into the country</p>
                  </div>
                  {shipmentType === 'import' && (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  )}
                </div>
              </label>

              <label
                className={`relative flex items-center p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  shipmentType === 'export'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  name="shipmentType"
                  value="export"
                  checked={shipmentType === 'export'}
                  onChange={() => setShipmentType('export')}
                  className="sr-only"
                />
                <div className="flex items-center gap-4 w-full">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    shipmentType === 'export' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Plane className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">Export</h3>
                    <p className="text-sm text-gray-600">Sending goods out of the country</p>
                  </div>
                  {shipmentType === 'export' && (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  )}
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 2: Cargo Details */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Box className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl">Cargo Details</h2>
                <p className="text-sm text-gray-600">Provide information about your cargo</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* HS Code */}
                <div>
                  <label htmlFor="hsCode" className="block text-sm mb-2">
                    HS Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="hsCode"
                    value={hsCode}
                    onChange={(e) => setHsCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., 8471.30.00"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Harmonized System tariff code</p>
                </div>

                {/* Product Name */}
                <div>
                  <label htmlFor="productName" className="block text-sm mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., Electronic Components"
                    required
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-sm mb-2">
                    Quantity (CBM) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., 20"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Cubic meters</p>
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="weight" className="block text-sm mb-2">
                    Weight (KG) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., 5000"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Total weight in kilograms</p>
                </div>
              </div>

              {/* Compliance Critical */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block mb-3">
                  Compliance Critical Cargo <span className="text-gray-400">(Requires special handling)</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      complianceCritical === 'yes'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="complianceCritical"
                      value="yes"
                      checked={complianceCritical === 'yes'}
                      onChange={() => setComplianceCritical('yes')}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3 w-full">
                      <AlertCircle className={`w-5 h-5 ${complianceCritical === 'yes' ? 'text-orange-600' : 'text-gray-400'}`} />
                      <span>Yes - Requires Special Compliance</span>
                      {complianceCritical === 'yes' && <CheckCircle className="w-5 h-5 text-orange-600 ml-auto" />}
                    </div>
                  </label>
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      complianceCritical === 'no'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="complianceCritical"
                      value="no"
                      checked={complianceCritical === 'no'}
                      onChange={() => setComplianceCritical('no')}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3 w-full">
                      <CheckCircle className={`w-5 h-5 ${complianceCritical === 'no' ? 'text-green-600' : 'text-gray-400'}`} />
                      <span>No - Standard Cargo</span>
                      {complianceCritical === 'no' && <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Route & Logistics */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Route Information */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl">Route Information</h2>
                  <p className="text-sm text-gray-600">Specify origin and destination</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Origin Country */}
                <div>
                  <label htmlFor="originCountry" className="block text-sm mb-2">
                    Origin Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="originCountry"
                    value={originCountry}
                    onChange={(e) => setOriginCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
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
                    Destination Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="destinationCountry"
                    value={destinationCountry}
                    onChange={(e) => setDestinationCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
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

            {/* Transportation Mode */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl">Transportation Mode</h2>
                  <p className="text-sm text-gray-600">Select how the cargo will be transported</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label
                  className={`relative flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    mode === 'sea'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value="sea"
                    checked={mode === 'sea'}
                    onChange={(e) => setMode(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                    mode === 'sea' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Ship className="w-8 h-8" />
                  </div>
                  <h3 className="mb-1">Sea Freight</h3>
                  <p className="text-sm text-gray-600 text-center">Cost-effective for large volumes</p>
                  {mode === 'sea' && (
                    <CheckCircle className="w-6 h-6 text-blue-600 absolute top-4 right-4" />
                  )}
                </label>

                <label
                  className={`relative flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    mode === 'air'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value="air"
                    checked={mode === 'air'}
                    onChange={(e) => setMode(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                    mode === 'air' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Plane className="w-8 h-8" />
                  </div>
                  <h3 className="mb-1">Air Freight</h3>
                  <p className="text-sm text-gray-600 text-center">Fast delivery for urgent cargo</p>
                  {mode === 'air' && (
                    <CheckCircle className="w-6 h-6 text-blue-600 absolute top-4 right-4" />
                  )}
                </label>

                <label
                  className={`relative flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    mode === 'road'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value="road"
                    checked={mode === 'road'}
                    onChange={(e) => setMode(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                    mode === 'road' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Truck className="w-8 h-8" />
                  </div>
                  <h3 className="mb-1">Road Freight</h3>
                  <p className="text-sm text-gray-600 text-center">Door-to-door land transport</p>
                  {mode === 'road' && (
                    <CheckCircle className="w-6 h-6 text-blue-600 absolute top-4 right-4" />
                  )}
                </label>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl">Schedule</h2>
                  <p className="text-sm text-gray-600">Set pickup and delivery dates</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup Date */}
                <div>
                  <label htmlFor="pickupDate" className="block text-sm mb-2">
                    Pickup Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="pickupDate"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                      required
                    />
                    <Calendar 
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">When will the cargo be picked up?</p>
                </div>

                {/* ETA */}
                <div>
                  <label htmlFor="eta" className="block text-sm mb-2">
                    Estimated Time of Arrival <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="eta"
                      value={eta}
                      onChange={(e) => setEta(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                      required
                    />
                    <Calendar 
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Expected delivery date</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Partner Selection */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl">Select a Partner</h2>
                <p className="text-sm text-gray-600">Choose a partner to handle your shipment</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Partner Search Dropdown */}
              <div>
                <label htmlFor="partnerSelect" className="block text-sm mb-2">
                  Select Partner <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="partnerSelect"
                    value={selectedPartner?.id || ''}
                    onChange={(e) => {
                      const partner = partners.find(p => p.id === e.target.value);
                      setSelectedPartner(partner || null);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Search and select a partner...</option>
                    {partners.map(partner => (
                      <option key={partner.id} value={partner.id}>
                        {partner.companyName} - {partner.country}
                      </option>
                    ))}
                  </select>
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Selected Partner Details */}
              {selectedPartner && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-sm mb-3">Selected Partner Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p>{selectedPartner.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact Person</p>
                      <p>{selectedPartner.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{selectedPartner.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p>{selectedPartner.country}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* OR Separator */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-gray-500 px-3">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Create New Partner Button */}
              <button
                type="button"
                onClick={() => setShowCreatePartner(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 text-gray-700 rounded-lg hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create New Partner
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl">Review Your Shipment</h2>
                <p className="text-sm text-gray-600">Please review all details before submitting</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Shipment Type */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-sm text-gray-600 mb-2">Shipment Type</h3>
                <p className="capitalize">{shipmentType}</p>
              </div>

              {/* Cargo Details */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-sm text-gray-600 mb-3">Cargo Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Product Name</p>
                    <p>{productName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">HS Code</p>
                    <p>{hsCode || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p>{quantity ? `${quantity} CBM` : '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p>{weight ? `${weight} KG` : '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Compliance Critical</p>
                    <p className="capitalize">{complianceCritical}</p>
                  </div>
                </div>
              </div>

              {/* Route & Logistics */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-sm text-gray-600 mb-3">Route & Logistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Origin</p>
                    <p className="capitalize">{originCountry || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="capitalize">{destinationCountry || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transportation Mode</p>
                    <p className="capitalize">{mode || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-sm text-gray-600 mb-3">Schedule</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Pickup Date</p>
                    <p>{pickupDate || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated Arrival</p>
                    <p>{eta || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Partner */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-sm text-gray-600 mb-3">Partner Details</h3>
                {selectedPartner ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Company Name</p>
                        <p>{selectedPartner.companyName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Partner Type</p>
                        <p className="capitalize">{selectedPartner.partnerType?.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact Person</p>
                        <p>{selectedPartner.contactPerson}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{selectedPartner.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{selectedPartner.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Country</p>
                        <p>{selectedPartner.country}</p>
                      </div>
                      {selectedPartner.city && (
                        <div>
                          <p className="text-sm text-gray-500">City</p>
                          <p>{selectedPartner.city}</p>
                        </div>
                      )}
                      {selectedPartner.address && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Address</p>
                          <p>{selectedPartner.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No partner selected</p>
                )}
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}
          
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed}
              className={`px-6 py-3 rounded-lg transition-colors ml-auto ${
                canProceed
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next Step
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Submit Shipment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}