import { Mail, Phone, Plus, UserCheck } from "lucide-react";

export default function Staff() {
  const staff = [
    {
      id: 'S001',
      name: 'Sarah Johnson',
      role: 'Manager',
      phone: '+1 (555) 111-2222',
      email: 'sarah.j@laundry.com',
      status: 'Active',
      joinDate: '2024-01-15',
    },
    {
      id: 'S002',
      name: 'Michael Chen',
      role: 'Delivery Driver',
      phone: '+1 (555) 222-3333',
      email: 'michael.c@laundry.com',
      status: 'Active',
      joinDate: '2024-03-20',
    },
    {
      id: 'S003',
      name: 'Emily Rodriguez',
      role: 'Cleaner',
      phone: '+1 (555) 333-4444',
      email: 'emily.r@laundry.com',
      status: 'Active',
      joinDate: '2024-05-10',
    },
    {
      id: 'S004',
      name: 'David Park',
      role: 'Delivery Driver',
      phone: '+1 (555) 444-5555',
      email: 'david.p@laundry.com',
      status: 'On Leave',
      joinDate: '2024-02-28',
    },
    {
      id: 'S005',
      name: 'Lisa Anderson',
      role: 'Customer Service',
      phone: '+1 (555) 555-6666',
      email: 'lisa.a@laundry.com',
      status: 'Active',
      joinDate: '2024-06-01',
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Manager':
        return 'bg-purple-100 text-purple-800';
      case 'Delivery Driver':
        return 'bg-blue-100 text-blue-800';
      case 'Cleaner':
        return 'bg-green-100 text-green-800';
      case 'Customer Service':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Staff Management</h1>
          <p className="text-gray-600">Manage your team members</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
          <Plus className="w-5 h-5" />
          Add Staff Member
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Staff ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Join Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">{member.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{member.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{member.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{member.joinDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm mr-3">
                    Edit
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Schedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {staff.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <UserCheck className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-500">{member.id}</span>
                </div>
                <div className="font-semibold text-gray-900 text-lg">{member.name}</div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                  {member.role}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{member.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 break-all">{member.email}</span>
              </div>

              <div className="text-sm text-gray-600">
                Joined: {member.joinDate}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2.5 text-green-600 hover:text-green-700 font-medium border border-green-600 rounded-lg">
                Edit
              </button>
              <button className="flex-1 py-2.5 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg">
                View Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
