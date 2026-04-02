import { Package, Clock, Truck, CheckCircle } from "lucide-react";

export default function TrackOrders() {
  const orders = [
    {
      id: 'ORD-1234',
      service: 'Dry Cleaning',
      items: 3,
      amount: 45.50,
      status: 'In Progress',
      date: '2026-03-25',
      time: '10:30 AM',
      pickupDate: '2026-03-25',
      deliveryDate: '2026-03-27',
      progress: 50,
      timeline: [
        { step: 'Order Placed', completed: true, date: '2026-03-25 10:30 AM' },
        { step: 'Picked Up', completed: true, date: '2026-03-25 02:00 PM' },
        { step: 'In Progress', completed: true, date: '2026-03-25 03:30 PM' },
        { step: 'Ready for Delivery', completed: false, date: '' },
        { step: 'Delivered', completed: false, date: '' },
      ]
    },
    {
      id: 'ORD-1230',
      service: 'Wash and Press',
      items: 5,
      amount: 78.00,
      status: 'Ready',
      date: '2026-03-23',
      time: '11:15 AM',
      pickupDate: '2026-03-23',
      deliveryDate: '2026-03-25',
      progress: 75,
      timeline: [
        { step: 'Order Placed', completed: true, date: '2026-03-23 11:15 AM' },
        { step: 'Picked Up', completed: true, date: '2026-03-23 03:00 PM' },
        { step: 'In Progress', completed: true, date: '2026-03-24 09:00 AM' },
        { step: 'Ready for Delivery', completed: true, date: '2026-03-24 05:00 PM' },
        { step: 'Delivered', completed: false, date: '' },
      ]
    },
    {
      id: 'ORD-1225',
      service: 'Press',
      items: 2,
      amount: 25.00,
      status: 'Completed',
      date: '2026-03-20',
      time: '02:00 PM',
      pickupDate: '2026-03-20',
      deliveryDate: '2026-03-22',
      progress: 100,
      timeline: [
        { step: 'Order Placed', completed: true, date: '2026-03-20 02:00 PM' },
        { step: 'Picked Up', completed: true, date: '2026-03-20 04:30 PM' },
        { step: 'In Progress', completed: true, date: '2026-03-21 10:00 AM' },
        { step: 'Ready for Delivery', completed: true, date: '2026-03-21 03:00 PM' },
        { step: 'Delivered', completed: true, date: '2026-03-22 11:00 AM' },
      ]
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
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return Clock;
      case 'In Progress':
        return Package;
      case 'Ready':
      case 'Out for Delivery':
        return Truck;
      case 'Completed':
        return CheckCircle;
      default:
        return Package;
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Track Your Orders</h1>
        <p className="text-gray-600">View the status of all your orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          
          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="p-5 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Placed on {order.date} at {order.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${order.amount.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{order.items} items</div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Service</div>
                    <div className="font-medium text-gray-900">{order.service}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Pickup Date</div>
                    <div className="font-medium text-gray-900">{order.pickupDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Delivery Date</div>
                    <div className="font-medium text-gray-900">{order.deliveryDate}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Order Progress</span>
                    <span className="text-sm font-medium text-gray-900">{order.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  {order.timeline.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-blue-600' : 'bg-gray-300'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        {index < order.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${step.completed ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.step}
                        </div>
                        {step.date && (
                          <div className="text-sm text-gray-500 mt-1">{step.date}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
