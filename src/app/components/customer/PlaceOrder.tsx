import { useState } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";

interface OrderItem {
  id: string;
  product: string;
  quantity: number;
  unitPrice: number;
}

export default function PlaceOrder() {
  const [service, setService] = useState("Dry Cleaning");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: '1', product: 'Top/Shirt-Silk', quantity: 1, unitPrice: 6.50 },
  ]);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const products = [
    { name: 'Top/Shirt-Silk', price: 6.50 },
    { name: 'Cardigan', price: 5.80 },
    { name: 'Jeans', price: 7.00 },
    { name: 'Dress', price: 9.50 },
    { name: 'Suit', price: 15.00 },
    { name: 'Coat', price: 12.00 },
    { name: 'Blanket', price: 10.00 },
  ];

  const services = ['Dry Cleaning', 'Duvets', 'Press', 'Wash', 'Wash and Press'];

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      { id: Date.now().toString(), product: 'Top/Shirt-Silk', quantity: 1, unitPrice: 6.50 }
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
        if (field === 'product') {
          const product = products.find(p => p.name === value);
          return { ...item, product: value, unitPrice: product?.price || 0 };
        }
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const pickupCharge = 5.00;
  const deliveryCharge = 5.00;
  const taxAmount = subtotal * 0.07; // 7% tax
  const totalAmount = subtotal + taxAmount + pickupCharge + deliveryCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Create order
    const order = {
      id: 'ORD-' + Date.now(),
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      service,
      items: orderItems,
      subtotal,
      tax: taxAmount,
      pickupCharge,
      deliveryCharge,
      total: totalAmount,
      pickupDate,
      pickupTime,
      deliveryDate,
      address,
      notes,
      status: 'Pending',
      type: 'online',
      date: new Date().toISOString(),
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Add/update customer in customer list
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const existingCustomer = customers.find((c: any) => c.email === currentUser.email);
    
    if (existingCustomer) {
      // Update total orders
      existingCustomer.totalOrders = (existingCustomer.totalOrders || 0) + 1;
      existingCustomer.lastOrderDate = new Date().toISOString();
      localStorage.setItem('customers', JSON.stringify(customers));
    } else {
      // Add new customer
      customers.push({
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        phone: 'N/A',
        address: address,
        type: 'online',
        status: 'Active',
        subscription: 'None',
        joinDate: new Date().toISOString(),
        totalOrders: 1,
        lastOrderDate: new Date().toISOString(),
      });
      localStorage.setItem('customers', JSON.stringify(customers));
    }
    
    // Handle order submission
    alert('Order placed successfully! Order ID: ' + order.id);
    
    // Reset form
    setService('Dry Cleaning');
    setOrderItems([{ id: '1', product: 'Top/Shirt-Silk', quantity: 1, unitPrice: 6.50 }]);
    setPickupDate('');
    setPickupTime('');
    setDeliveryDate('');
    setAddress('');
    setNotes('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Place New Order</h1>
        <p className="text-gray-600">Fill in the details for your laundry order</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        {/* Service Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              {services.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Items <span className="text-red-500">*</span>
          </h2>

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
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
                  <div className="relative">
                    <select
                      value={item.product}
                      onChange={(e) => updateOrderItem(item.id, 'product', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      required
                    >
                      {products.map(p => (
                        <option key={p.name} value={p.name}>{p.name} - ${p.price}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateOrderItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-3 text-right">
                <span className="text-sm text-gray-600">Amount: </span>
                <span className="font-semibold text-gray-900">${(item.quantity * item.unitPrice).toFixed(2)}</span>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addOrderItem}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Another Item
          </button>
        </div>

        {/* Order Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (7%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Pickup Charge</span>
              <span>${pickupCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery Charge</span>
              <span>${deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-semibold text-gray-900 text-lg">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Pickup & Delivery Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pickup & Delivery Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Delivery Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup/Delivery Address <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full address..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any special care instructions or notes..."
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Place Order
          </button>
          <button
            type="button"
            className="flex-1 sm:flex-none px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}