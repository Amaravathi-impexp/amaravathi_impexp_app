import { Search, Package } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <div className="relative h-[600px] bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1663801563712-ebf3c6a78239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBvY2VhbnxlbnwxfHx8fDE3NjYyODYyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cargo ship at sea"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-white mb-6">
            Global Shipping & Logistics Solutions
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Connect your business to the world with reliable ocean freight, supply chain management, and end-to-end logistics services.
          </p>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-2">Track your shipment</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter container or booking number"
                    className="w-full px-4 py-3 border border-gray-300 rounded pr-10"
                  />
                  <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="flex items-end">
                <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Package className="w-5 h-5" />
                  Track
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <button className="text-blue-600 hover:underline">Get a Quote</button>
              <button className="text-blue-600 hover:underline">Schedule Pickup</button>
              <button className="text-blue-600 hover:underline">Find Locations</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
