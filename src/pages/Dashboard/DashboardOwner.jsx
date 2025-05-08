import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";

const mockOwner = {
  name: "Mr. Akinola",
  properties: [
    {
      id: "p1",
      title: "2-Bedroom Flat in Lekki",
      type: "rent",
      tenants: 2,
    },
    {
      id: "p2",
      title: "3-Bedroom Bungalow in Ibadan",
      type: "sale",
      tenants: 0,
    },
  ],
  inquiries: [
    {
      from: "Jane Doe",
      email: "jane@example.com",
      propertyId: "p1",
      message: "Is this still available?",
      date: "2025-05-01",
    },
  ],
  maintenance: [
    {
      issue: "Broken window",
      property: "p1",
      status: "Pending",
      date: "2025-05-04",
    },
  ],
  rentUploads: [
    {
      tenant: "John Doe",
      amount: 250000,
      date: "2025-05-03",
      propertyId: "p1",
      file: "May_Rent_Receipt.pdf",
    },
  ],
};

function DashboardOwner() {
  const owner = mockOwner;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
        <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">
        Welcome, {owner.name}
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500 text-sm">Total Properties</h3>
          <p className="text-xl font-bold">{owner.properties.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500 text-sm">Active Tenants</h3>
          <p className="text-xl font-bold">
            {owner.properties.reduce((sum, p) => sum + p.tenants, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500 text-sm">Unread Inquiries</h3>
          <p className="text-xl font-bold">{owner.inquiries.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-gray-500 text-sm">New Rent Uploads</h3>
          <p className="text-xl font-bold">{owner.rentUploads.length}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4">
        <Link
          to="/add-property"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          + Add Property
        </Link>
        <Link
          to="/properties"
          className="bg-gray-200 text-blue-700 px-4 py-2 rounded text-sm"
        >
          View All Properties
        </Link>
        <Link
          to="/inbox"
          className="bg-green-600 text-white px-4 py-2 rounded text-sm"
        >
          Go to Inbox
        </Link>
      </div>

      {/* Recent Properties */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Recent Properties</h2>
        <ul className="space-y-2">
          {owner.properties.map((prop) => (
            <li key={prop.id} className="border-b pb-2">
              <p className="font-medium text-blue-700">{prop.title}</p>
              <p className="text-sm text-gray-500">
                Type: {prop.type.toUpperCase()} | Tenants: {prop.tenants}
              </p>
              <Link
                to={`/properties/${prop.id}/details`}
                className="text-blue-600 text-xs underline"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Rent Submissions */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Recent Rent Payments</h2>
        {owner.rentUploads.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent uploads.</p>
        ) : (
          <ul className="space-y-2">
            {owner.rentUploads.map((rent, i) => (
              <li key={i} className="text-sm text-gray-700 border-b pb-2">
                {rent.tenant} uploaded <strong>{rent.file}</strong> for{" "}
                <strong>₦{rent.amount.toLocaleString()}</strong> on{" "}
                {rent.date}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Maintenance */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Maintenance Requests</h2>
        {owner.maintenance.length === 0 ? (
          <p className="text-gray-500 text-sm">No new requests.</p>
        ) : (
          <ul className="space-y-2">
            {owner.maintenance.map((m, i) => (
              <li key={i} className="text-sm text-gray-700 border-b pb-2">
                <strong>{m.issue}</strong> on Property: {m.property} |{" "}
                <span
                  className={`${
                    m.status === "Resolved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {m.status}
                </span>{" "}
                | {m.date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardOwner;
