// // src/pages/Dashboard/BuyerDashboard.jsx
// import React from 'react';
// import BackButton from '../../components/BackButton';

// export default function BuyerDashboard() {
//   const email = localStorage.getItem('email');

//   const dummyInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]').filter(
//     (inq) => inq.email === email
//   );

//   return (
//     <div className="p-6 max-w-5xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold text-blue-800">Welcome, Buyer</h1>

//       <div className="bg-white rounded shadow p-4">
//         <h2 className="text-lg font-semibold mb-2">My Inquiries</h2>
//         {dummyInquiries.length === 0 ? (
//           <p className="text-gray-600">No inquiries found.</p>
//         ) : (
//           <ul className="space-y-2">
//             {dummyInquiries.map((inq, idx) => (
//               <li key={idx} className="border-b pb-2">
//                 <p className="text-sm text-gray-700">{inq.message}</p>
//                 <p className="text-xs text-gray-500">
//                   Sent: {new Date(inq.submittedAt).toLocaleDateString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="bg-white rounded shadow p-4">
//       <BackButton />
//         <h2 className="text-lg font-semibold mb-2">Explore Properties</h2>
//         <div className="flex gap-4">
//           <a
//             href="/explore?type=sale"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
//           >
//             Explore Properties for Sale
//           </a>
//           <a
//             href="/explore?type=rent"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
//           >
//             Explore Properties for Rent
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';

export default function BuyerDashboard() {
  const email = localStorage.getItem('email');
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (email) {
      axios.get(`/api/inquiries/by-email?email=${email}`)
        .then((res) => setInquiries(res.data))
        .catch((err) => console.error("Error fetching buyer inquiries", err));
    }
  }, [email]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Welcome, Buyer</h1>

      {/* Inquiries */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">My Inquiries</h2>
        {inquiries.length === 0 ? (
          <p className="text-gray-600">No inquiries found.</p>
        ) : (
          <ul className="space-y-2">
            {inquiries.map((inq, idx) => (
              <li key={idx} className="border-b pb-2">
                <p className="text-sm text-gray-700">{inq.message}</p>
                <p className="text-xs text-gray-500">
                 Sent: {new Date(inq.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Explore Properties */}
      <div className="bg-white rounded shadow p-4">
        <BackButton />
        <h2 className="text-lg font-semibold mb-2">Explore Properties</h2>
        <div className="flex gap-4">
          <a
            href="/explore?type=sale"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
          >
            Explore Properties for Sale
          </a>
          <a
            href="/explore?type=rent"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            Explore Properties for Rent
          </a>
        </div>
      </div>
    </div>
  );
}
