import { useState } from "react";
import { X, Printer, Plus, Trash2, ChevronDown } from "lucide-react";

interface WalkInOrderModalProps {
  onClose: () => void;
}

interface OrderItem {
  id: string;
  service: string;
  kg: number;
  unitPrice: number;
}

export default function WalkInOrderModal({ onClose }: WalkInOrderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: '1', service: 'Dry Cleaning', kg: 1, unitPrice: 10.00 },
  ]);

  const [showReceipt, setShowReceipt] = useState(false);

  const services = [
    { name: 'Dry Cleaning', price: 10.00 },
    { name: 'Duvets', price: 15.00 },
    { name: 'Press', price: 5.00 },
    { name: 'Wash', price: 8.00 },
    { name: 'Wash and Press', price: 12.00 },
    { name: 'Blanket', price: 10.00 },
    { name: 'Curtains', price: 20.00 },
  ];

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      { id: Date.now().toString(), service: 'Dry Cleaning', kg: 1, unitPrice: 10.00 }
    ]);
  };

  const removeOrderItem = (id: string) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter(item => item.id !== id));
    }
  };

  const updateOrderItem = (id: string, field: keyof OrderItem, value: any) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === id) {
        if (field === 'service') {
          const service = services.find(s => s.name === value);
          return { ...item, service: value, unitPrice: service?.price || 0 };
        }
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.kg * item.unitPrice), 0);
  const taxAmount = subtotal * 0.07; // 7% tax
  const totalAmount = subtotal + taxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create order
    const order = {
      id: 'ORD-' + Date.now(),
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      items: orderItems,
      subtotal,
      tax: taxAmount,
      total: totalAmount,
      status: 'Pending',
      type: 'walk-in',
      date: new Date().toISOString(),
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Add customer to customer list if not exists
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const existingCustomer = customers.find((c: any) => c.phone === formData.phone);
    
    if (!existingCustomer) {
      customers.push({
        id: 'CUST-' + Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        type: 'walk-in',
        joinDate: new Date().toISOString(),
        totalOrders: 1,
      });
      localStorage.setItem('customers', JSON.stringify(customers));
    }

    // Show receipt
    setShowReceipt(true);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleNewOrder = () => {
    setFormData({ name: '', phone: '', email: '' });
    setOrderItems([{ id: '1', service: 'Dry Cleaning', kg: 1, unitPrice: 10.00 }]);
    setShowReceipt(false);
  };

  if (showReceipt) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Receipt Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Laundry Service</h2>
              <p className="text-sm text-gray-600">Thank you for your business!</p>
            </div>
            <div className="text-center text-sm text-gray-600">
              <p>{new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Receipt Content */}
          <div className="p-6" id="receipt-content">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
              <div className="text-sm space-y-1">
                <p className="text-gray-600">Name: <span className="font-medium text-gray-900">{formData.name}</span></p>
                <p className="text-gray-600">Phone: <span className="font-medium text-gray-900">{formData.phone}</span></p>
                {formData.email && (
                  <p className="text-gray-600">Email: <span className="font-medium text-gray-900">{formData.email}</span></p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200">
                  <tr className="text-left">
                    <th className="pb-2 text-gray-600">Service</th>
                    <th className="pb-2 text-gray-600 text-center">Kg</th>
                    <th className="pb-2 text-gray-600 text-right">Price</th>
                    <th className="pb-2 text-gray-600 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orderItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 text-gray-900">{item.service}</td>
                      <td className="py-2 text-center text-gray-900">{item.kg}</td>
                      <td className="py-2 text-right text-gray-900">${item.unitPrice.toFixed(2)}</td>
                      <td className="py-2 text-right font-medium text-gray-900">${(item.kg * item.unitPrice).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (7%)</span>
                <span className="font-medium text-gray-900">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600">Order ID: ORD-{Date.now()}</p>
              <p className="text-xs text-gray-500 mt-1">Please keep this receipt for your records</p>
            </div>
          </div>

          {/* Receipt Actions */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
            <button
              onClick={handlePrintReceipt}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Print Receipt
            </button>
            <button
              onClick={handleNewOrder}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              New Order
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">New Walk-in Order</h2>
            <p className="text-sm text-gray-600">Point of Sale</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Customer name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="123-456-7890"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="customer@example.com"
                />
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            
            {orderItems.map((item, index) => (
              <div key={item.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-700">Item {index + 1}</span>
                  {orderItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOrderItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                    <div className="relative">
                      <select
                        value={item.service}
                        onChange={(e) => updateOrderItem(item.id, 'service', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        required
                      >
                        {services.map(s => (
                          <option key={s.name} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kg</label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={item.kg}
                      onChange={(e) => updateOrderItem(item.id, 'kg', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateOrderItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="mt-3 text-right">
                  <span className="text-sm text-gray-600">Amount: </span>
                  <span className="font-semibold text-gray-900">${(item.kg * item.unitPrice).toFixed(2)}</span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addOrderItem}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Another Item
            </button>
          </div>

          {/* Order Summary */}
          <div className="mb-6 p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (7%)</span>
                <span className="font-medium">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold text-gray-900 text-xl">
                <span>Total</span>
                <span className="text-green-600">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Complete Order & Print Receipt
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
