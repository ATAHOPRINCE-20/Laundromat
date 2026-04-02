import { useState } from "react";
import { Plus, Trash2, Edit2, DollarSign, Calendar } from "lucide-react";

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      category: 'Utilities',
      description: 'Electricity Bill',
      amount: 250.00,
      date: '2026-03-20',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: '2',
      category: 'Supplies',
      description: 'Detergent and Cleaning Supplies',
      amount: 180.50,
      date: '2026-03-22',
      paymentMethod: 'Cash',
    },
    {
      id: '3',
      category: 'Equipment',
      description: 'Washing Machine Repair',
      amount: 350.00,
      date: '2026-03-24',
      paymentMethod: 'Card',
    },
    {
      id: '4',
      category: 'Salaries',
      description: 'Staff Wages - March',
      amount: 2500.00,
      date: '2026-03-25',
      paymentMethod: 'Bank Transfer',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Utilities',
    description: '',
    amount: '',
    date: '',
    paymentMethod: 'Cash',
  });

  const categories = ['Utilities', 'Supplies', 'Equipment', 'Salaries', 'Rent', 'Marketing', 'Transportation', 'Other'];
  const paymentMethods = ['Cash', 'Card', 'Bank Transfer', 'Mobile Money'];

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date,
      paymentMethod: formData.paymentMethod,
    };

    setExpenses([newExpense, ...expenses]);
    setFormData({
      category: 'Utilities',
      description: '',
      amount: '',
      date: '',
      paymentMethod: 'Cash',
    });
    setShowAddModal(false);
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Expenses</h1>
          <p className="text-gray-600">Track and manage business expenses</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 rounded-xl p-5 border border-red-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="text-sm text-red-700 font-medium">Total Expenses</div>
              <div className="text-2xl font-bold text-red-800">${totalExpenses.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
          <div className="text-sm text-blue-700 font-medium mb-1">This Month</div>
          <div className="text-2xl font-bold text-blue-800">${totalExpenses.toFixed(2)}</div>
        </div>

        <div className="bg-green-50 rounded-xl p-5 border border-green-200">
          <div className="text-sm text-green-700 font-medium mb-1">Categories</div>
          <div className="text-2xl font-bold text-green-800">{Object.keys(expensesByCategory).length}</div>
        </div>

        <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
          <div className="text-sm text-purple-700 font-medium mb-1">Transactions</div>
          <div className="text-2xl font-bold text-purple-800">{expenses.length}</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Expenses by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(expensesByCategory).map(([category, amount]) => (
            <div key={category} className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{category}</div>
              <div className="text-xl font-bold text-gray-900">${amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Payment Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{expense.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{expense.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{expense.paymentMethod}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-red-600">${expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-200">
          {expenses.map((expense) => (
            <div key={expense.id} className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {expense.category}
                  </span>
                  <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {expense.date}
                  </div>
                </div>
                <div className="text-xl font-bold text-red-600">${expense.amount.toFixed(2)}</div>
              </div>
              <div className="mb-3">
                <div className="text-sm text-gray-900 font-medium">{expense.description}</div>
                <div className="text-sm text-gray-500 mt-1">Payment: {expense.paymentMethod}</div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium text-sm flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="flex-1 py-2 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Expense</h2>
            </div>

            <form onSubmit={handleAddExpense} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Add Expense
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
