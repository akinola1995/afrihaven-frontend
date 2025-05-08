import React from "react";
import BackButton from "../../components/BackButton";

const savedRenterData = {
  name: "Jane Doe",
  saved: [
    {
      id: "r1",
      title: "2-Bedroom Flat in Lekki",
      status: "Pending",
      location: "Lekki, Lagos",
    },
    {
      id: "r2",
      title: "Self-Contain in Abuja",
      status: "Approved",
      location: "Wuse, Abuja",
    }
  ],
  inquiries: [
    {
      property: "Mini Flat in Yaba",
      date: "2025-05-06",
      status: "Replied"
    }
  ]
};

export default function RenterDashboard() {
  const { name, saved, inquiries } = savedRenterData;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">Welcome, {name}</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Saved Properties</h2>
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
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">My Inquiries</h2>
        <ul className="space-y-2">
          {inquiries.map((item, i) => (
            <li key={i} className="text-sm">
              {item.property} — <span className="text-gray-500">{item.date}</span> |
              <span className={`ml-2 font-medium ${item.status === 'Replied' ? 'text-green-600' : 'text-yellow-600'}`}>
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
