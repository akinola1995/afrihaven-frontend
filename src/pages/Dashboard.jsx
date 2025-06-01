// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function Dashboard() {
//   const role = localStorage.getItem('role') || 'User';
//   const navigate = useNavigate();

//   const baseCards = [
//     {
//       title: 'Total Properties',
//       value: '8',
//       color: 'blue-600',
//       roles: ['Owner', 'Admin'],
//       link: '/properties'
//     },
//     {
//       title: 'Total Tenants',
//       value: '16',
//       color: 'green-600',
//       roles: ['Owner', 'Agent'],
//       link: '/properties'
//     },
//     {
//       title: 'Pending Rents',
//       value: '₦250,000',
//       color: 'red-500',
//       roles: ['Owner'],
//       link: '/dashboard' // You can update this later
//     },
//     {
//       title: 'Active Listings',
//       value: '12',
//       color: 'purple-600',
//       roles: ['Agent'],
//       link: '/listings/rent'
//     },
//     {
//       title: 'Inquiries',
//       value: '5',
//       color: 'yellow-500',
//       roles: ['Agent'],
//       link: '/dashboard'
//     },
//     {
//       title: 'Next Rent Due',
//       value: 'May 30, 2025',
//       color: 'orange-600',
//       roles: ['Tenant'],
//       link: '/properties'
//     },
//     {
//       title: 'Maintenance Requests',
//       value: '2',
//       color: 'pink-500',
//       roles: ['Tenant'],
//       link: '/properties'
//     },
//     {
//       title: 'Saved Listings',
//       value: '6',
//       color: 'cyan-600',
//       roles: ['Buyer'],
//       link: '/listings/sale'
//     },
//     {
//       title: 'Active Applications',
//       value: '3',
//       color: 'indigo-600',
//       roles: ['Renter'],
//       link: '/listings/rent'
//     },
//     {
//       title: 'Total Users',
//       value: '87',
//       color: 'blue-800',
//       roles: ['Admin'],
//       link: '/dashboard'
//     },
//     {
//       title: 'Reported Listings',
//       value: '1',
//       color: 'red-700',
//       roles: ['Admin'],
//       link: '/dashboard'
//     }
//   ];

//   const filteredCards = baseCards.filter((card) => card.roles.includes(role));

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-blue-700">Welcome, {role}!</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {filteredCards.map((card, index) => (
//           <div key={index} className="bg-white shadow p-4 rounded flex flex-col justify-between h-48">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-700">{card.title}</h2>
//               <p className={`text-3xl font-bold text-${card.color}`}>{card.value}</p>
//             </div>
//             <button
//               onClick={() => navigate(card.link)}
//               className="mt-4 text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
//             >
//               View
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const role = localStorage.getItem('role') || 'User';
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const cardsMap = {
    Owner: [
      { key: 'totalProperties', title: 'Total Properties', color: 'blue-600', link: '/properties' },
      { key: 'totalTenants', title: 'Total Tenants', color: 'green-600', link: '/properties' },
      { key: 'pendingRents', title: 'Pending Rents', color: 'red-500', link: '/dashboard/rents' }
    ],
    Agent: [
      { key: 'activeListings', title: 'Active Listings', color: 'purple-600', link: '/listings/rent' },
      { key: 'inquiries', title: 'Inquiries', color: 'yellow-500', link: '/inquiries' },
      { key: 'totalTenants', title: 'Total Tenants', color: 'green-600', link: '/tenants' }
    ],
    Tenant: [
      { key: 'nextRentDue', title: 'Next Rent Due', color: 'orange-600', link: '/dashboard/rents' },
      { key: 'maintenanceRequests', title: 'Maintenance Requests', color: 'pink-500', link: '/maintenance' }
    ],
    Buyer: [
      { key: 'savedListings', title: 'Saved Listings', color: 'cyan-600', link: '/listings/sale' }
    ],
    Renter: [
      { key: 'activeApplications', title: 'Active Applications', color: 'indigo-600', link: '/listings/rent' }
    ],
    Admin: [
      { key: 'totalUsers', title: 'Total Users', color: 'blue-800', link: '/users' },
      { key: 'reportedListings', title: 'Reported Listings', color: 'red-700', link: '/admin/reports' },
      { key: 'totalProperties', title: 'Total Properties', color: 'blue-600', link: '/properties' }
    ]
  };

  useEffect(() => {
    async function fetchStats() {
      try {
        const email = localStorage.getItem('email');
        const res = await axios.get(`http://localhost:8080/api/dashboard/${role.toLowerCase()}?email=${email}`);
        setStats(res.data);
      } catch (err) {
        console.error('Dashboard data error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [role]);

  const cards = cardsMap[role] || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">Welcome, {role}!</h1>

      {loading ? (
        <p className="text-gray-500">Loading dashboard data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow p-4 rounded flex flex-col justify-between h-44"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{card.title}</h2>
                <p className={`text-3xl font-bold text-${card.color}`}>
                  {stats[card.key] ?? '0'}
                </p>
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
      )}
    </div>
  );
}

export default Dashboard;
