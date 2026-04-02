import { Eye, Edit2, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-1234',
      customer: 'Austin Bailey',
      service: 'Dry Cleaning',
      items: 3,
      amount: 45.50,
      status: 'Pending',
      date: '2026-03-25',
      time: '10:30 AM',
      pickupDate: '2026-03-25',
      deliveryDate: '2026-03-27',
    },
    {
      id: 'ORD-1235',
      customer: 'John Doe',
      service: 'Wash and Press',
      items: 5,
      amount: 78.00,
      status: 'In Progress',
      date: '2026-03-25',
      time: '11:15 AM',
      pickupDate: '2026-03-25',
      deliveryDate: '2026-03-28',
    },
    {
      id: 'ORD-1236',
      customer: 'Jane Smith',
      service: 'Press',
      items: 2,
      amount: 25.00,
      status: 'Pending',
      date: '2026-03-25',
      time: '02:00 PM',
      pickupDate: '2026-03-26',
      deliveryDate: '2026-03-28',
    },
    {
      id: 'ORD-1237',
      customer: 'Mike Johnson',
      service: 'Duvets',
      items: 1,
      amount: 35.00,
      status: 'Ready',
      date: '2026-03-24',
      time: '03:45 PM',
      pickupDate: '2026-03-24',
      deliveryDate: '2026-03-27',
    },
    {
      id: 'ORD-1238',
      customer: 'Sarah Williams',
      service: 'Wash',
      items: 4,
      amount: 52.00,
      status: 'Completed',
      date: '2026-03-23',
      time: '09:00 AM',
      pickupDate: '2026-03-23',
      deliveryDate: '2026-03-25',
    },
  ]);

  const [editingStatus, setEditingStatus] = useState<string | null>(null);

  const statusOptions = ['Pending', 'In Progress', 'Ready', 'Out for Delivery', 'Completed', 'Cancelled'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Ready':
        return 'bg-green-100 text-green-800';
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setEditingStatus(null);
  };

  // Calculate stats
  const stats = {
    pending: orders.filter(o => o.status === 'Pending').length,
    inProgress: orders.filter(o => o.status === 'In Progress').length,
    ready: orders.filter(o => o.status === 'Ready').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0),
  };

  return (
    <div className="p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
          <div className="text-sm text-yellow-700 font-medium mb-1">Pending Orders</div>
          <div className="text-3xl font-bold text-yellow-800">{stats.pending}</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
          <div className="text-sm text-blue-700 font-medium mb-1">In Progress</div>
          <div className="text-3xl font-bold text-blue-800">{stats.inProgress}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-5 border border-green-200">
          <div className="text-sm text-green-700 font-medium mb-1">Ready for Delivery</div>
          <div className="text-3xl font-bold text-green-800">{stats.ready}</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
          <div className="text-sm text-purple-700 font-medium mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-purple-800">${stats.totalRevenue.toFixed(2)}</div>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Incoming Orders</h1>
        <p className="text-gray-600">View and manage customer orders</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Items</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pickup Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Delivery Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.service}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.items}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">${order.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {order.date}<br/>
                  <span className="text-gray-500 text-xs">{order.time}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.pickupDate}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.deliveryDate}</td>
                <td className="px-6 py-4">
                  {editingStatus === order.id ? (
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        onBlur={() => setEditingStatus(null)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-xs font-medium appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingStatus(order.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} hover:opacity-80 transition-opacity flex items-center gap-1`}
                    >
                      {order.status}
                      <Edit2 className="w-3 h-3" />
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Order ID</div>
                <div className="font-semibold text-gray-900 text-lg">{order.id}</div>
                <div className="text-sm text-gray-600 mt-1">{order.date} at {order.time}</div>
              </div>
              {editingStatus === order.id ? (
                <div className="relative">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    onBlur={() => setEditingStatus(null)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-xs font-medium appearance-none pr-8"
                    autoFocus
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              ) : (
                <button
                  onClick={() => setEditingStatus(order.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} flex items-center gap-1`}
                >
                  {order.status}
                  <Edit2 className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium text-gray-900">{order.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium text-gray-900">{order.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium text-gray-900">{order.items}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-gray-900">${order.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup:</span>
                <span className="font-medium text-gray-900">{order.pickupDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery:</span>
                <span className="font-medium text-gray-900">{order.deliveryDate}</span>
              </div>
            </div>

            <button className="w-full py-2.5 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              View Full Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
