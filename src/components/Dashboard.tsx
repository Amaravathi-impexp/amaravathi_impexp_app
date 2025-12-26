import { Package, DollarSign, Ship, FileText, Upload, Navigation as NavigationIcon, AlertCircle, Clock, AlertTriangle, Bell, Truck } from 'lucide-react';
import { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { useAppSelector } from '../store/hooks';

export function Dashboard() {
  // Get alerts and activities from Redux store
  const alerts = useAppSelector((state) => state.dashboard.alerts);
  const activities = useAppSelector((state) => state.dashboard.activities);

  // Stats data for KPI cards
  const stats = [
    {
      label: 'Active Shipments',
      value: '24',
      change: '+12%',
      icon: Ship,
      color: 'blue' as const,
    },
    {
      label: 'Total Revenue',
      value: '$48.2K',
      change: '+23%',
      icon: DollarSign,
      color: 'green' as const,
    },
    {
      label: 'Pending Compliance',
      value: '8',
      change: '-5%',
      icon: FileText,
      color: 'orange' as const,
    },
    {
      label: 'Payments Due',
      value: '3',
      change: '+2',
      icon: Package,
      color: 'amber' as const,
    },
  ];

  const handleStatClick = (statLabel: string) => {
    // Handle navigation based on the stat clicked
    console.log('Stat clicked:', statLabel);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Dashboard' },
        ]}
      />
      
      {/* KPI Cards - Single Row */}
      <div className="mb-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-blue-100 text-blue-600",
              green: "bg-green-100 text-green-600",
              orange: "bg-orange-100 text-orange-600",
              red: "bg-red-100 text-red-600",
              amber: "bg-amber-100 text-amber-600",
            }[stat.color];

            return (
              <button
                key={index}
                onClick={() => handleStatClick(stat.label)}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02] w-full text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${colorClasses} rounded-lg flex items-center justify-center transition-all duration-200`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Links, Exceptions / Alerts, and Recent Activity - Single Row */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-lg">Quick Links</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
              <a
                href="#"
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm mb-0.5">
                    New Shipment
                  </h3>
                  <p className="text-xs text-gray-600">
                    Book and schedule instantly
                  </p>
                </div>
              </a>

              <div className="border-t border-gray-200 my-3"></div>

              <a
                href="#"
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Upload className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm mb-0.5">
                    Upload Documents
                  </h3>
                  <p className="text-xs text-gray-600">
                    Invoices, packing lists, customs docs
                  </p>
                </div>
              </a>

              <div className="border-t border-gray-200 my-3"></div>

              <a
                href="#"
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <NavigationIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm mb-0.5">
                    Track Cargo
                  </h3>
                  <p className="text-xs text-gray-600">
                    Real-time tracking and updates
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-lg">Exceptions / Alerts</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex-1 flex flex-col">
              <div className="space-y-4 flex-1">
                {alerts.map((alert) => {
                  // Determine alert styling based on type
                  const alertStyles = {
                    error: {
                      bg: 'bg-red-50',
                      border: 'border-red-200',
                      iconBg: 'bg-red-100',
                      iconColor: 'text-red-600',
                      titleColor: 'text-red-900',
                      descColor: 'text-red-700',
                      infoColor: 'text-red-600',
                      icon: AlertCircle,
                    },
                    warning: {
                      bg: alert.severity === 'medium' && alert.title.includes('Delay') 
                        ? 'bg-orange-50' 
                        : 'bg-yellow-50',
                      border: alert.severity === 'medium' && alert.title.includes('Delay')
                        ? 'border-orange-200'
                        : 'border-yellow-200',
                      iconBg: alert.severity === 'medium' && alert.title.includes('Delay')
                        ? 'bg-orange-100'
                        : 'bg-yellow-100',
                      iconColor: alert.severity === 'medium' && alert.title.includes('Delay')
                        ? 'text-orange-600'
                        : 'text-yellow-600',
                      titleColor: alert.severity === 'medium' && alert.title.includes('Delay')
                        ? 'text-orange-900'
                        : 'text-yellow-900',
                      descColor: alert.severity === 'medium' && alert.title.includes('Delay')
                        ? 'text-orange-700'
                        : 'text-yellow-700',
                      infoColor: alert.severity === 'medium' && alert.title.includes('Delay')
                        ? 'text-orange-600'
                        : 'text-yellow-600',
                      icon: alert.title.includes('Delay') ? Clock : AlertTriangle,
                    },
                    info: {
                      bg: 'bg-blue-50',
                      border: 'border-blue-200',
                      iconBg: 'bg-blue-100',
                      iconColor: 'text-blue-600',
                      titleColor: 'text-blue-900',
                      descColor: 'text-blue-700',
                      infoColor: 'text-blue-600',
                      icon: AlertCircle,
                    },
                  }[alert.type];

                  const AlertIcon = alertStyles.icon;

                  return (
                    <div
                      key={alert.id}
                      className={`flex gap-3 p-4 ${alertStyles.bg} border ${alertStyles.border} rounded-lg`}
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 ${alertStyles.iconBg} rounded-lg flex items-center justify-center`}>
                          <AlertIcon className={`w-5 h-5 ${alertStyles.iconColor}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`text-sm mb-1 ${alertStyles.titleColor}`}>
                              {alert.title}
                            </h3>
                            <p className={`text-xs ${alertStyles.descColor}`}>
                              {alert.description}
                            </p>
                            {alert.shipmentInfo && (
                              <p className={`text-xs ${alertStyles.infoColor} mt-1`}>
                                {alert.shipmentInfo}
                              </p>
                            )}
                          </div>
                          <span className={`text-xs ${alertStyles.infoColor}`}>
                            {alert.timeAgo}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View all alerts
                </a>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h2 className="text-lg">Recent Activity</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex-1 flex flex-col">
              <div className="space-y-4 flex-1">
                {activities.map((activity, index) => {
                  // Determine activity icon and styling based on type
                  const activityConfig = {
                    shipment: {
                      icon: Truck,
                      bgColor: 'bg-blue-100',
                      iconColor: 'text-blue-600',
                    },
                    delivery: {
                      icon: Ship,
                      bgColor: 'bg-blue-100',
                      iconColor: 'text-blue-600',
                    },
                    payment: {
                      icon: DollarSign,
                      bgColor: 'bg-green-100',
                      iconColor: 'text-green-600',
                    },
                    message: {
                      icon: Bell,
                      bgColor: 'bg-purple-100',
                      iconColor: 'text-purple-600',
                    },
                    document: {
                      icon: FileText,
                      bgColor: 'bg-orange-100',
                      iconColor: 'text-orange-600',
                    },
                  }[activity.type];

                  const ActivityIcon = activityConfig.icon;
                  const isLastItem = index === activities.length - 1;

                  return (
                    <div
                      key={activity.id}
                      className={`flex gap-3 ${!isLastItem ? 'pb-4 border-b border-gray-100' : ''}`}
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 ${activityConfig.bgColor} rounded-full flex items-center justify-center`}>
                          <ActivityIcon className={`w-5 h-5 ${activityConfig.iconColor}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.description} • {activity.timeAgo}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View all activity
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}