import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function Maintenance() {
  const { propertyId } = useParams();
  const role = localStorage.getItem('role') || 'Tenant';

  const [requests, setRequests] = useState([
    {
      id: 1,
      tenant: 'John Doe',
      property: 'Block A1',
      issue: 'Leaking pipe in kitchen',
      status: 'Pending',
      urgency: 'High',
      createdAt: '2025-04-01'
    },
    {
      id: 2,
      tenant: 'Jane Smith',
      property: 'Block B2',
      issue: 'Broken window',
      status: 'Resolved',
      urgency: 'Medium',
      createdAt: '2025-03-28'
    }
  ]);

  const [form, setForm] = useState({
    tenant: '',
    property: '',
    issue: '',
    urgency: 'Medium'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      ...form,
      id: Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
      propertyId
    };
    setRequests([newRequest, ...requests]);
    setForm({ tenant: '', property: '', issue: '', urgency: 'Medium' });
  };

  const handleStatusUpdate = (id, newStatus) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    setRequests(updated);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Maintenance Requests for Property ID: <span className="text-gray-800">{propertyId}</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4 mb-8"
      >
        <input
          type="text"
          name="tenant"
          value={form.tenant}
          onChange={handleChange}
          placeholder="Tenant Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="property"
          value={form.property}
          onChange={handleChange}
          placeholder="Property Block"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="issue"
          value={form.issue}
          onChange={handleChange}
          placeholder="Describe the issue"
          rows={3}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Request
        </button>
      </form>

      <table className="w-full bg-white rounded shadow text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-3">Tenant</th>
            <th className="py-2 px-3">Property</th>
            <th className="py-2 px-3">Issue</th>
            <th className="py-2 px-3">Urgency</th>
            <th className="py-2 px-3">Submitted</th>
            <th className="py-2 px-3">Status</th>
            {role !== 'Tenant' && <th className="py-2 px-3">Update</th>}
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-3">{req.tenant}</td>
              <td className="py-2 px-3">{req.property}</td>
              <td className="py-2 px-3">{req.issue}</td>
              <td className="py-2 px-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    req.urgency === 'High'
                      ? 'bg-red-100 text-red-700'
                      : req.urgency === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {req.urgency}
                </span>
              </td>
              <td className="py-2 px-3">
                {formatDistanceToNow(new Date(req.createdAt), {
                  addSuffix: true
                })}
              </td>
              <td
                className={`py-2 px-3 font-semibold ${
                  req.status === 'Resolved'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {req.status}
              </td>
              {role !== 'Tenant' && (
                <td className="py-2 px-3">
                  <select
                    value={req.status}
                    onChange={(e) =>
                      handleStatusUpdate(req.id, e.target.value)
                    }
                    className="border p-1 rounded text-sm"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {requests.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">
          No maintenance requests for this property yet.
        </p>
      )}
    </div>
  );
}

export default Maintenance;
