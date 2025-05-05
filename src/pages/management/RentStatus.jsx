import React from 'react';

const mockRentData = [
  {
    property: '2-Bedroom Flat in Lekki',
    unit: 'Unit A',
    tenant: 'John Doe',
    dueDate: '2024-05-10',
    amount: '₦800,000',
    status: 'Pending'
  },
  {
    property: '3-Bedroom Duplex in Ikeja',
    unit: 'Full Property',
    tenant: 'Mary Smith',
    dueDate: '2024-05-01',
    amount: '₦1,500,000',
    status: 'Paid'
  },
  {
    property: 'Studio in Asokoro',
    unit: 'Unit 2B',
    tenant: 'Tunde Akin',
    dueDate: '2024-04-25',
    amount: '₦500,000',
    status: 'Overdue'
  }
];

function RentStatus() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Rent Status</h1>
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-blue-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Unit</th>
              <th className="px-4 py-3">Tenant</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockRentData.map((rent, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{rent.property}</td>
                <td className="px-4 py-3">{rent.unit}</td>
                <td className="px-4 py-3">{rent.tenant}</td>
                <td className="px-4 py-3">{rent.dueDate}</td>
                <td className="px-4 py-3">{rent.amount}</td>
                <td className={`px-4 py-3 font-medium ${
                  rent.status === 'Paid' ? 'text-green-600' :
                  rent.status === 'Pending' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {rent.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RentStatus;
