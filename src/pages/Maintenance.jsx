// src/pages/Maintenance.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function Maintenance() {
  const { propertyId } = useParams();
  const role = localStorage.getItem('role') || 'Tenant';
  const email = localStorage.getItem('email') || '';
  const name = email.split('@')[0];

  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    tenant: name,
    tenantEmail: email,
    propertyId,
    propertyBlock: '',
    issue: '',
    urgency: 'Medium'
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('maintenanceRequests') || '[]');
    const filtered = stored.filter(r => r.propertyId === propertyId);
    setRequests(filtered.reverse());
  }, [propertyId]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now(),
      ...form,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    const updated = [newRequest, ...requests];
    localStorage.setItem('maintenanceRequests', JSON.stringify([newRequest, ...JSON.parse(localStorage.getItem('maintenanceRequests') || '[]')]));
    setRequests(updated);
    setForm({
      tenant: name,
      tenantEmail: email,
      propertyId,
      propertyBlock: '',
      issue: '',
      urgency: 'Medium'
    });
  };

  const handleStatusUpdate = (id, newStatus) => {
    const updated = requests.map(r =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    setRequests(updated);
    const all = JSON.parse(localStorage.getItem('maintenanceRequests') || '[]').map(r =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    localStorage.setItem('maintenanceRequests', JSON.stringify(all));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Maintenance for Property ID: <span className="text-gray-800">{propertyId}</span>
      </h1>

      {/* New Request Form */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Raise New Maintenance Request</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="tenant"
            value={form.tenant}
            onChange={handleChange}
            placeholder="Tenant Name"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="propertyBlock"
            value={form.propertyBlock}
            onChange={handleChange}
            placeholder="Property Block (e.g. A1)"
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="issue"
            value={form.issue}
            onChange={handleChange}
            placeholder="Describe the issue"
            required
            rows={3}
            className="w-full border p-2 rounded"
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
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-3 text-left">Tenant</th>
              <th className="py-2 px-3 text-left">Block</th>
              <th className="py-2 px-3 text-left">Issue</th>
              <th className="py-2 px-3 text-left">Urgency</th>
              <th className="py-2 px-3 text-left">Submitted</th>
              <th className="py-2 px-3 text-left">Status</th>
              {role !== 'Tenant' && <th className="py-2 px-3 text-left">Update</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-3">{req.tenant}</td>
                <td className="py-2 px-3">{req.propertyBlock}</td>
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
                      onChange={(e) => handleStatusUpdate(req.id, e.target.value)}
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
          <p className="p-4 text-sm text-gray-500">No maintenance requests found.</p>
        )}
      </div>
    </div>
  );
}

export default Maintenance;
