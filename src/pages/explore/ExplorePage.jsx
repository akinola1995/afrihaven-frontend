import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const dummyProperties = [
  {
    id: '1',
    title: '3 Bedroom Flat in Lekki',
    type: 'rent',
    propertyType: 'apartment',
    bedrooms: 3,
    price: 1500,
    country: 'Nigeria',
    state: 'Lagos',
    image: 'https://source.unsplash.com/400x250/?apartment,lekki',
  },
  {
    id: '2',
    title: 'Luxury Villa in Cape Town',
    type: 'vacation',
    propertyType: 'bungalow',
    bedrooms: 5,
    price: 4500,
    country: 'South Africa',
    state: 'Western Cape',
    image: 'https://source.unsplash.com/400x250/?villa,sea',
  },
  {
    id: '3',
    title: 'Land for Sale in Accra',
    type: 'sale',
    propertyType: 'land',
    bedrooms: 0,
    price: 20000,
    country: 'Ghana',
    state: 'Accra',
    image: 'https://source.unsplash.com/400x250/?land,ghana',
  },
  {
    id: '4',
    title: 'Short Let Apartment in Nairobi',
    type: 'shortlet',
    propertyType: 'apartment',
    bedrooms: 2,
    price: 900,
    country: 'Kenya',
    state: 'Nairobi',
    image: 'https://source.unsplash.com/400x250/?apartment,nairobi',
  },
  {
    id: '5',
    title: 'Shop in a Mall - Abuja',
    type: 'rent',
    propertyType: 'shop',
    bedrooms: 0,
    price: 1200,
    country: 'Nigeria',
    state: 'Abuja',
    image: 'https://source.unsplash.com/400x250/?shop,mall',
  }
];

export default function ExplorePage() {
  const query = useQuery();
  const type = query.get('type');
  const propertyType = query.get('propertyType');
  const country = query.get('country');
  const state = query.get('state');
  const minPrice = parseInt(query.get('minPrice')) || 0;
  const maxPrice = parseInt(query.get('maxPrice')) || Infinity;
  const bedrooms = parseInt(query.get('bedrooms')) || 0;

  const filtered = dummyProperties.filter((prop) => {
    return (
      (!type || prop.type === type) &&
      (!propertyType || prop.propertyType === propertyType) &&
      (!country || prop.country.toLowerCase() === country.toLowerCase()) &&
      (!state || prop.state.toLowerCase().includes(state.toLowerCase())) &&
      prop.price >= minPrice &&
      prop.price <= maxPrice &&
      (bedrooms === 0 || prop.bedrooms === bedrooms)
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Explore Properties</h1>
      {filtered.length === 0 ? (
        <p className="text-gray-600">No matching properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prop) => (
            <Link
              to={`/properties/${prop.id}/details`}
              key={prop.id}
              className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
            >
              <img src={prop.image} alt={prop.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{prop.title}</h2>
                <p className="text-sm text-gray-500">
                  {prop.country}, {prop.state}
                </p>
                <p className="text-blue-600 font-bold mt-2">${prop.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Bedrooms: {prop.bedrooms}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
