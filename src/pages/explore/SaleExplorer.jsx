import React from 'react';

const sampleSaleProperties = [
  {
    title: '3-Bedroom Bungalow in Ibadan',
    price: '₦18,000,000',
    city: 'Bodija',
    state: 'Oyo',
    images: ['https://source.unsplash.com/600x400/?house,nigeria']
  },
  {
    title: 'Land Plot in Port Harcourt',
    price: '₦5,000,000',
    city: 'Choba',
    state: 'Rivers',
    images: ['https://source.unsplash.com/600x400/?land,property']
  }
];

function SaleExplorer() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Explore Properties for Sale</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleSaleProperties.map((prop, i) => (
          <div key={i} className="bg-white rounded shadow p-4">
            <img src={prop.images[0]} alt="cover" className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-semibold text-gray-800 mt-2">{prop.title}</h2>
            <p className="text-sm text-gray-500">{prop.city}, {prop.state}</p>
            <p className="text-green-600 font-bold">{prop.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SaleExplorer;
