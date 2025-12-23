import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

export function Analytics() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Analytics</h1>
        <p className="text-gray-600">View comprehensive analytics and reports</p>
      </div>

      {/* Placeholder Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-dashed border-gray-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg">Shipment Analytics</h3>
              <p className="text-sm text-gray-500">Track shipment trends and patterns</p>
            </div>
          </div>
          <div className="text-center py-8 text-gray-400">
            Chart Placeholder
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-dashed border-gray-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg">Revenue Analytics</h3>
              <p className="text-sm text-gray-500">Monitor revenue growth</p>
            </div>
          </div>
          <div className="text-center py-8 text-gray-400">
            Chart Placeholder
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-dashed border-gray-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg">Cargo Distribution</h3>
              <p className="text-sm text-gray-500">Analyze cargo types and volumes</p>
            </div>
          </div>
          <div className="text-center py-8 text-gray-400">
            Chart Placeholder
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-dashed border-gray-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg">Performance Metrics</h3>
              <p className="text-sm text-gray-500">Key performance indicators</p>
            </div>
          </div>
          <div className="text-center py-8 text-gray-400">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
