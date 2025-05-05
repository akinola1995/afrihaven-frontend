import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Tenants() {
  const { propertyId } = useParams();

  // All mock tenants
  const allTenants = [
    { propertyId: 'p1', name: 'John Doe', unit: 'A1', phone: '08012345678' },
    { propertyId: 'p2', name: 'Jane Smith', unit: 'B2', phone: '08123456789' }
  ];

  const [tenants, setTenants] = useState(
    allTenants.filter((t) => t.propertyId === propertyId)
  );

  const [form, setForm] = useState({
    name: '',
    unit: '',
    phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTenant = {
      ...form,
      propertyId
    };
    setTenants([newTenant, ...tenants]);
    setForm({ name: '', unit: '', phone: '' });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Tenants for Property ID: <span className="text-gray-800">{propertyId}</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4 mb-6"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tenant Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="unit"
          value={form.unit}
          onChange={handleChange}
          placeholder="Unit (e.g. A1)"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Tenant
        </button>
      </form>

      {tenants.length > 0 ? (
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Unit</th>
              <th className="py-3 px-4 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{t.name}</td>
                <td className="py-3 px-4">{t.unit}</td>
                <td className="py-3 px-4">{t.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-gray-500">No tenants listed for this property yet.</p>
      )}
    </div>
  );
}

export default Tenants;
