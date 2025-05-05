import React from 'react';

function ViewTenants() {
  // Sample tenant data
  const tenants = [
    { name: 'John Doe', unit: 'A1', rentStatus: 'Paid', phone: '08012345678' },
    { name: 'Jane Smith', unit: 'B2', rentStatus: 'Due', phone: '08087654321' },
    { name: 'Akin Oladipo', unit: 'C3', rentStatus: 'Partially Paid', phone: '08123456789' }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tenants</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Unit</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Rent Status</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-3 px-6">{tenant.name}</td>
                <td className="py-3 px-6">{tenant.unit}</td>
                <td className="py-3 px-6">{tenant.phone}</td>
                <td className={`py-3 px-6 font-semibold ${
                  tenant.rentStatus === 'Paid'
                    ? 'text-green-600'
                    : tenant.rentStatus === 'Due'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}>
                  {tenant.rentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewTenants;
