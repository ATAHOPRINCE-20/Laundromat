import { Calendar, MapPin, User, Package, CheckCircle } from "lucide-react";

export default function Delivery() {
  const deliveries = [
    {
      id: 'D001',
      orderId: 'ORD-1234',
      customer: 'Austin Bailey',
      address: '123 Main St, Apt 4B',
      date: '2026-03-25',
      time: '3:00 PM',
      status: 'Out for Delivery',
      items: 3,
    },
    {
      id: 'D002',
      orderId: 'ORD-1235',
      customer: 'John Doe',
      address: '456 Oak Ave, Suite 12',
      date: '2026-03-25',
      time: '5:00 PM',
      status: 'Scheduled',
      items: 5,
    },
    {
      id: 'D003',
      orderId: 'ORD-1236',
      customer: 'Jane Smith',
      address: '789 Pine Rd',
      date: '2026-03-26',
      time: '2:30 PM',
      status: 'Scheduled',
      items: 2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Delivery Schedule</h1>
        <button className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
          Schedule New Delivery
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Delivery ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Address</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Items</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{delivery.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{delivery.orderId}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{delivery.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{delivery.address}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {delivery.date} at {delivery.time}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{delivery.items}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                    {delivery.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm mr-3">
                    View
                  </button>
                  {delivery.status === 'Out for Delivery' && (
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Delivery ID</div>
                <div className="font-semibold text-gray-900">{delivery.id}</div>
                <div className="text-sm text-gray-500 mt-1">Order: {delivery.orderId}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                {delivery.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Customer</div>
                  <div className="text-gray-900">{delivery.customer}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="text-gray-900">{delivery.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Date & Time</div>
                  <div className="text-gray-900">{delivery.date} at {delivery.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Items</div>
                  <div className="text-gray-900">{delivery.items}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2.5 text-green-600 hover:text-green-700 font-medium border border-green-600 rounded-lg">
                View Details
              </button>
              {delivery.status === 'Out for Delivery' && (
                <button className="flex-1 py-2.5 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Mark Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
