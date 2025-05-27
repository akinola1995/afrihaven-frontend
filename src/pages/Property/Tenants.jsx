// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function Tenants() {
//   const { propertyId } = useParams();

//   const [assignments, setAssignments] = useState([]);
//   const [manualTenants, setManualTenants] = useState([]);
//   const [form, setForm] = useState({ name: '', unit: '', phone: '' });

//   // Load from localStorage
//   useEffect(() => {
//     const assigned = JSON.parse(localStorage.getItem('tenantAssignments') || '[]');
//     const manual = JSON.parse(localStorage.getItem('manualTenants') || '[]');

//     setAssignments(assigned.filter((t) => t.propertyId === propertyId));
//     setManualTenants(manual.filter((t) => t.propertyId === propertyId));
//   }, [propertyId]);

//   // Add manual tenant
//   const handleManualSubmit = (e) => {
//     e.preventDefault();
//     const newTenant = { ...form, propertyId };
//     const updated = [newTenant, ...manualTenants];
//     const allManual = JSON.parse(localStorage.getItem('manualTenants') || '[]');
//     localStorage.setItem('manualTenants', JSON.stringify([newTenant, ...allManual]));
//     setManualTenants(updated);
//     setForm({ name: '', unit: '', phone: '' });
//   };

//   // Delete email-assigned tenant
//   const deleteAssigned = (index) => {
//     const stored = JSON.parse(localStorage.getItem('tenantAssignments') || '[]');
//     const toRemove = assignments[index];
//     const updated = stored.filter((t) => !(t.email === toRemove.email && t.propertyId === propertyId));
//     localStorage.setItem('tenantAssignments', JSON.stringify(updated));
//     setAssignments(updated.filter((t) => t.propertyId === propertyId));
//   };

//   // Delete manual tenant
//   const deleteManual = (index) => {
//     const stored = JSON.parse(localStorage.getItem('manualTenants') || '[]');
//     const toRemove = manualTenants[index];
//     const updated = stored.filter((t) => !(t.name === toRemove.name && t.phone === toRemove.phone && t.propertyId === propertyId));
//     localStorage.setItem('manualTenants', JSON.stringify(updated));
//     setManualTenants(updated.filter((t) => t.propertyId === propertyId));
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-blue-800">
//         Tenants for Property ID: <span className="text-gray-800">{propertyId}</span>
//       </h1>

//       {/* Email-Based Assigned Tenants */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-2">Assigned Tenants (via Email)</h2>
//         {assignments.length === 0 ? (
//           <p className="text-sm text-gray-500">No assigned tenants yet.</p>
//         ) : (
//           <ul className="space-y-2">
//             {assignments.map((t, i) => (
//               <li key={i} className="border-b pb-2 text-sm text-gray-700 flex justify-between items-center">
//                 <div>
//                   <strong>Email:</strong> {t.email} <br />
//                   <span className="text-xs text-gray-500">
//                     Assigned: {new Date(t.assignedAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => deleteAssigned(i)}
//                   className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
//                 >
//                   Unassign
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Add Manual Tenant */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Tenant Manually</h2>
//         <form onSubmit={handleManualSubmit} className="space-y-3">
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             placeholder="Tenant Name"
//             required
//             className="w-full border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="unit"
//             value={form.unit}
//             onChange={(e) => setForm({ ...form, unit: e.target.value })}
//             placeholder="Unit (e.g. A1)"
//             required
//             className="w-full border p-2 rounded"
//           />
//           <input
//             type="tel"
//             name="phone"
//             value={form.phone}
//             onChange={(e) => setForm({ ...form, phone: e.target.value })}
//             placeholder="Phone Number"
//             required
//             className="w-full border p-2 rounded"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Add Tenant
//           </button>
//         </form>
//       </div>

//       {/* Manual Tenants Table */}
//       {manualTenants.length > 0 && (
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-2">Manual Tenants</h2>
//           <table className="w-full text-sm">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="py-2 px-3 text-left">Name</th>
//                 <th className="py-2 px-3 text-left">Unit</th>
//                 <th className="py-2 px-3 text-left">Phone</th>
//                 <th className="py-2 px-3 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {manualTenants.map((t, i) => (
//                 <tr key={i} className="border-t">
//                   <td className="py-2 px-3">{t.name}</td>
//                   <td className="py-2 px-3">{t.unit}</td>
//                   <td className="py-2 px-3">{t.phone}</td>
//                   <td className="py-2 px-3">
//                     <button
//                       onClick={() => deleteManual(i)}
//                       className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Tenants;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Tenants() {
  const { propertyId } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [manualTenants, setManualTenants] = useState([]);
  const [form, setForm] = useState({ name: '', unit: '', phone: '' });

  // Load tenants on mount
  useEffect(() => {
    if (propertyId) {
      axios.get(`/api/tenants/assignments/${propertyId}`)
        .then(res => setAssignments(res.data))
        .catch(err => console.error('Error loading assignments:', err));

      axios.get(`/api/tenants/manual/${propertyId}`)
        .then(res => setManualTenants(res.data))
        .catch(err => console.error('Error loading manual tenants:', err));
    }
  }, [propertyId]);

  // Handle manual tenant form change
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add manual tenant
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/tenants/manual', {
        ...form,
        propertyId,
      });
      setManualTenants([res.data, ...manualTenants]);
      setForm({ name: '', unit: '', phone: '' });
    } catch (error) {
      console.error('Failed to add manual tenant:', error);
    }
  };

  // Delete email-based tenant
  const deleteAssigned = async (id) => {
    try {
      await axios.delete(`/api/tenants/assignments/${id}`);
      setAssignments(assignments.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete assigned tenant:', error);
    }
  };

  // Delete manual tenant
  const deleteManual = async (id) => {
    try {
      await axios.delete(`/api/tenants/manual/${id}`);
      setManualTenants(manualTenants.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete manual tenant:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Tenants for Property ID: <span className="text-gray-800">{propertyId}</span>
      </h1>

      {/* Assigned Tenants */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Assigned Tenants (via Email)</h2>
        {assignments.length === 0 ? (
          <p className="text-sm text-gray-500">No assigned tenants yet.</p>
        ) : (
          <ul className="space-y-2">
            {assignments.map((t) => (
              <li key={t.id} className="border-b pb-2 text-sm text-gray-700 flex justify-between items-center">
                <div>
                  <strong>Email:</strong> {t.email} <br />
                  <span className="text-xs text-gray-500">
                    Assigned: {new Date(t.assignedAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => deleteAssigned(t.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                >
                  Unassign
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Manual Tenant */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Tenant Manually</h2>
        <form onSubmit={handleManualSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Tenant Name"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="unit"
            value={form.unit}
            onChange={handleFormChange}
            placeholder="Unit (e.g. A1)"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleFormChange}
            placeholder="Phone Number"
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Tenant
          </button>
        </form>
      </div>

      {/* Manual Tenants Table */}
      {manualTenants.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Manual Tenants</h2>
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Unit</th>
                <th className="py-2 px-3 text-left">Phone</th>
                <th className="py-2 px-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {manualTenants.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="py-2 px-3">{t.name}</td>
                  <td className="py-2 px-3">{t.unit}</td>
                  <td className="py-2 px-3">{t.phone}</td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => deleteManual(t.id)}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Tenants;
