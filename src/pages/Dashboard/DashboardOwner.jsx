// import React from "react";
// import { Link } from "react-router-dom";
// import BackButton from "../../components/BackButton";

// const mockOwner = {
//   name: "Mr. Akinola",
//   properties: [
//     {
//       id: "p1",
//       title: "2-Bedroom Flat in Lekki",
//       type: "rent",
//       tenants: 2,
//     },
//     {
//       id: "p2",
//       title: "3-Bedroom Bungalow in Ibadan",
//       type: "sale",
//       tenants: 0,
//     },
//   ],
//   inquiries: [
//     {
//       from: "Jane Doe",
//       email: "jane@example.com",
//       propertyId: "p1",
//       message: "Is this still available?",
//       date: "2025-05-01",
//     },
//   ],
//   maintenance: [
//     {
//       issue: "Broken window",
//       property: "p1",
//       status: "Pending",
//       date: "2025-05-04",
//     },
//   ],
//   rentUploads: [
//     {
//       tenant: "John Doe",
//       amount: 250000,
//       date: "2025-05-03",
//       propertyId: "p1",
//       file: "May_Rent_Receipt.pdf",
//     },
//   ],
//   tenantAssignments: JSON.parse(localStorage.getItem("tenantAssignments") || "[]"),
//   unassignmentRequests: JSON.parse(localStorage.getItem("unassignmentRequests") || "[]"),
// };

// function DashboardOwner() {
//   const owner = mockOwner;

//   const handleAssignTenant = (e) => {
//     e.preventDefault();
//     const email = e.target.tenantEmail.value;
//     const propertyId = e.target.propertyId.value;
//     const assignment = {
//       email,
//       propertyId,
//       assignedAt: new Date().toISOString(),
//     };

//     const prev = JSON.parse(localStorage.getItem("tenantAssignments") || "[]");
//     const updated = [assignment, ...prev];
//     localStorage.setItem("tenantAssignments", JSON.stringify(updated));
//     alert("Tenant assigned successfully! Reload to see update.");
//     e.target.reset();
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-6">
//       <BackButton />
//       <h1 className="text-2xl font-bold text-blue-800">Welcome, {owner.name}</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded shadow text-center">
//           <h3 className="text-gray-500 text-sm">Total Properties</h3>
//           <p className="text-xl font-bold">{owner.properties.length}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow text-center">
//           <h3 className="text-gray-500 text-sm">Active Tenants</h3>
//           <p className="text-xl font-bold">
//             {owner.properties.reduce((sum, p) => sum + p.tenants, 0)}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded shadow text-center">
//           <h3 className="text-gray-500 text-sm">Unread Inquiries</h3>
//           <p className="text-xl font-bold">{owner.inquiries.length}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow text-center">
//           <h3 className="text-gray-500 text-sm">New Rent Uploads</h3>
//           <p className="text-xl font-bold">{owner.rentUploads.length}</p>
//         </div>
//       </div>

//       {/* Quick Links */}
//       <div className="flex flex-wrap gap-4">
//         <Link to="/add-property" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
//           + Add Property
//         </Link>
//         <Link to="/properties" className="bg-gray-200 text-blue-700 px-4 py-2 rounded text-sm">
//           View All Properties
//         </Link>
//         <Link to="/inbox" className="bg-green-600 text-white px-4 py-2 rounded text-sm">
//           Go to Inbox
//         </Link>
//       </div>

//       {/* Recent Properties */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-2">Recent Properties</h2>
//         <ul className="space-y-2">
//           {owner.properties.map((prop) => (
//             <li key={prop.id} className="border-b pb-2">
//               <p className="font-medium text-blue-700">{prop.title}</p>
//               <p className="text-sm text-gray-500">
//                 Type: {prop.type.toUpperCase()} | Tenants: {prop.tenants}
//               </p>
//               <div className="text-xs space-x-4 mt-1">
//                 <Link to={`/properties/${prop.id}/details`} className="text-blue-600 underline">
//                   View Details
//                 </Link>
//                 <Link to={`/properties/${prop.id}/maintenance`} className="text-yellow-600 underline">
//                   Maintenance
//                 </Link>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Recent Rent Uploads */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-2">Recent Rent Payments</h2>
//         {owner.rentUploads.length === 0 ? (
//           <p className="text-gray-500 text-sm">No recent uploads.</p>
//         ) : (
//           <ul className="space-y-2">
//             {owner.rentUploads.map((rent, i) => (
//               <li key={i} className="text-sm text-gray-700 border-b pb-2">
//                 <strong>{rent.tenant}</strong> uploaded <strong>{rent.file}</strong> for{" "}
//                 <strong>₦{rent.amount.toLocaleString()}</strong> on {rent.date}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Maintenance Requests */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-2">Maintenance Requests</h2>
//         {owner.maintenance.length === 0 ? (
//           <p className="text-gray-500 text-sm">No new requests.</p>
//         ) : (
//           <ul className="space-y-2">
//             {owner.maintenance.map((m, i) => (
//               <li key={i} className="text-sm text-gray-700 border-b pb-2">
//                 <strong>{m.issue}</strong> on Property: {m.property} |{" "}
//                 <span
//                   className={`${
//                     m.status === "Resolved" ? "text-green-600" : "text-yellow-600"
//                   }`}
//                 >
//                   {m.status}
//                 </span>{" "}
//                 | {m.date}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Assign Tenant */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-2">Assign Tenant to Property</h2>
//         <form onSubmit={handleAssignTenant} className="space-y-3">
//           <input
//             type="email"
//             name="tenantEmail"
//             placeholder="Tenant Email"
//             className="w-full border p-2 rounded"
//             required
//           />
//           <select name="propertyId" className="w-full border p-2 rounded" required>
//             <option value="">Select Property</option>
//             {owner.properties.map((prop) => (
//               <option key={prop.id} value={prop.id}>
//                 {prop.title}
//               </option>
//             ))}
//           </select>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
//           >
//             Assign Tenant
//           </button>
//         </form>
//       </div>

//       {/* Tenant Assignment History */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-2">Tenant Assignment History</h2>
//         {owner.tenantAssignments.length === 0 ? (
//           <p className="text-gray-500 text-sm">No assignment history found.</p>
//         ) : (
//           <ul className="space-y-2">
//             {owner.tenantAssignments.map((entry, i) => (
//               <li key={i} className="text-sm text-gray-700 border-b pb-2">
//                 Assigned <strong>{entry.email}</strong> to <strong>{entry.propertyId}</strong> on{" "}
//                 {new Date(entry.assignedAt).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Unassignment Requests */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-2">Unassignment Requests</h2>
//         {owner.unassignmentRequests.length === 0 ? (
//           <p className="text-gray-500 text-sm">No unassignment requests.</p>
//         ) : (
//           <ul className="space-y-2">
//             {owner.unassignmentRequests.map((req, i) => (
//               <li key={i} className="text-sm text-gray-700 border-b pb-2">
//                 <strong>{req.email}</strong> requested unassignment from{" "}
//                 <strong>{req.propertyId}</strong> on{" "}
//                 {new Date(req.requestedAt).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DashboardOwner;


// src/pages/Dashboard/DashboardOwner.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/BackButton";

function DashboardOwner() {
  const [owner, setOwner] = useState({ name: "", properties: [] });
  const [inquiries, setInquiries] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [rentUploads, setRentUploads] = useState([]);
  const [tenantAssignments, setTenantAssignments] = useState([]);
  const [unassignmentRequests, setUnassignmentRequests] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {
    async function fetchOwnerDashboard() {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/dashboard/owner?email=${email}`);
        setOwner({ name: data.name, properties: data.properties });
        setInquiries(data.inquiries || []);
        setMaintenance(data.maintenance || []);
        setRentUploads(data.rentUploads || []);
        setTenantAssignments(data.tenantAssignments || []);
        setUnassignmentRequests(data.unassignmentRequests || []);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      }
    }

    fetchOwnerDashboard();
  }, [email]);

  const handleAssignTenant = async (e) => {
    e.preventDefault();
    const email = e.target.tenantEmail.value;
    const propertyId = e.target.propertyId.value;

    try {
      await axios.post("http://localhost:8080/api/tenant/assign", {
        email,
        propertyId
      });

      setTenantAssignments((prev) => [
        { email, propertyId, assignedAt: new Date().toISOString() },
        ...prev
      ]);
      e.target.reset();
      alert("Tenant assigned successfully.");
    } catch (err) {
      console.error("Assignment failed:", err);
      alert("Assignment failed.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">Welcome, {owner.name}</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500 text-sm">Total Properties</h3>
          <p className="text-xl font-bold">{owner.properties.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500 text-sm">Active Tenants</h3>
          <p className="text-xl font-bold">{tenantAssignments.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500 text-sm">Unread Inquiries</h3>
          <p className="text-xl font-bold">{inquiries.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500 text-sm">New Rent Uploads</h3>
          <p className="text-xl font-bold">{rentUploads.length}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-4">
        <Link to="/add-property" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          + Add Property
        </Link>
        <Link to="/properties" className="bg-gray-200 text-blue-700 px-4 py-2 rounded text-sm">
          View All Properties
        </Link>
        <Link to="/inbox" className="bg-green-600 text-white px-4 py-2 rounded text-sm">
          Go to Inbox
        </Link>
      </div>

      {/* Properties */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Recent Properties</h2>
        <ul className="space-y-2">
          {owner.properties.map((prop) => (
            <li key={prop.id} className="border-b pb-2">
              <p className="font-medium text-blue-700">{prop.title}</p>
              <p className="text-sm text-gray-500">Type: {prop.type.toUpperCase()}</p>
              <div className="text-xs space-x-4 mt-1">
                <Link to={`/properties/${prop.id}/details`} className="text-blue-600 underline">View Details</Link>
                <Link to={`/properties/${prop.id}/maintenance`} className="text-yellow-600 underline">Maintenance</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Rent Uploads */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Recent Rent Payments</h2>
        {rentUploads.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent uploads.</p>
        ) : (
          <ul className="space-y-2">
            {rentUploads.map((r, i) => (
              <li key={i} className="text-sm text-gray-700 border-b pb-2">
                <strong>{r.tenant}</strong> uploaded <strong>{r.file}</strong> for <strong>₦{r.amount.toLocaleString()}</strong> on {r.date}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Maintenance */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Maintenance Requests</h2>
        {maintenance.length === 0 ? (
          <p className="text-gray-500 text-sm">No new requests.</p>
        ) : (
          <ul className="space-y-2">
            {maintenance.map((m, i) => (
              <li key={i} className="text-sm text-gray-700 border-b pb-2">
                <strong>{m.issue}</strong> on Property: {m.propertyId} |{" "}
                <span className={m.status === "Resolved" ? "text-green-600" : "text-yellow-600"}>{m.status}</span> | {m.date}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Assign Tenant */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Assign Tenant to Property</h2>
        <form onSubmit={handleAssignTenant} className="space-y-3">
          <input type="email" name="tenantEmail" placeholder="Tenant Email" className="w-full border p-2 rounded" required />
          <select name="propertyId" className="w-full border p-2 rounded" required>
            <option value="">Select Property</option>
            {owner.properties.map((prop) => (
              <option key={prop.id} value={prop.id}>{prop.title}</option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            Assign Tenant
          </button>
        </form>
      </div>

      {/* Tenant History */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Tenant Assignment History</h2>
        {tenantAssignments.length === 0 ? (
          <p className="text-gray-500 text-sm">No assignment history found.</p>
        ) : (
          <ul className="space-y-2">
            {tenantAssignments.map((entry, i) => (
              <li key={i} className="text-sm text-gray-700 border-b pb-2">
                Assigned <strong>{entry.email}</strong> to <strong>{entry.propertyId}</strong> on {new Date(entry.assignedAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Unassignment Requests */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Unassignment Requests</h2>
        {unassignmentRequests.length === 0 ? (
          <p className="text-gray-500 text-sm">No unassignment requests.</p>
        ) : (
          <ul className="space-y-2">
            {unassignmentRequests.map((req, i) => (
              <li key={i} className="text-sm text-gray-700 border-b pb-2">
                <strong>{req.email}</strong> requested unassignment from <strong>{req.propertyId}</strong> on {new Date(req.requestedAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardOwner;
