// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import BackButton from "../../components/BackButton";

// function AgentDashboard() {
//   const agentName = "Agent Maxwell";

//   const [properties] = useState([
//     { id: "p1", title: "Duplex in Ikeja", type: "rent" },
//     { id: "p2", title: "Shop in Enugu", type: "rent" },
//   ]);

//   const [assignedTenants, setAssignedTenants] = useState(() =>
//     JSON.parse(localStorage.getItem("assignedTenants") || "[]")
//   );
//   const [history, setHistory] = useState(() =>
//     JSON.parse(localStorage.getItem("tenantHistory") || "[]")
//   );
//   const [agentList, setAgentList] = useState(() =>
//     JSON.parse(localStorage.getItem("agentList") || "[]")
//   );

//   const [tenantForm, setTenantForm] = useState({
//     email: "",
//     unit: "",
//     propertyId: properties[0]?.id || "",
//   });

//   const [agentForm, setAgentForm] = useState({
//     email: "",
//     name: "",
//   });

//   const handleAssign = (e) => {
//     e.preventDefault();
//     const newTenant = { ...tenantForm, date: new Date().toISOString() };
//     const updated = [...assignedTenants, newTenant];
//     const updatedHistory = [...history, newTenant];
//     localStorage.setItem("assignedTenants", JSON.stringify(updated));
//     localStorage.setItem("tenantHistory", JSON.stringify(updatedHistory));
//     setAssignedTenants(updated);
//     setHistory(updatedHistory);
//     setTenantForm({ email: "", unit: "", propertyId: properties[0]?.id || "" });
//   };

//   const handleUnassign = (email) => {
//     const updated = assignedTenants.filter((t) => t.email !== email);
//     localStorage.setItem("assignedTenants", JSON.stringify(updated));
//     setAssignedTenants(updated);
//   };

//   const handleAddAgent = (e) => {
//     e.preventDefault();
//     const newAgent = { ...agentForm, addedAt: new Date().toISOString() };
//     const updated = [newAgent, ...agentList];
//     localStorage.setItem("agentList", JSON.stringify(updated));
//     setAgentList(updated);
//     setAgentForm({ email: "", name: "" });
//     alert("Agent registered successfully!");
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-6">
//       <BackButton />
//       <h1 className="text-2xl font-bold text-blue-800">Welcome, {agentName}</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded shadow text-center">
//           <h3 className="text-gray-500 text-sm">My Properties</h3>
//           <p className="text-xl font-bold">{properties.length}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow text-center">
//           <h3 className="text-gray-500 text-sm">Active Tenants</h3>
//           <p className="text-xl font-bold">{assignedTenants.length}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow text-center">
//           <h3 className="text-gray-500 text-sm">Tenant History</h3>
//           <p className="text-xl font-bold">{history.length}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow text-center">
//           <h3 className="text-gray-500 text-sm">Agents Added</h3>
//           <p className="text-xl font-bold">{agentList.length}</p>
//         </div>
//       </div>

//       {/* Quick Links */}
//       <div className="flex flex-wrap gap-4">
//         <Link to="/add-property" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
//           + Add Property
//         </Link>
//         <Link to="/properties" className="bg-gray-200 text-blue-700 px-4 py-2 rounded text-sm">
//           View Properties
//         </Link>
//         <Link to="/inbox" className="bg-green-600 text-white px-4 py-2 rounded text-sm">
//           Check Inbox
//         </Link>
//       </div>

//       {/* Property List */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-2">My Properties</h2>
//         <ul className="space-y-2 text-sm">
//           {properties.map((p) => (
//             <li key={p.id} className="border-b pb-2">
//               <p className="text-blue-700 font-medium">{p.title}</p>
//               <p className="text-gray-600">Type: {p.type}</p>
//               <div className="text-xs space-x-3 mt-1">
//                 <Link to={`/properties/${p.id}/details`} className="text-blue-600 underline">
//                   View Details
//                 </Link>
//                 <Link to={`/properties/${p.id}/maintenance`} className="text-yellow-600 underline">
//                   Maintenance
//                 </Link>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Assign Tenant */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-3">Assign Tenant</h2>
//         <form onSubmit={handleAssign} className="space-y-3">
//           <input
//             type="email"
//             placeholder="Tenant Email"
//             value={tenantForm.email}
//             onChange={(e) => setTenantForm({ ...tenantForm, email: e.target.value })}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Unit (e.g. A2)"
//             value={tenantForm.unit}
//             onChange={(e) => setTenantForm({ ...tenantForm, unit: e.target.value })}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <select
//             value={tenantForm.propertyId}
//             onChange={(e) => setTenantForm({ ...tenantForm, propertyId: e.target.value })}
//             className="w-full border p-2 rounded"
//           >
//             {properties.map((prop) => (
//               <option key={prop.id} value={prop.id}>
//                 {prop.title}
//               </option>
//             ))}
//           </select>
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//             Assign Tenant
//           </button>
//         </form>
//       </div>

//       {/* Assigned Tenants */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-3">Active Assigned Tenants</h2>
//         {assignedTenants.length === 0 ? (
//           <p className="text-sm text-gray-500">No active tenants assigned.</p>
//         ) : (
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left border-b text-gray-600">
//                 <th>Email</th>
//                 <th>Unit</th>
//                 <th>Property</th>
//                 <th>Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assignedTenants.map((t, i) => (
//                 <tr key={i} className="border-b hover:bg-gray-50">
//                   <td>{t.email}</td>
//                   <td>{t.unit}</td>
//                   <td>{t.propertyId}</td>
//                   <td>{new Date(t.date).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       onClick={() => handleUnassign(t.email)}
//                       className="text-red-600 hover:underline text-xs"
//                     >
//                       Unassign
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Tenant History */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-3">Tenant Assignment History</h2>
//         {history.length === 0 ? (
//           <p className="text-sm text-gray-500">No history yet.</p>
//         ) : (
//           <ul className="space-y-2 text-sm">
//             {history.map((t, i) => (
//               <li key={i} className="border-b pb-2">
//                 {t.email} assigned to {t.propertyId} (unit {t.unit}) on{" "}
//                 {new Date(t.date).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Register Agent */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-3">Register New Agent</h2>
//         <form onSubmit={handleAddAgent} className="space-y-3">
//           <input
//             type="text"
//             placeholder="Agent Name"
//             value={agentForm.name}
//             onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="email"
//             placeholder="Agent Email"
//             value={agentForm.email}
//             onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//             Add Agent
//           </button>
//         </form>
//       </div>

//       {/* Recent Inquiries */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-3">Recent Inquiries</h2>
//         <div className="text-sm space-y-2">
//           {[
//             { from: "buyer1@example.com", message: "Requesting a tour", propertyId: "p1", date: "2025-05-03" },
//             { from: "rentseeker@example.com", message: "Available next month?", propertyId: "p2", date: "2025-05-02" }
//           ].map((inq, i) => (
//             <div key={i} className="border-b pb-2">
//               <p><strong>From:</strong> {inq.from}</p>
//               <p><strong>Message:</strong> {inq.message}</p>
//               <p><strong>Property:</strong> {inq.propertyId} | Date: {inq.date}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Maintenance Requests */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-3">Maintenance Requests</h2>
//         <div className="text-sm space-y-2">
//           {[
//             { issue: "Leaky faucet", status: "Pending", propertyId: "p1", date: "2025-05-04" },
//             { issue: "Power outage", status: "Resolved", propertyId: "p2", date: "2025-04-30" }
//           ].map((m, i) => (
//             <div key={i} className="border-b pb-2">
//               <p><strong>Issue:</strong> {m.issue}</p>
//               <p><strong>Status:</strong> <span className={m.status === "Resolved" ? "text-green-600" : "text-yellow-600"}>{m.status}</span></p>
//               <p><strong>Property:</strong> {m.propertyId} | Date: {m.date}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AgentDashboard;

// src/pages/Dashboard/AgentDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/BackButton";

function AgentDashboard() {
  const agentEmail = localStorage.getItem("email");
  const agentName = "Agent Maxwell"; // Replace with backend fetched name if needed

  const [properties, setProperties] = useState([]);
  const [assignedTenants, setAssignedTenants] = useState([]);
  const [history, setHistory] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  const [tenantForm, setTenantForm] = useState({
    email: "",
    unit: "",
    propertyId: ""
  });

  const [agentForm, setAgentForm] = useState({
    name: "",
    email: ""
  });

  // Fetch initial data
  useEffect(() => {
    axios.get(`/api/agent/${agentEmail}/dashboard`).then(res => {
      setProperties(res.data.properties);
      setAssignedTenants(res.data.assignedTenants);
      setHistory(res.data.assignmentHistory);
      setAgentList(res.data.agentList || []);
      setInquiries(res.data.inquiries || []);
      setMaintenance(res.data.maintenance || []);
      if (res.data.properties.length > 0) {
        setTenantForm(prev => ({ ...prev, propertyId: res.data.properties[0].id }));
      }
    });
  }, [agentEmail]);

  const handleAssign = async (e) => {
    e.preventDefault();
    const newTenant = { ...tenantForm, agentEmail };
    await axios.post("/api/assign-tenant", newTenant);
    alert("Tenant assigned successfully!");
    window.location.reload();
  };

  const handleUnassign = async (email) => {
    await axios.post("/api/unassign-tenant", { agentEmail, email });
    alert("Tenant unassigned.");
    window.location.reload();
  };

  const handleAddAgent = async (e) => {
    e.preventDefault();
    const newAgent = { ...agentForm, registeredBy: agentEmail };
    await axios.post("/api/admin/add-agent", newAgent);
    alert("Agent added!");
    setAgentForm({ name: "", email: "" });
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">Welcome, {agentName}</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="My Properties" count={properties.length} />
        <SummaryCard title="Active Tenants" count={assignedTenants.length} />
        <SummaryCard title="Tenant History" count={history.length} />
        <SummaryCard title="Agents Added" count={agentList.length} />
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-4">
        <Link to="/add-property" className="btn-primary">+ Add Property</Link>
        <Link to="/properties" className="btn-gray">View Properties</Link>
        <Link to="/inbox" className="btn-success">Check Inbox</Link>
      </div>

      {/* Properties List */}
      <PropertyList properties={properties} />

      {/* Assign Tenant */}
      <TenantAssignForm
        form={tenantForm}
        setForm={setTenantForm}
        properties={properties}
        handleAssign={handleAssign}
      />

      {/* Assigned Tenants */}
      <AssignedTenantsTable tenants={assignedTenants} handleUnassign={handleUnassign} />

      {/* Assignment History */}
      <TenantHistoryList history={history} />

      {/* Register Agent */}
      <AgentRegisterForm form={agentForm} setForm={setAgentForm} handleAddAgent={handleAddAgent} />

      {/* Inquiries */}
      <InquiryList inquiries={inquiries} />

      {/* Maintenance */}
      <MaintenanceList maintenance={maintenance} />
    </div>
  );
}

export default AgentDashboard;

// Reusable components (SummaryCard, PropertyList, etc.) can be extracted below or in separate files
