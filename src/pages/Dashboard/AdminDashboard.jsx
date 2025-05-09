import React, { useState } from "react";
import BackButton from "../../components/BackButton";

function AdminDashboard() {
  const [admins, setAdmins] = useState(() =>
    JSON.parse(localStorage.getItem("admins") || "[]")
  );

  const [adminForm, setAdminForm] = useState({ name: "", email: "" });

  const [properties] = useState([
    { id: "p1", title: "Duplex in Lekki", owner: "owner1@example.com" },
    { id: "p2", title: "Flat in Abuja", owner: "owner2@example.com" },
    { id: "p3", title: "Shop in Enugu", owner: "owner3@example.com" },
  ]);

  const [users] = useState({
    tenants: 5,
    agents: 3,
    owners: 2,
    inquiries: 4,
  });

  const maintenanceRequests = [
    { issue: "Leaky faucet", status: "Pending", propertyId: "p1", date: "2025-05-06" },
    { issue: "Broken AC", status: "Resolved", propertyId: "p2", date: "2025-05-03" },
  ];

  const inquiries = [
    { from: "buyer@example.com", message: "Is Lekki duplex still available?", propertyId: "p1", date: "2025-05-05" },
    { from: "client2@example.com", message: "Interested in Abuja flat", propertyId: "p2", date: "2025-05-04" },
  ];

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const newAdmin = { ...adminForm, createdAt: new Date().toISOString() };
    const updated = [newAdmin, ...admins];
    setAdmins(updated);
    localStorage.setItem("admins", JSON.stringify(updated));
    setAdminForm({ name: "", email: "" });
    alert("Admin added successfully!");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-sm text-gray-500">Total Properties</h3>
          <p className="text-xl font-bold">{properties.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-sm text-gray-500">Tenants</h3>
          <p className="text-xl font-bold">{users.tenants}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-sm text-gray-500">Agents</h3>
          <p className="text-xl font-bold">{users.agents}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-sm text-gray-500">Owners</h3>
          <p className="text-xl font-bold">{users.owners}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-sm text-gray-500">Inquiries</h3>
          <p className="text-xl font-bold">{users.inquiries}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-sm text-gray-500">Admins</h3>
          <p className="text-xl font-bold">{admins.length}</p>
        </div>
      </div>

      {/* View Properties */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">All Listed Properties</h2>
        {properties.length === 0 ? (
          <p className="text-gray-500 text-sm">No properties listed yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {properties.map((p, i) => (
              <li key={i} className="border-b pb-2">
                <p><strong>{p.title}</strong> — Owned by: {p.owner}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Register Admin */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Add New Admin</h2>
        <form onSubmit={handleAddAdmin} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={adminForm.name}
            onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={adminForm.email}
            onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Admin
          </button>
        </form>
      </div>

      {/* Admin List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Registered Admins</h2>
        {admins.length === 0 ? (
          <p className="text-gray-500 text-sm">No admins registered yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {admins.map((a, i) => (
              <li key={i} className="border-b pb-2">
                {a.name} — {a.email} | Joined: {new Date(a.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Inquiries */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Recent Inquiries</h2>
        {inquiries.map((inq, i) => (
          <div key={i} className="text-sm text-gray-700 border-b pb-2 mb-2">
            <p><strong>From:</strong> {inq.from}</p>
            <p><strong>Message:</strong> {inq.message}</p>
            <p><strong>Property:</strong> {inq.propertyId} | <strong>Date:</strong> {inq.date}</p>
          </div>
        ))}
      </div>

      {/* Maintenance */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Maintenance Requests</h2>
        {maintenanceRequests.map((m, i) => (
          <div key={i} className="text-sm border-b pb-2 mb-2">
            <p><strong>Issue:</strong> {m.issue}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={m.status === "Resolved" ? "text-green-600" : "text-yellow-600"}>
                {m.status}
              </span>
            </p>
            <p><strong>Property:</strong> {m.propertyId} | <strong>Date:</strong> {m.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
