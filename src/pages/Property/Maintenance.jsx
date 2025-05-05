import React from 'react';
import { useParams } from 'react-router-dom';

function Maintenance() {
  const { propertyId } = useParams();

  const requests = [
    { issue: 'Broken tap', status: 'Resolved', date: '2025-04-10' },
    { issue: 'Leaking roof', status: 'Pending', date: '2025-04-18' }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Maintenance - Property: {propertyId}</h1>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">Issue</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4">{r.issue}</td>
              <td className="py-3 px-4">{r.date}</td>
              <td className={`py-3 px-4 font-semibold ${
                r.status === 'Resolved' ? 'text-green-600' : 'text-yellow-600'
              }`}>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Maintenance;
