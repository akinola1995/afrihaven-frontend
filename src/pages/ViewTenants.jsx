import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // If you use route param for propertyId
import axios from 'axios';

function ViewTenants({ propertyId: propPropertyId }) {
  // If using router param: /properties/:propertyId/tenants
  const { propertyId } = useParams();
  // Or get propertyId from props if passed as prop
  const id = propPropertyId || propertyId;

  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // You may want to change endpoint as per your backend API
    const fetchTenants = async () => {
      setLoading(true);
      try {
        // Example endpoint: /api/tenants/property/{propertyId}
        const res = await axios.get(`http://localhost:8080/api/tenants/property/${id}`);
        setTenants(res.data); // expects [{ name, unit, phone, rentStatus }, ...]
      } catch (err) {
        console.error('Failed to fetch tenants:', err);
        setTenants([]);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTenants();
  }, [id]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tenants</h1>
      {loading ? (
        <p className="text-gray-500">Loading tenants...</p>
      ) : tenants.length === 0 ? (
        <p className="text-gray-500">No tenants found for this property.</p>
      ) : (
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
                <tr key={tenant.id || index} className="border-t hover:bg-gray-50">
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
      )}
    </div>
  );
}

export default ViewTenants;

