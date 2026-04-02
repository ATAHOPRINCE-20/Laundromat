import { Package, Clock, CheckCircle, Truck } from "lucide-react";
import { Link } from "react-router";

export default function CustomerDashboard() {
  const recentOrders = [
    {
      id: 'ORD-1234',
      service: 'Dry Cleaning',
      items: 3,
      amount: 45.50,
      status: 'In Progress',
      pickupDate: '2026-03-25',
      deliveryDate: '2026-03-27',
    },
    {
      id: 'ORD-1230',
      service: 'Wash and Press',
      items: 5,
      amount: 78.00,
      status: 'Ready',
      pickupDate: '2026-03-23',
      deliveryDate: '2026-03-25',
    },
  ];

  const stats = [
    {
      title: 'Active Orders',
      value: '2',
      icon: Package,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Pending Pickup',
      value: '1',
      icon: Clock,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Ready for Delivery',
      value: '1',
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Completed',
      value: '12',
      icon: Truck,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
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
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome Back!</h1>
        <p className="text-gray-600">Here's an overview of your laundry orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-xl p-4 sm:p-5`}>
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
            </div>
            <div className={`text-2xl sm:text-3xl font-bold ${stat.iconColor} mb-1`}>{stat.value}</div>
            <div className="text-gray-700 text-sm font-medium">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/customer-portal/place-order"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <Package className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Place New Order</h3>
            <p className="text-blue-100 text-sm">Start a new laundry order</p>
          </Link>
          <Link
            to="/customer-portal/request-pickup"
            className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <Truck className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Request Pickup</h3>
            <p className="text-orange-100 text-sm">Schedule a pickup time</p>
          </Link>
          <Link
            to="/customer-portal/track-orders"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <CheckCircle className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Track Orders</h3>
            <p className="text-green-100 text-sm">View order status</p>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link to="/customer-portal/track-orders" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Order ID</div>
                  <div className="font-semibold text-gray-900 text-lg">{order.id}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Service</div>
                  <div className="font-medium text-gray-900">{order.service}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Items</div>
                  <div className="font-medium text-gray-900">{order.items}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Amount</div>
                  <div className="font-semibold text-gray-900">${order.amount.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Delivery</div>
                  <div className="font-medium text-gray-900">{order.deliveryDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
