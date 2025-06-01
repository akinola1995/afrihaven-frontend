import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewProperties() {
  const [properties, setProperties] = useState([]);
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchProperties = async () => {
      if (!email || !role) return;

      try {
        let endpoint = '';
        if (role === 'Owner') {
          endpoint = `http://localhost:8080/api/properties/owner/${email}`;
        } else if (role === 'Agent') {
          endpoint = `http://localhost:8080/api/properties/agent/${email}`;
        } 
        const res = await axios.get(endpoint);
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };

    fetchProperties();
  }, [email, role]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {role === 'Owner' && 'My Properties'}
        {role === 'Agent' && 'Assigned Properties'}
        {(!role || (role !== 'Owner' && role !== 'Agent')) && 'Properties'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{prop.title}</h2>
            <p className="text-sm text-gray-500">{prop.city}, {prop.state}</p>
            <p className="text-xs text-gray-600 mb-3">Type: {prop.type}</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link to={`/properties/${prop.id}/tenants`} className="text-blue-600 underline">Tenants</Link>
              <Link to={`/properties/${prop.id}/rent-status`} className="text-green-600 underline">Rent Status</Link>
              <Link to={`/properties/${prop.id}/maintenance`} className="text-yellow-600 underline">Maintenance</Link>
              <Link to={`/properties/${prop.id}/documents`} className="text-purple-600 underline">Documents</Link>
              <Link to={`/properties/${prop.id}/details`} className="text-blue-500 underline">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewProperties;
