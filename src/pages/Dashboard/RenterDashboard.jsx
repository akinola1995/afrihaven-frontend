// src/pages/Dashboard/RenterDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../../components/BackButton";

export default function RenterDashboard() {
  const [renterName, setRenterName] = useState("Renter");
  const [saved, setSaved] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) return;

    // Fetch saved properties
    axios.get(`http://localhost:8080/api/renter/saved?email=${email}`)
      .then((res) => {
        setSaved(res.data);
      })
      .catch((err) => {
        console.error("Failed to load saved properties", err);
      });

    // Fetch inquiries
    axios.get(`http://localhost:8080/api/renter/inquiries?email=${email}`)
      .then((res) => {
        setInquiries(res.data);
      })
      .catch((err) => {
        console.error("Failed to load renter inquiries", err);
      });

    setRenterName(email.split("@")[0]); // Just a fallback name from email

  }, [email]);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">Welcome, {renterName}</h1>

      {/* Saved Properties */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Saved Properties</h2>
        {saved.length === 0 ? (
          <p className="text-gray-500 text-sm">No saved properties yet.</p>
        ) : (
          <ul className="space-y-2">
            {saved.map((item, i) => (
              <li key={i} className="text-sm">
                <strong>{item.title}</strong> — {item.location} |
                <span className={`ml-2 font-medium ${item.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Inquiries */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">My Inquiries</h2>
        {inquiries.length === 0 ? (
          <p className="text-gray-500 text-sm">No inquiries submitted yet.</p>
        ) : (
          <ul className="space-y-2">
            {inquiries.map((item, i) => (
              <li key={i} className="text-sm">
                {item.propertyName} — <span className="text-gray-500">{item.submittedAt}</span> |
                <span className={`ml-2 font-medium ${item.status === 'Replied' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


