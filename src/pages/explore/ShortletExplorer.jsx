// import React from 'react';
// import { Link } from 'react-router-dom';

// const sampleShortletProperties = [
//   {
//     id: 'shortlet1',
//     title: 'Studio Apartment in Lekki Phase 1',
//     price: 40000,
//     city: 'Lekki',
//     state: 'Lagos',
//     country: 'Nigeria',
//     image: 'https://source.unsplash.com/600x400/?studio,apartment',
//     bedrooms: 1
//   },
//   {
//     id: 'shortlet2',
//     title: '2-Bedroom Short Let in Accra',
//     price: 55000,
//     city: 'Osu',
//     state: 'Accra',
//     country: 'Ghana',
//     image: 'https://source.unsplash.com/600x400/?apartment,accra',
//     bedrooms: 2
//   }
// ];

// function ShortletExplorer() {
//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-purple-700 mb-6">Explore Short Let Properties</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sampleShortletProperties.map((prop) => (
//           <Link
//             to={`/properties/${prop.id}/details`}
//             key={prop.id}
//             className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
//           >
//             <img
//               src={prop.image}
//               alt={prop.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-lg font-semibold text-gray-800">{prop.title}</h2>
//               <p className="text-sm text-gray-500">{prop.city}, {prop.state}</p>
//               <p className="text-purple-600 font-bold mt-2">₦{prop.price.toLocaleString()}</p>
//               <p className="text-sm text-gray-600">Bedrooms: {prop.bedrooms}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ShortletExplorer;

// src/pages/Explore/ShortletExplorer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShortletExplorer() {
  const [shortletProperties, setShortletProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShortlets = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/properties/search?type=shortlet');
        setShortletProperties(res.data);
      } catch (err) {
        console.error("Error fetching shortlet properties:", err);
        setShortletProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShortlets();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Explore Short Let Properties</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : shortletProperties.length === 0 ? (
        <p className="text-red-600">No short let properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortletProperties.map((prop) => (
            <Link
              to={`/properties/${prop.id}/details`}
              key={prop.id}
              className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={prop.imageUrl || 'https://source.unsplash.com/600x400/?shortlet,apartment'}
                alt={prop.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{prop.title}</h2>
                <p className="text-sm text-gray-500">{prop.city}, {prop.state}</p>
                <p className="text-purple-600 font-bold mt-2">₦{prop.price?.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Bedrooms: {prop.bedrooms}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShortletExplorer;
