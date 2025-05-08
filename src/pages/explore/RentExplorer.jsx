import React from 'react';
import { Link } from 'react-router-dom';

const sampleRentProperties = [
  {
    id: 'rent1',
    title: '2-Bedroom Apartment in Lekki',
    price: 1200000,
    city: 'Lekki',
    state: 'Lagos',
    image: 'https://source.unsplash.com/600x400/?apartment,lagos',
    bedrooms: 2,
    country: 'Nigeria'
  },
  {
    id: 'rent2',
    title: 'Self-contained in Abuja',
    price: 600000,
    city: 'Gwarinpa',
    state: 'Abuja',
    image: 'https://source.unsplash.com/600x400/?room,abuja',
    bedrooms: 1,
    country: 'Nigeria'
  }
];

function RentExplorer() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Explore Properties for Rent</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleRentProperties.map((prop) => (
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
              <p className="text-blue-600 font-bold mt-2">₦{prop.price.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Bedrooms: {prop.bedrooms}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RentExplorer;
