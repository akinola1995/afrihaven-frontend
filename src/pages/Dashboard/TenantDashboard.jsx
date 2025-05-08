import React from "react";
import { format } from "date-fns";
import BackButton from "../../components/BackButton";

const mockTenantData = {
  email: "tenant1@caremyhome.com",
  name: "John Doe",
  property: {
    id: "p1",
    title: "2-Bedroom Flat in Lekki",
    unit: "A1",
    location: "Lekki, Lagos",
    rent: 250000,
    dueDate: "2025-05-10",
  },
  maintenance: [
    {
      issue: "Leaking tap",
      date: "2025-04-28",
      status: "Pending",
    },
    {
      issue: "AC not working",
      date: "2025-04-20",
      status: "Resolved",
    },
  ],
};

function TenantDashboard() {
  const tenant = mockTenantData;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">Welcome, {tenant.name}</h1>

      {/* Property Info */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">My Property</h2>
        <p><strong>Title:</strong> {tenant.property.title}</p>
        <p><strong>Unit:</strong> {tenant.property.unit}</p>
        <p><strong>Location:</strong> {tenant.property.location}</p>
        <p><strong>Rent:</strong> ₦{tenant.property.rent.toLocaleString()}</p>
        <p><strong>Next Due:</strong> {format(new Date(tenant.property.dueDate), "MMM d, yyyy")}</p>
      </div>

{/* Rent Summary + Upload */}
<div className="bg-white p-4 rounded shadow space-y-2">
  <h2 className="text-lg font-semibold">Rent Status</h2>
  <p>
    Status: <span className="text-yellow-600 font-medium">Unpaid</span>
  </p>
  <p>Due: {format(new Date(tenant.property.dueDate), "MMMM d, yyyy")}</p>
  <a
  href={`/properties/${tenant.property.id}/documents`}
  className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
>
  Upload Rent Receipt
</a>
</div>


      {/* Maintenance History */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">My Maintenance Requests</h2>
        <ul className="space-y-2">
          {tenant.maintenance.map((item, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-sm">{item.issue}</p>
              <p className="text-xs text-gray-500">Submitted: {format(new Date(item.date), "MMM d, yyyy")}</p>
              <span
                className={`text-xs font-medium ${
                  item.status === "Resolved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* My Uploaded Documents */}
<div className="bg-white p-4 rounded shadow">
  <h2 className="text-lg font-semibold mb-3">My Uploaded Documents</h2>

  <ul className="space-y-2">
    {[ // mock documents
      {
        name: "Rent_Receipt_May2025.pdf",
        description: "Rent payment receipt for May",
        date: "2025-05-01",
        url: "#"
      },
      {
        name: "Signed_Lease_Agreement.pdf",
        description: "Signed rental lease",
        date: "2025-04-01",
        url: "#"
      }
    ].map((doc, i) => (
      <li key={i} className="border-b pb-2">
        <p className="text-sm font-medium text-blue-800">{doc.name}</p>
        <p className="text-xs text-gray-500">{doc.description}</p>
        <p className="text-xs text-gray-400">Uploaded: {doc.date}</p>
        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline">
          View / Download
        </a>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
}

export default TenantDashboard;
