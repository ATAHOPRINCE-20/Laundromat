import { TrendingUp, DollarSign, Package, Users } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Reports() {
  // Stats data
  const stats = [
    { label: 'Total Revenue', value: '$12,458', change: '+12.5%', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-900', changeColor: 'text-blue-600', icon: DollarSign, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Total Orders', value: '284', change: '+8.2%', color: 'bg-green-50 border-green-200', textColor: 'text-green-900', changeColor: 'text-green-600', icon: Package, iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Active Customers', value: '156', change: '+15.3%', color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-900', changeColor: 'text-purple-600', icon: Users, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { label: 'Growth Rate', value: '23.4%', change: '+4.1%', color: 'bg-orange-50 border-orange-200', textColor: 'text-orange-900', changeColor: 'text-orange-600', icon: TrendingUp, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  ];

  // Revenue data
  const revenueData = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5100 },
    { month: 'Mar', revenue: 4800 },
    { month: 'Apr', revenue: 6200 },
    { month: 'May', revenue: 5800 },
    { month: 'Jun', revenue: 7100 },
  ];

  // Service distribution data
  const serviceData = [
    { name: 'Dry Cleaning', value: 35, color: '#3B82F6' },
    { name: 'Wash & Press', value: 28, color: '#10B981' },
    { name: 'Press Only', value: 18, color: '#F59E0B' },
    { name: 'Duvets', value: 12, color: '#8B5CF6' },
    { name: 'Others', value: 7, color: '#6B7280' },
  ];

  // Order status data
  const orderStatusData = [
    { status: 'Pending', count: 24 },
    { status: 'In Progress', count: 38 },
    { status: 'Ready', count: 15 },
    { status: 'Delivered', count: 67 },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Reports & Analytics</h1>
        <p className="text-gray-600">View business performance and insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`rounded-xl p-5 border ${stat.color}`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <span className={`text-sm font-medium ${stat.changeColor} flex items-center gap-1`}>
                <TrendingUp className="w-4 h-4" />
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value) => `$${value}`}
              />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order Status Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderStatusData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis type="number" stroke="#6B7280" />
            <YAxis dataKey="status" type="category" stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
            />
            <Bar dataKey="count" fill="#10B981" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Average Order Value</h3>
          <p className="text-3xl font-bold text-gray-900 mb-1">$43.86</p>
          <p className="text-sm text-green-600">↑ 5.2% from last month</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Customer Retention</h3>
          <p className="text-3xl font-bold text-gray-900 mb-1">87.5%</p>
          <p className="text-sm text-green-600">↑ 2.1% from last month</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Processing Time</h3>
          <p className="text-3xl font-bold text-gray-900 mb-1">2.4 days</p>
          <p className="text-sm text-red-600">↑ 0.3 days from last month</p>
        </div>
      </div>
    </div>
  );
}
