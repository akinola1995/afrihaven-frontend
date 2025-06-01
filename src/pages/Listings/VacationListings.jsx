// src/pages/Listings/VacationListings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VacationListings() {
  const [vacationHomes, setVacationHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/properties?type=vacation')
      .then(res => {
        setVacationHomes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load vacation listings:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-700 mb-4">Vacation Home Listings</h1>
      <p className="text-gray-600 mb-6">Relax and unwind with beautiful vacation homes across Africa.</p>

      {loading ? (
        <p>Loading vacation properties...</p>
      ) : vacationHomes.length === 0 ? (
        <p>No vacation listings available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vacationHomes.map((home) => (
            <Link
              to={`/properties/${home.id}/details`}
              key={home.id}
              className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={home.imageUrl || 'https://source.unsplash.com/600x400/?vacation,beach'}
                alt={home.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{home.title}</h2>
                <p className="text-sm text-gray-500">{home.city}, {home.state}</p>
                <p className="text-pink-600 font-bold mt-2">₦{home.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{home.bedrooms} Bedroom(s)</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default VacationListings;
