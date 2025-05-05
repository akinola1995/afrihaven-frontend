import React from 'react';

const vacationHomes = [
  {
    title: 'Luxury Beach House in Eleko',
    price: '₦120,000/night',
    city: 'Eleko',
    state: 'Lagos',
    images: ['https://source.unsplash.com/600x400/?beach-house']
  },
  {
    title: 'Ocean View Villa in Port Harcourt',
    price: '₦95,000/night',
    city: 'Port Harcourt',
    state: 'Rivers',
    images: ['https://source.unsplash.com/600x400/?villa,sea']
  }
];

function VacationExplorer() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Explore Vacation Homes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vacationHomes.map((prop, i) => (
          <div key={i} className="bg-white rounded shadow p-4">
            <img src={prop.images[0]} alt="cover" className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-semibold text-gray-800 mt-2">{prop.title}</h2>
            <p className="text-sm text-gray-500">{prop.city}, {prop.state}</p>
            <p className="text-pink-600 font-bold">{prop.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VacationExplorer;
