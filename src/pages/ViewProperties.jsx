// import React from 'react';
// import { Link } from 'react-router-dom';

// function ViewProperties() {
//   const properties = [
//     {
//       id: 'p1',
//       title: '2-Bedroom Flat in Lekki',
//       type: 'Rent',
//       location: 'Lagos',
//     },
//     {
//       id: 'p2',
//       title: 'Land for Sale - Ibadan',
//       type: 'Land',
//       location: 'Oyo',
//     }
//   ];

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">My Properties</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {properties.map((prop) => (
//           <div key={prop.id} className="bg-white p-4 rounded shadow">
//             <h2 className="text-lg font-semibold">{prop.title}</h2>
//             <p className="text-sm text-gray-500">{prop.location}</p>
//             <p className="text-xs text-gray-600 mb-3">Type: {prop.type}</p>
//             <div className="flex gap-2 text-sm">
//               <Link to={`/properties/${prop.id}/tenants`} className="text-blue-600 underline">Tenants</Link>
//               <Link to={`/properties/${prop.id}/rent-status`} className="text-green-600 underline">Rent Status</Link>
//               <Link to={`/properties/${prop.id}/maintenance`} className="text-yellow-600 underline">Maintenance</Link>
//               <Link to={`/properties/${prop.id}/documents`} className="text-purple-600 underline">Documents</Link>
//               <Link
//   to={`/properties/${prop.id}/details`}
//   className="text-blue-500 underline text-sm"
// >
//   View Details
// </Link>

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ViewProperties;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const email = localStorage.getItem('email');
        const res = await axios.get(`/api/properties/owner/${email}`);
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Properties</h1>

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
