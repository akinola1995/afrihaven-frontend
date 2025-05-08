import React from "react";
import BackButton from "../../components/BackButton";

const inquirerData = {
  name: "Guest User",
  email: "guest@example.com",
  inquiries: [
    {
      title: "Land Plot in Ajah",
      status: "Waiting",
      date: "2025-05-07"
    }
  ]
};

export default function InquirerDashboard() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
        <BackButton />
      <h1 className="text-2xl font-bold text-blue-800">Welcome, {inquirerData.name}</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold">Your Inquiries</h2>
        <ul className="space-y-2 mt-2">
          {inquirerData.inquiries.map((inq, i) => (
            <li key={i} className="text-sm">
              {inq.title} — {inq.status} |{" "}
              <span className="text-gray-500">{inq.date}</span>
            </li>
          ))}
        </ul>
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
