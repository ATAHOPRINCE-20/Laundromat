import { Package, Clock, CheckCircle, AlertCircle, Search, Phone, User } from "lucide-react";
import { useState, useEffect } from "react";
import WalkInOrderModal from "./WalkInOrderModal";

export default function Dashboard() {
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Today's quick stats
  const todayStats = [
    { 
      label: "Today's Orders", 
      value: '12', 
      icon: Package, 
      color: 'bg-blue-50 border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900'
    },
    { 
      label: 'Pending Pickups', 
      value: '5', 
      icon: Clock, 
      color: 'bg-yellow-50 border-yellow-200',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-900'
    },
    { 
      label: 'Ready for Delivery', 
      value: '8', 
      icon: CheckCircle, 
      color: 'bg-green-50 border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-900'
    },
    { 
      label: 'Urgent Orders', 
      value: '3', 
      icon: AlertCircle, 
      color: 'bg-red-50 border-red-200',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-900'
    },
  ];

  // Recent orders
  const recentOrders = [
    {
      id: 'ORD-1240',
      customer: 'Austin Bailey',
      phone: '+1 (555) 123-4567',
      service: 'Dry Cleaning',
      status: 'Pending',
      time: '10 mins ago',
      amount: 45.50,
    },
    {
      id: 'ORD-1239',
      customer: 'John Doe',
      phone: '+1 (555) 234-5678',
      service: 'Wash and Press',
      status: 'In Progress',
      time: '25 mins ago',
      amount: 78.00,
    },
    {
      id: 'ORD-1238',
      customer: 'Jane Smith',
      phone: '+1 (555) 345-6789',
      service: 'Press',
      status: 'Ready',
      time: '1 hour ago',
      amount: 25.00,
    },
    {
      id: 'ORD-1237',
      customer: 'Mike Johnson',
      phone: '+1 (555) 456-7890',
      service: 'Duvets',
      status: 'Pending',
      time: '2 hours ago',
      amount: 35.00,
    },
  ];

  // Today's pickups
  const todaysPickups = [
    {
      id: 'PICK-101',
      customer: 'Sarah Williams',
      address: '123 Main St, Apt 4B',
      time: '10:00 AM',
      phone: '+1 (555) 567-8901',
      status: 'Scheduled',
    },
    {
      id: 'PICK-102',
      customer: 'David Brown',
      address: '456 Oak Ave, Suite 12',
      time: '11:30 AM',
      phone: '+1 (555) 678-9012',
      status: 'Scheduled',
    },
    {
      id: 'PICK-103',
      customer: 'Emma Davis',
      address: '789 Pine Rd',
      time: '02:00 PM',
      phone: '+1 (555) 789-0123',
      status: 'Scheduled',
    },
  ];

  // Ready for delivery
  const readyForDelivery = [
    {
      id: 'ORD-1230',
      customer: 'Robert Wilson',
      items: 5,
      address: '321 Elm St',
      phone: '+1 (555) 890-1234',
    },
    {
      id: 'ORD-1231',
      customer: 'Lisa Anderson',
      items: 3,
      address: '654 Maple Dr',
      phone: '+1 (555) 901-2345',
    },
    {
      id: 'ORD-1232',
      customer: 'Tom Martinez',
      items: 7,
      address: '987 Cedar Ln',
      phone: '+1 (555) 012-3456',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Ready':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header with Time and Quick Actions */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Reception Dashboard</h1>
            <p className="text-gray-600">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowWalkInModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2"
            >
              <Package className="w-5 h-5" />
              New Walk-in Order
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {todayStats.map((stat, index) => (
          <div key={index} className={`rounded-xl p-5 border ${stat.color}`}>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Customer Lookup</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, or order ID..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <User className="w-4 h-4" />
                      {order.customer}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4" />
                      {order.phone}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${order.amount.toFixed(2)}</div>
                    <div className="text-xs text-gray-500 mt-1">{order.time}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-700">{order.service}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Pickups */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Today's Pickup Schedule</h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {todaysPickups.map((pickup) => (
              <div key={pickup.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">{pickup.customer}</div>
                    <div className="text-sm text-gray-600 mt-1">{pickup.address}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4" />
                      {pickup.phone}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {pickup.time}
                    </div>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pickup.status)}`}>
                      {pickup.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ready for Delivery */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Ready for Delivery</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Items</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {readyForDelivery.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.items} items</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.address}</td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                      Contact Customer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Walk-in Order Modal */}
      {showWalkInModal && (
        <WalkInOrderModal onClose={() => setShowWalkInModal(false)} />
      )}
    </div>
  );
}
