// import React from 'react';
// import { Link } from 'react-router-dom';

// const sampleSaleProperties = [
//   {
//     id: 'sale1',
//     title: '3-Bedroom Bungalow in Ibadan',
//     price: 18000000,
//     city: 'Bodija',
//     state: 'Oyo',
//     country: 'Nigeria',
//     image: 'https://source.unsplash.com/600x400/?house,nigeria',
//     bedrooms: 3
//   },
//   {
//     id: 'sale2',
//     title: 'Land Plot in Port Harcourt',
//     price: 5000000,
//     city: 'Choba',
//     state: 'Rivers',
//     country: 'Nigeria',
//     image: 'https://source.unsplash.com/600x400/?land,property',
//     bedrooms: 0
//   }
// ];

// function SaleExplorer() {
//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-green-700 mb-6">Explore Properties for Sale</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sampleSaleProperties.map((prop) => (
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
//               <p className="text-green-600 font-bold mt-2">₦{prop.price.toLocaleString()}</p>
//               <p className="text-sm text-gray-600">Bedrooms: {prop.bedrooms}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SaleExplorer;

// src/pages/Explore/SaleExplorer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SaleExplorer() {
  const [saleProperties, setSaleProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaleProperties = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/properties/search?type=sale');
        setSaleProperties(res.data);
      } catch (err) {
        console.error("Error fetching sale properties:", err);
        setSaleProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProperties();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Explore Properties for Sale</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : saleProperties.length === 0 ? (
        <p className="text-red-600">No properties listed for sale at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saleProperties.map((prop) => (
            <Link
              to={`/properties/${prop.id}/details`}
              key={prop.id}
              className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={prop.imageUrl || 'https://source.unsplash.com/600x400/?real-estate,house'}
                alt={prop.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{prop.title}</h2>
                <p className="text-sm text-gray-500">{prop.city}, {prop.state}</p>
                <p className="text-green-600 font-bold mt-2">₦{prop.price?.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Bedrooms: {prop.bedrooms}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SaleExplorer;
