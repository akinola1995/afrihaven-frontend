import React from 'react';

const shortlets = [
  {
    title: 'Modern Studio Apartment in Lekki Phase 1',
    price: '₦45,000/night',
    city: 'Lekki',
    state: 'Lagos',
    images: [
      'https://source.unsplash.com/600x400/?studio-apartment,lagos',
      'https://source.unsplash.com/600x400/?modern-room'
    ]
  },
  {
    title: 'Cozy 1-Bedroom Short Let in Abuja',
    price: '₦35,000/night',
    city: 'Asokoro',
    state: 'Abuja',
    images: ['https://source.unsplash.com/600x400/?apartment,abuja']
  }
];

function ShortletExplorer() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Explore Short Lets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shortlets.map((prop, i) => (
          <div key={i} className="bg-white rounded shadow p-4">
            <img src={prop.images[0]} alt="cover" className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-semibold text-gray-800 mt-2">{prop.title}</h2>
            <p className="text-sm text-gray-500">{prop.city}, {prop.state}</p>
            <p className="text-purple-600 font-bold">{prop.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShortletExplorer;
