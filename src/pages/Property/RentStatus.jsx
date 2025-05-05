import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, formatDistanceToNowStrict, isPast, parseISO } from 'date-fns';

function RentStatus() {
  const { propertyId } = useParams();
  const role = localStorage.getItem('role') || 'Tenant';

  const [rents, setRents] = useState([
    {
      id: 1,
      tenant: 'John Doe',
      amount: 250000,
      dueDate: '2025-05-01',
      status: 'Unpaid'
    },
    {
      id: 2,
      tenant: 'Jane Smith',
      amount: 180000,
      dueDate: '2025-04-20',
      status: 'Paid'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = rents.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    setRents(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Rent Status for Property ID: <span className="text-gray-800">{propertyId}</span>
      </h1>

      <table className="w-full bg-white rounded shadow text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-3 text-left">Tenant</th>
            <th className="py-2 px-3 text-left">Amount</th>
            <th className="py-2 px-3 text-left">Due Date</th>
            <th className="py-2 px-3 text-left">Status</th>
            {role !== 'Tenant' && <th className="py-2 px-3 text-left">Update</th>}
          </tr>
        </thead>
        <tbody>
          {rents.map((r) => {
            const due = parseISO(r.dueDate);
            const isLate = r.status !== 'Paid' && isPast(due);
            const relative = formatDistanceToNowStrict(due, { addSuffix: true });

            return (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-3">{r.tenant}</td>
                <td className="py-2 px-3 font-medium">₦{r.amount.toLocaleString()}</td>
                <td className="py-2 px-3">
                  {format(due, 'MMM d, yyyy')}
                  <span className={`ml-2 text-xs font-medium ${
                    isLate ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    ({relative})
                  </span>
                </td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    r.status === 'Paid'
                      ? 'bg-green-100 text-green-700'
                      : isLate
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {r.status}
                  </span>
                </td>
                {role !== 'Tenant' && (
                  <td className="py-2 px-3">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className="border p-1 rounded text-sm"
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {rents.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">No rent records available yet.</p>
      )}
    </div>
  );
}

export default RentStatus;
