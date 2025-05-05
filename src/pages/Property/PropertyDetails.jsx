import React from 'react';
import { Link, useParams } from 'react-router-dom';

function PropertyDetails() {
  const { propertyId } = useParams();

  // You can later replace this with backend data
  const mockProperty = {
    id: propertyId,
    title: '3-Bedroom Apartment in Ikoyi',
    type: 'Rent',
    location: 'Ikoyi, Lagos',
    price: '₦3,000,000/year',
    image: 'https://source.unsplash.com/800x400/?apartment,building'
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Property Details: <span className="text-blue-700">{mockProperty.title}</span>
      </h1>

      <div className="bg-white rounded shadow p-4 mb-6">
        <img
          src={mockProperty.image}
          alt="Property"
          className="w-full h-64 object-cover rounded mb-4"
        />
        <p className="text-gray-700"><strong>Location:</strong> {mockProperty.location}</p>
        <p className="text-gray-700"><strong>Type:</strong> {mockProperty.type}</p>
        <p className="text-gray-700"><strong>Price:</strong> {mockProperty.price}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to={`/properties/${propertyId}/tenants`}
          className="block bg-blue-100 hover:bg-blue-200 p-4 rounded shadow text-blue-900 font-medium text-center"
        >
          👥 Manage Tenants
        </Link>

        <Link
          to={`/properties/${propertyId}/rent-status`}
          className="block bg-green-100 hover:bg-green-200 p-4 rounded shadow text-green-900 font-medium text-center"
        >
          💸 View Rent Status
        </Link>

        <Link
          to={`/properties/${propertyId}/maintenance`}
          className="block bg-yellow-100 hover:bg-yellow-200 p-4 rounded shadow text-yellow-900 font-medium text-center"
        >
          🛠️ Maintenance Requests
        </Link>

        <Link
          to={`/properties/${propertyId}/documents`}
          className="block bg-purple-100 hover:bg-purple-200 p-4 rounded shadow text-purple-900 font-medium text-center"
        >
          📁 Uploaded Documents
        </Link>
      </div>
    </div>
  );
}

export default PropertyDetails;
