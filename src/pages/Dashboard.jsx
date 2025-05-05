import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const role = localStorage.getItem('role') || 'User';
  const navigate = useNavigate();

  const baseCards = [
    {
      title: 'Total Properties',
      value: '8',
      color: 'blue-600',
      roles: ['Owner', 'Admin'],
      link: '/properties'
    },
    {
      title: 'Total Tenants',
      value: '16',
      color: 'green-600',
      roles: ['Owner', 'Agent'],
      link: '/properties'
    },
    {
      title: 'Pending Rents',
      value: '₦250,000',
      color: 'red-500',
      roles: ['Owner'],
      link: '/dashboard' // You can update this later
    },
    {
      title: 'Active Listings',
      value: '12',
      color: 'purple-600',
      roles: ['Agent'],
      link: '/listings/rent'
    },
    {
      title: 'Inquiries',
      value: '5',
      color: 'yellow-500',
      roles: ['Agent'],
      link: '/dashboard'
    },
    {
      title: 'Next Rent Due',
      value: 'May 30, 2025',
      color: 'orange-600',
      roles: ['Tenant'],
      link: '/properties'
    },
    {
      title: 'Maintenance Requests',
      value: '2',
      color: 'pink-500',
      roles: ['Tenant'],
      link: '/properties'
    },
    {
      title: 'Saved Listings',
      value: '6',
      color: 'cyan-600',
      roles: ['Buyer'],
      link: '/listings/sale'
    },
    {
      title: 'Active Applications',
      value: '3',
      color: 'indigo-600',
      roles: ['Renter'],
      link: '/listings/rent'
    },
    {
      title: 'Total Users',
      value: '87',
      color: 'blue-800',
      roles: ['Admin'],
      link: '/dashboard'
    },
    {
      title: 'Reported Listings',
      value: '1',
      color: 'red-700',
      roles: ['Admin'],
      link: '/dashboard'
    }
  ];

  const filteredCards = baseCards.filter((card) => card.roles.includes(role));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">Welcome, {role}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCards.map((card, index) => (
          <div key={index} className="bg-white shadow p-4 rounded flex flex-col justify-between h-48">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">{card.title}</h2>
              <p className={`text-3xl font-bold text-${card.color}`}>{card.value}</p>
            </div>
            <button
              onClick={() => navigate(card.link)}
              className="mt-4 text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
