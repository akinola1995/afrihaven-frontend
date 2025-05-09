// src/pages/Maintenance.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function Maintenance() {
  const { propertyId } = useParams();
  const role = localStorage.getItem('role') || 'Tenant';
  const userEmail = localStorage.getItem('email') || '';
  const userName = userEmail.split('@')[0];

  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    tenant: userName,
    property: '',
    issue: '',
    urgency: 'Medium'
  });

  const [replies, setReplies] = useState({});

  // Load requests from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('maintenance') || '[]');
    const filtered =
      role === 'Tenant'
        ? stored.filter(req => req.tenantEmail === userEmail)
        : stored;
    setRequests(filtered.reverse());
  }, [role, userEmail]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new maintenance request
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now(),
      tenant: form.tenant,
      tenantEmail: userEmail,
      property: form.property,
      issue: form.issue,
      urgency: form.urgency,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      comments: []
    };
    const updated = [newRequest, ...requests];
    localStorage.setItem('maintenance', JSON.stringify(updated));
    setRequests(updated);
    setForm({ tenant: userName, property: '', issue: '', urgency: 'Medium' });
  };

  // Update status
  const handleStatusUpdate = (id, newStatus) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    localStorage.setItem('maintenance', JSON.stringify(updated));
    setRequests(updated);
  };

  // Add comment
  const handleReply = (id) => {
    const msg = replies[id]?.trim();
    if (!msg) return;
    const updated = requests.map(req =>
      req.id === id
        ? {
            ...req,
            comments: [...(req.comments || []), { from: role, text: msg, date: new Date().toISOString() }]
          }
        : req
    );
    localStorage.setItem('maintenance', JSON.stringify(updated));
    setRequests(updated);
    setReplies(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Maintenance Requests {propertyId && `for Property ID: ${propertyId}`}
      </h1>

      {/* Request form - Tenant only */}
      {role === 'Tenant' && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4 mb-6">
          <input
            type="text"
            name="property"
            placeholder="Property (e.g. Block A1)"
            value={form.property}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="issue"
            placeholder="Describe the issue"
            value={form.issue}
            onChange={handleChange}
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit Request</button>
        </form>
      )}

      {/* Maintenance list */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Tenant</th>
              <th className="p-2">Property</th>
              <th className="p-2">Issue</th>
              <th className="p-2">Urgency</th>
              <th className="p-2">Status</th>
              <th className="p-2">Submitted</th>
              {role !== 'Tenant' && <th className="p-2">Update</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} className="border-t">
                <td className="p-2">{req.tenant}</td>
                <td className="p-2">{req.property}</td>
                <td className="p-2">{req.issue}</td>
                <td className="p-2">{req.urgency}</td>
                <td className={`p-2 font-semibold ${req.status === 'Resolved' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {req.status}
                </td>
                <td className="p-2">{formatDistanceToNow(new Date(req.createdAt), { addSuffix: true })}</td>
                {role !== 'Tenant' && (
                  <td className="p-2">
                    <select
                      value={req.status}
                      onChange={e => handleStatusUpdate(req.id, e.target.value)}
                      className="border p-1 rounded"
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
      </div>

      {/* Comments / Replies */}
      {requests.map((req) => (
        <div key={req.id} className="bg-white mt-4 p-4 rounded shadow">
          <h3 className="font-semibold text-sm text-gray-700 mb-2">
            Comments for Request #{req.id}
          </h3>
          {req.comments?.length > 0 ? (
            <ul className="space-y-1 mb-2">
              {req.comments.map((c, i) => (
                <li key={i} className="text-xs text-gray-700">
                  <strong>{c.from}:</strong> {c.text} —{" "}
                  {formatDistanceToNow(new Date(c.date), { addSuffix: true })}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-400">No comments yet.</p>
          )}
          {role !== 'Inquirer' && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={replies[req.id] || ''}
                onChange={(e) => setReplies({ ...replies, [req.id]: e.target.value })}
                placeholder="Write a comment..."
                className="border p-2 rounded w-full text-sm"
              />
              <button
                onClick={() => handleReply(req.id)}
                className="bg-green-600 text-white px-3 rounded text-sm"
              >
                Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Maintenance;
