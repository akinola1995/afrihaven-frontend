import React, { useState } from 'react';

function Listings() {
  const [filter, setFilter] = useState('All');

  const properties = [
    {
      title: '2 Bedroom Apartment - Lekki',
      type: 'Rent',
      image: 'https://source.unsplash.com/400x250/?apartment',
      price: '₦1,200,000/year',
      location: 'Lagos'
    },
    {
      title: 'Beach House - Badagry',
      type: 'Vacation',
      image: 'https://source.unsplash.com/400x250/?beach-house',
      price: '₦45,000/night',
      location: 'Lagos'
    },
    {
      title: 'Land for Sale - Ibadan',
      type: 'Land',
      image: 'https://source.unsplash.com/400x250/?land',
      price: '₦3,000,000',
      location: 'Oyo'
    },
    {
      title: '5 Bedroom Duplex - Abuja',
      type: 'Sale',
      image: 'https://source.unsplash.com/400x250/?duplex',
      price: '₦80,000,000',
      location: 'FCT'
    }
  ];

  const filtered = filter === 'All' ? properties : properties.filter(p => p.type === filter);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Property Listings</h1>

      <div className="mb-6 flex gap-2 flex-wrap">
        {['All', 'Rent', 'Sale', 'Vacation', 'Land'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border ${
              filter === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((prop, index) => (
          <div key={index} className="bg-white rounded shadow overflow-hidden">
            <img src={prop.image} alt={prop.title} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{prop.title}</h2>
              <p className="text-sm text-gray-600">{prop.location}</p>
              <p className="text-blue-700 font-bold">{prop.price}</p>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-800">{prop.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listings;
