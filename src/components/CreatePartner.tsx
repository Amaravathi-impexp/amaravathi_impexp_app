import { ArrowLeft, Building2, Users, Mail, MapPin, CheckCircle, AlertCircle, Loader2, Package, Ship, Plane } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockApi } from '../services/mock-api';
import { Breadcrumb } from './Breadcrumb';
import type { Partner } from '../types';

interface CreatePartnerProps {
  onBack: () => void;
  onPartnerCreated?: (partner: Partner) => void;
  preselectedPartnerType?: string;
}

export function CreatePartner({ onBack, onPartnerCreated, preselectedPartnerType }: CreatePartnerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [partnerType, setPartnerType] = useState(preselectedPartnerType || '');
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [servicesOffered, setServicesOffered] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Skip step 1 if partner type is preselected
  useEffect(() => {
    if (preselectedPartnerType) {
      setCurrentStep(2);
    }
  }, [preselectedPartnerType]);

  const steps = [
    { number: 1, title: 'Partner Type', icon: Building2 },
    { number: 2, title: 'Company Info & Contact', icon: Users },
    { number: 3, title: 'Review & Submit', icon: CheckCircle },
  ];

  const partnerTypes = [
    { value: 'exporter', label: 'Exporter', description: 'Companies that export goods internationally', icon: Ship },
    { value: 'importer', label: 'Importer', description: 'Companies that import goods internationally', icon: Package },
    { value: 'freight_agent', label: 'Freight Agent', description: 'Logistics and freight forwarding services', icon: Plane },
    { value: 'customs_broker', label: 'Customs Broker', description: 'Customs clearance and compliance services', icon: Building2 },
  ];

  const serviceOptions = [
    'Sea Freight',
    'Air Freight',
    'Road Freight',
    'Customs Clearance',
    'Warehousing',
    'Documentation',
    'Insurance',
    'Packaging',
  ];

  const countries = [
    'Australia',
    'Brazil',
    'Canada',
    'China',
    'France',
    'Germany',
    'India',
    'Japan',
    'Netherlands',
    'Saudi Arabia',
    'Singapore',
    'South Korea',
    'Spain',
    'UAE',
    'UK',
    'USA',
  ];

  const handleSubmit = async () => {
    if (currentStep !== 3) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      const partner = await mockApi.partners.create({
        companyName: name,
        contactPerson: contactPerson,
        email: email,
        phone: cell,
        address: address,
        city: city,
        state: '',
        country: country,
        postalCode: postalCode,
        partnerType: partnerType,
        servicesOffered: servicesOffered,
      });

      setSuccess(true);

      // Redirect back after 2 seconds
      setTimeout(() => {
        if (onPartnerCreated) {
          onPartnerCreated(partner);
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

  const toggleService = (service: string) => {
    setServicesOffered(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return partnerType !== '';
      case 2:
        return name !== '' && country !== '' && email !== '' && cell !== '';
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
                  {/* Building - Top */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 animate-icon-rotate"
                    style={{ animationDelay: '0s' }}
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Users - Right */}
                  <div
                    className="absolute top-1/2 right-0 -translate-y-1/2 animate-icon-rotate"
                    style={{ animationDelay: '0.66s' }}
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Mail - Left */}
                  <div
                    className="absolute top-1/2 left-0 -translate-y-1/2 animate-icon-rotate"
                    style={{ animationDelay: '1.33s' }}
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
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
            <h2 className="text-2xl text-gray-900 mb-2">Creating Partner</h2>
            <p className="text-gray-600 mb-4">Please wait while we add your partner to the directory...</p>

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
              <h2 className="text-2xl text-green-900 mb-2">Partner Created!</h2>
              <p className="text-gray-600 mb-4">The partner has been successfully added to your directory.</p>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-sm text-green-700 mt-4">Redirecting to partner directory...</p>
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
          { label: 'Partner Directory', onClick: onBack },
          { label: 'Create New Partner' },
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
        {/* Step 1: Partner Type */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl">Select Partner Type</h2>
                <p className="text-sm text-gray-600">Choose the type of business partner you're adding</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partnerTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.value}
                    className={`relative flex items-start p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      partnerType === type.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="partnerType"
                      value={type.value}
                      checked={partnerType === type.value}
                      onChange={() => setPartnerType(type.value)}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-4 w-full">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        partnerType === type.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1">{type.label}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                      {partnerType === type.value && (
                        <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Company Info & Contact */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl">Company Information & Contact</h2>
                <p className="text-sm text-gray-600">Enter the partner company details and contact information</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., Global Logistics Ltd."
                    required
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label htmlFor="contactPerson" className="block text-sm mb-2">
                    Contact Person <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., John Smith"
                  />
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="block text-sm mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select a country</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm mb-2">
                    Address <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Street address"
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm mb-2">
                    City <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., Mumbai"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label htmlFor="postalCode" className="block text-sm mb-2">
                    Postal Code <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., 400001"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="contact@example.com"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Primary email for communication</p>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="cell" className="block text-sm mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="cell"
                      value={cell}
                      onChange={(e) => setCell(e.target.value)}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+1-555-0123"
                      required
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Include country code</p>
                </div>
              </div>

              {/* Services Offered */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block mb-3">
                  Services Offered <span className="text-gray-400">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {serviceOptions.map((service) => (
                    <label
                      key={service}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        servicesOffered.includes(service)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={servicesOffered.includes(service)}
                        onChange={() => toggleService(service)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2 w-full">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          servicesOffered.includes(service)
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300'
                        }`}>
                          {servicesOffered.includes(service) && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-sm">{service}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl">Review Partner Details</h2>
                <p className="text-sm text-gray-600">Please review all information before submitting</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Partner Type */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-sm text-gray-600 mb-2">Partner Type</h3>
                <p className="capitalize">{partnerTypes.find(t => t.value === partnerType)?.label || '-'}</p>
              </div>

              {/* Company Information */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-sm text-gray-600 mb-3">Company Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p>{name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Person</p>
                    <p>{contactPerson || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p>{country || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p>{city || '-'}</p>
                  </div>
                  {address && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Address</p>
                      <p>{address}</p>
                    </div>
                  )}
                  {postalCode && (
                    <div>
                      <p className="text-sm text-gray-500">Postal Code</p>
                      <p>{postalCode}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-sm text-gray-600 mb-3">Contact Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{email || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{cell || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Services Offered */}
              {servicesOffered.length > 0 && (
                <div>
                  <h3 className="text-sm text-gray-600 mb-3">Services Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {servicesOffered.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
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

          {currentStep < 3 ? (
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
              Create Partner
            </button>
          )}
        </div>
      </div>
    </div>
  );
}