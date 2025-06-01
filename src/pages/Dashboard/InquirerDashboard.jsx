// src/pages/Dashboard/InquirerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../../components/BackButton";

export default function InquirerDashboard() {
  const [name, setName] = useState("Guest User");
  const [email, setEmail] = useState(localStorage.getItem("email") || "guest@example.com");
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (!email) return;

    axios.get(`http://localhost:8080/api/inquirer/inquiries?email=${email}`)
      .then((res) => {
        setInquiries(res.data);
        const namePart = email.split("@")[0];
        setName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
      })
      .catch((err) => {
        console.error("Failed to fetch inquiries", err);
      });
  }, [email]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">Welcome, {name}</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Your Inquiries</h2>
        {inquiries.length === 0 ? (
          <p className="text-sm text-gray-500 mt-2">No inquiries found.</p>
        ) : (
          <ul className="space-y-2 mt-2">
            {inquiries.map((inq, i) => (
              <li key={i} className="text-sm">
                {inq.propertyName} — <strong>{inq.status}</strong> |{" "}
                <span className="text-gray-500">{new Date(inq.submittedAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-yellow-50 p-4 rounded shadow border border-yellow-200">
        <p className="text-sm text-yellow-700">
          To unlock full features like saving listings, chatting with agents, and uploading documents, please{" "}
          <a href="/register" className="underline text-yellow-900 font-medium">register</a> as a Tenant, Buyer, or Renter.
        </p>
      </div>
    </div>
  );
}
