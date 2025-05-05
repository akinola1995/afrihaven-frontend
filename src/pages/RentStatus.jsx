import React from 'react';

function RentStatus() {
  // Sample rent history data
  const payments = [
    { tenant: 'John Doe', property: 'Block A1', amount: 120000, date: '2025-03-01', status: 'Paid' },
    { tenant: 'Jane Smith', property: 'Block B2', amount: 100000, date: '2025-03-05', status: 'Unpaid' },
    { tenant: 'Akin Oladipo', property: 'Block C3', amount: 80000, date: '2025-03-10', status: 'Partial' }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Rent Payments History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-6 text-left">Tenant</th>
              <th className="py-3 px-6 text-left">Property</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-3 px-6">{payment.tenant}</td>
                <td className="py-3 px-6">{payment.property}</td>
                <td className="py-3 px-6">₦{payment.amount.toLocaleString()}</td>
                <td className="py-3 px-6">{payment.date}</td>
                <td className={`py-3 px-6 font-semibold ${
                  payment.status === 'Paid'
                    ? 'text-green-600'
                    : payment.status === 'Unpaid'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}>
                  {payment.status}
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
