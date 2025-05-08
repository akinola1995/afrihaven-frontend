// src/pages/Dashboard/AgentDashboard.jsx
import React, { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';

export default function AgentDashboard() {
  const agentEmail = localStorage.getItem('email') || 'agent@afrihaven.com';

  const mockProperties = [
    {
      id: 'a1',
      title: '2 Bedroom Apartment in Yaba',
      location: 'Yaba, Lagos',
      type: 'rent',
      price: 1200000,
      status: 'Active',
      image: 'https://source.unsplash.com/600x400/?apartment,lagos'
    },
    {
      id: 'a2',
      title: 'Shop Space in Abuja Mall',
      location: 'Wuse, Abuja',
      type: 'rent',
      price: 900000,
      status: 'Active',
      image: 'https://source.unsplash.com/600x400/?shop,abuja'
    }
  ];

  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const filtered = stored.filter(msg => msg.to === agentEmail || msg.toEmail === agentEmail);
    setInquiries(filtered);
  }, [agentEmail]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
        <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">Welcome, Agent</h1>

      {/* Listed Properties */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-3">My Listed Properties</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {mockProperties.map((prop) => (
            <div key={prop.id} className="border rounded p-3">
              <img src={prop.image} alt={prop.title} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="text-gray-800 font-medium">{prop.title}</h3>
              <p className="text-sm text-gray-500">{prop.location}</p>
              <p className="text-blue-600 text-sm font-semibold">₦{prop.price.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Type: {prop.type}</p>
              <p className="text-xs text-green-600 font-medium">{prop.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiries */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Received Inquiries</h2>
        {inquiries.length === 0 ? (
          <p className="text-gray-600 text-sm">No inquiries found.</p>
        ) : (
          <ul className="space-y-3">
            {inquiries.map((msg, i) => (
              <li key={i} className="border-b pb-2">
                <p className="text-sm"><strong>From:</strong> {msg.name} ({msg.email})</p>
                <p className="text-xs text-gray-600">Message: {msg.message}</p>
                <p className="text-xs text-gray-500">{new Date(msg.submittedAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Action */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
        <a
          href="/add-property"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
        >
          Add New Property
        </a>
      </div>
    </div>
  );
}
