import React from 'react';
import { Link } from 'react-router-dom';

const vacationHomes = [
  {
    id: 'vac1',
    title: 'Luxury Beach House in Eleko',
    price: 120000,
    city: 'Eleko',
    state: 'Lagos',
    country: 'Nigeria',
    image: 'https://source.unsplash.com/600x400/?beach-house',
    bedrooms: 4
  },
  {
    id: 'vac2',
    title: 'Ocean View Villa in Port Harcourt',
    price: 95000,
    city: 'Port Harcourt',
    state: 'Rivers',
    country: 'Nigeria',
    image: 'https://source.unsplash.com/600x400/?villa,sea',
    bedrooms: 3
  }
];

function VacationExplorer() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Explore Vacation Homes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vacationHomes.map((prop) => (
          <Link
            to={`/properties/${prop.id}/details`}
            key={prop.id}
            className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={prop.image}
              alt={prop.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{prop.title}</h2>
              <p className="text-sm text-gray-500">{prop.city}, {prop.state}</p>
              <p className="text-pink-600 font-bold mt-2">₦{prop.price.toLocaleString()}/night</p>
              <p className="text-sm text-gray-600">Bedrooms: {prop.bedrooms}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VacationExplorer;
