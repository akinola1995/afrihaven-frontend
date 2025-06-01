// import React from 'react';

// function ShortletListings() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Short Lets & Vacation Rentals</h1>
//       <p className="text-gray-600">Browse short-term and vacation rental listings here.</p>
//     </div>
//   );
// }

// export default ShortletListings;


// src/pages/Listings/ShortletListings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShortletListings() {
  const [shortlets, setShortlets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/properties?type=shortlet')
      .then(res => {
        setShortlets(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching shortlets:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Short Lets & Vacation Rentals</h1>
      <p className="text-gray-600 mb-6">Browse short-term and vacation rental listings here.</p>

      {loading ? (
        <p>Loading...</p>
      ) : shortlets.length === 0 ? (
        <p>No shortlet listings available at this time.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlets.map((prop) => (
            <Link
              to={`/properties/${prop.id}/details`}
              key={prop.id}
              className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={prop.imageUrl || 'https://source.unsplash.com/600x400/?apartment'}
                alt={prop.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{prop.title}</h2>
                <p className="text-sm text-gray-500">{prop.city}, {prop.state}</p>
                <p className="text-purple-600 font-bold mt-2">₦{prop.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{prop.bedrooms} Bedroom(s)</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShortletListings;
