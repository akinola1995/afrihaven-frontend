// import React from 'react';

// function SaleListings() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Properties for Sale</h1>
//       <p className="text-gray-600">List of properties currently available for sale.</p>
//     </div>
//   );
// }

// export default SaleListings;

// src/pages/Listings/SaleListings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SaleListings() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/properties?type=sale')
      .then(res => {
        setSales(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching sales:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Properties for Sale</h1>
      <p className="text-gray-600 mb-6">List of properties currently available for sale.</p>

      {loading ? (
        <p>Loading...</p>
      ) : sales.length === 0 ? (
        <p>No sale listings available at this time.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sales.map((prop) => (
            <Link
              to={`/properties/${prop.id}/details`}
              key={prop.id}
              className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={prop.imageUrl || 'https://source.unsplash.com/600x400/?house'}
                alt={prop.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{prop.title}</h2>
                <p className="text-sm text-gray-500">{prop.city}, {prop.state}</p>
                <p className="text-green-600 font-bold mt-2">₦{prop.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{prop.bedrooms} Bedroom(s)</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SaleListings;
