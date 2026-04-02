import { Mail, Phone, MapPin, CreditCard, Plus, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

export default function Customer() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    // Load customers from localStorage
    const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
    
    // Also get registered users who are clients
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const clientUsers = users.filter((u: any) => u.role === 'client');
    
    // Merge both lists
    const allCustomers = [...storedCustomers];
    
    // Add registered clients if they're not already in customer list
    clientUsers.forEach((user: any) => {
      if (!allCustomers.find((c: any) => c.email === user.email)) {
        allCustomers.push({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: 'N/A',
          type: 'registered',
          joinDate: user.createdAt,
          totalOrders: 0,
        });
      }
    });
    
    setCustomers(allCustomers);
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Customers</h1>
          <p className="text-gray-600">Manage your customer base</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
          <Plus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subscription</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{customer.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{customer.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.subscription === 'None'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {customer.subscription}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm mr-3">
                    Edit
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Orders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Customer ID</div>
                <div className="font-semibold text-gray-900 text-lg">{customer.name}</div>
                <div className="text-sm text-gray-600">{customer.id}</div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {customer.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    customer.subscription === 'None'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {customer.subscription}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{customer.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 break-all">{customer.email}</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <span className="text-gray-700">{customer.address}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2.5 text-green-600 hover:text-green-700 font-medium border border-green-600 rounded-lg">
                Edit
              </button>
              <button className="flex-1 py-2.5 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg">
                View Orders
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}