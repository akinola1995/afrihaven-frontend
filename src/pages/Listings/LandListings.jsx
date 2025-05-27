// import React from 'react';

// function LandListings() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Land Listings</h1>
//       <p className="text-gray-600">See lands available for purchase or lease.</p>
//     </div>
//   );
// }

// export default LandListings;

// src/pages/LandListings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LandListings() {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/properties?type=land')
      .then((res) => setLands(res.data))
      .catch((err) => console.error('Error fetching land listings', err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Land Listings</h1>
      <p className="text-gray-600 mb-6">See lands available for purchase or lease.</p>

      {lands.length === 0 ? (
        <p className="text-sm text-gray-500">No lands listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lands.map((land) => (
            <Link
              to={`/properties/${land.id}/details`}
              key={land.id}
              className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={land.imageUrl || 'https://source.unsplash.com/600x400/?land,property'}
                alt={land.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{land.title}</h2>
                <p className="text-sm text-gray-500">{land.city}, {land.state}</p>
                <p className="text-green-600 font-bold mt-2">₦{land.price?.toLocaleString()}</p>
                {land.bedrooms === 0 && (
                  <p className="text-sm text-gray-600">Land (No Bedrooms)</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default LandListings;
