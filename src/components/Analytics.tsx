import { BarChart3, TrendingUp, PieChart, Activity, DollarSign, AlertTriangle } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart as RePieChart, Pie, Cell, LineChart, Line } from 'recharts';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [tradeType, setTradeType] = useState<'import' | 'export'>('import');
  const [country, setCountry] = useState('all');
  const [mode, setMode] = useState('all');
  const [partner, setPartner] = useState('all');

  const handleApply = () => {
    // Apply filters logic
    console.log('Applying filters:', { timeRange, tradeType, country, mode, partner });
  };

  const handleReset = () => {
    setTimeRange('last-30-days');
    setTradeType('import');
    setCountry('all');
    setMode('all');
    setPartner('all');
  };

  // Shipment Performance Data
  const shipmentPerformanceData = [
    { month: 'Jan', onTime: 145, delayed: 12 },
    { month: 'Feb', onTime: 152, delayed: 15 },
    { month: 'Mar', onTime: 168, delayed: 10 },
    { month: 'Apr', onTime: 175, delayed: 8 },
    { month: 'May', onTime: 182, delayed: 14 },
    { month: 'Jun', onTime: 195, delayed: 9 },
  ];

  // Trade Volume Data
  const tradeVolumeData = [
    { month: 'Jan', import: 2.4, export: 1.8 },
    { month: 'Feb', import: 2.6, export: 2.1 },
    { month: 'Mar', import: 2.9, export: 2.3 },
    { month: 'Apr', import: 3.1, export: 2.5 },
    { month: 'May', import: 3.4, export: 2.8 },
    { month: 'Jun', import: 3.7, export: 3.2 },
  ];

  // Cost Breakdown Data
  const costBreakdownData = [
    { name: 'Freight', value: 45, color: '#3b82f6' },
    { name: 'Customs Duty', value: 25, color: '#10b981' },
    { name: 'GST / IGST', value: 18, color: '#f59e0b' },
    { name: 'Insurance', value: 12, color: '#8b5cf6' },
  ];

  // Compliance & Risk Data
  const complianceRiskData = [
    { name: 'HS Code Issues', value: 8 },
    { name: 'License Delays', value: 15 },
    { name: 'Country Restrictions', value: 5 },
  ];

  // Compliance Trend Data (over time)
  const complianceTrendData = [
    { month: 'Jan', hsCode: 12, license: 18, restrictions: 8, documentation: 6 },
    { month: 'Feb', hsCode: 10, license: 16, restrictions: 7, documentation: 5 },
    { month: 'Mar', hsCode: 9, license: 17, restrictions: 6, documentation: 4 },
    { month: 'Apr', hsCode: 11, license: 14, restrictions: 7, documentation: 7 },
    { month: 'May', hsCode: 7, license: 13, restrictions: 4, documentation: 3 },
    { month: 'Jun', hsCode: 8, license: 15, restrictions: 5, documentation: 4 },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Analytics' },
        ]}
      />
      
      {/* Global Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {/* Time Range */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-90-days">Last 90 Days</option>
              <option value="last-year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Trade Type */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Trade Type</label>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setTradeType('import')}
                className={`flex-1 px-4 py-2 transition-colors ${
                  tradeType === 'import'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Import
              </button>
              <button
                onClick={() => setTradeType('export')}
                className={`flex-1 px-4 py-2 transition-colors ${
                  tradeType === 'export'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Export
              </button>
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Countries</option>
              <option value="us">United States</option>
              <option value="cn">China</option>
              <option value="jp">Japan</option>
              <option value="de">Germany</option>
              <option value="uk">United Kingdom</option>
              <option value="in">India</option>
              <option value="sg">Singapore</option>
            </select>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Modes</option>
              <option value="sea">Sea Freight</option>
              <option value="air">Air Freight</option>
              <option value="rail">Rail Freight</option>
              <option value="road">Road Freight</option>
            </select>
          </div>

          {/* Partner */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Partner</label>
            <select
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Partners</option>
              <option value="maersk">Maersk Line</option>
              <option value="msc">MSC</option>
              <option value="cosco">COSCO Shipping</option>
              <option value="hapag">Hapag-Lloyd</option>
              <option value="one">Ocean Network Express</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Total Shipments */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Total Shipments</h3>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl mb-1">1,247</p>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-green-600">+12.5%</span>
            <span className="text-gray-500">vs last period</span>
          </div>
        </div>

        {/* On-Time Delivery % */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">On-Time Delivery %</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl mb-1">94.2%</p>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-green-600">+2.3%</span>
            <span className="text-gray-500">vs last period</span>
          </div>
        </div>

        {/* Avg Clearance Time */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Avg Clearance Time (Days)</h3>
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl mb-1">3.4</p>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-green-600">-0.8</span>
            <span className="text-gray-500">vs last period</span>
          </div>
        </div>

        {/* Compliance Issues */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Compliance Issues</h3>
            <PieChart className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl mb-1">12</p>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-red-600">+3</span>
            <span className="text-gray-500">vs last period</span>
          </div>
        </div>
      </div>

      {/* Row 2 - Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Shipment Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3>Shipment Performance (Monthly)</h3>
              <p className="text-sm text-gray-600">On-Time vs Delayed | Ports / Routes comparison</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shipmentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" fill="#10b981" name="On-Time" />
              <Bar dataKey="delayed" fill="#ef4444" name="Delayed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trade Volume Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3>Trade Volume (Monthly)</h3>
              <p className="text-sm text-gray-600">Import vs Export | Volume in millions</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={tradeVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="import" fill="#10b981" name="Import" />
              <Area type="monotone" dataKey="export" fill="#ef4444" name="Export" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3 - Cost & Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Cost Breakdown Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3>Cost Breakdown</h3>
              <p className="text-sm text-gray-600">Distribution by category (% of total)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={costBreakdownData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {costBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {costBreakdownData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance & Risk Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3>Compliance & Risk</h3>
              <p className="text-sm text-gray-600">Issues trend over time</p>
            </div>
          </div>
          
          {/* Current Issues Summary */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <p className="text-xs text-red-600 mb-1">HS Code Issues</p>
              <p className="text-xl text-red-700">8</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <p className="text-xs text-orange-600 mb-1">License Delays</p>
              <p className="text-xl text-orange-700">15</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-600 mb-1">Restrictions</p>
              <p className="text-xl text-yellow-700">5</p>
            </div>
          </div>
          
          {/* Trend Chart */}
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={complianceTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="hsCode" stroke="#dc2626" name="HS Code" strokeWidth={2} />
              <Line type="monotone" dataKey="license" stroke="#f59e0b" name="License" strokeWidth={2} />
              <Line type="monotone" dataKey="restrictions" stroke="#eab308" name="Restrictions" strokeWidth={2} />
              <Line type="monotone" dataKey="documentation" stroke="#8b5cf6" name="Documentation" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
