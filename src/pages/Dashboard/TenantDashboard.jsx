import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";

function TenantDashboard() {
  const email = localStorage.getItem("email");
  const [tenantData, setTenantData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const tenantRes = await axios.get(`http://localhost:8080/api/tenant/${email}`);
        const docsRes = await axios.get(`http://localhost:8080/api/documents/tenant/${email}`);
        setTenantData(tenantRes.data);
        setDocuments(docsRes.data);
      } catch (err) {
        console.error("Failed to fetch tenant dashboard:", err);
        setTenantData(null);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTenantData();
  }, [email]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!tenantData) return <div className="p-6 text-red-500">Tenant data not found</div>;

  // Defensive: property may be null/undefined if tenant has no property assigned
  const { name, property = null, maintenanceRequests = [] } = tenantData;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">Welcome, {name || email}</h1>

      {/* Property Info */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">My Property</h2>
        {!property ? (
          <p className="text-red-500">No property assigned yet. Please contact your property manager or landlord.</p>
        ) : (
          <>
            <p><strong>Title:</strong> {property.title || "N/A"}</p>
            <p><strong>Unit:</strong> {property.unit || "N/A"}</p>
            <p><strong>Location:</strong> {property.location || property.city || property.state || property.country || "N/A"}</p>
            <p><strong>Rent:</strong> {property.rent !== undefined ? `₦${property.rent.toLocaleString()}` : "N/A"}</p>
            <p><strong>Next Due:</strong> {property.dueDate ? format(new Date(property.dueDate), "MMM d, yyyy") : "N/A"}</p>
          </>
        )}
      </div>

      {/* Rent Status */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-lg font-semibold">Rent Status</h2>
        {!property ? (
          <p className="text-gray-500">No rent status available without an assigned property.</p>
        ) : (
          <>
            <p>Status: <span className="text-yellow-600 font-medium">Unpaid</span></p>
            <p>Due: {property.dueDate ? format(new Date(property.dueDate), "MMMM d, yyyy") : "N/A"}</p>
            <a
              href={`/properties/${property.id}/documents`}
              className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              Upload Rent Receipt
            </a>
          </>
        )}
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">My Maintenance Requests</h2>
          {property && (
            <Link
              to={`/properties/${property.id}/maintenance`}
              className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              + Raise New Request
            </Link>
          )}
        </div>
        {maintenanceRequests && maintenanceRequests.length > 0 ? (
          <ul className="space-y-2">
            {maintenanceRequests.map((item, index) => (
              <li key={index} className="border-b pb-2">
                <p className="text-sm">{item.issue}</p>
                <p className="text-xs text-gray-500">
                  Submitted: {item.date ? format(new Date(item.date), "MMM d, yyyy") : "N/A"}
                </p>
                <span
                  className={`text-xs font-medium ${
                    item.status === "Resolved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {item.status || "Pending"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No maintenance requests yet.</p>
        )}
      </div>

      {/* Uploaded Documents */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">My Uploaded Documents</h2>
        <ul className="space-y-2">
          {(!documents || documents.length === 0) ? (
            <p className="text-sm text-gray-500">No documents uploaded yet.</p>
          ) : (
            documents.map((doc, i) => (
              <li key={i} className="border-b pb-2">
                <p className="text-sm font-medium text-blue-800">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.description || ""}</p>
                <p className="text-xs text-gray-400">Uploaded: {doc.uploadedAt ? format(new Date(doc.uploadedAt), "yyyy-MM-dd") : "N/A"}</p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs underline"
                >
                  View / Download
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TenantDashboard;
