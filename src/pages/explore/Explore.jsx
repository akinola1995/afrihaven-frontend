// src/pages/Explore.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Explore() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const params = new URLSearchParams(location.search);
      setQueryString(params.toString());

      try {
        const res = await axios.get(`http://localhost:8080/api/properties/search?${params.toString()}`);
        setResults(res.data);
      } catch (err) {
        console.error("Failed to fetch search results", err);
        setResults([]);
      }
      setLoading(false);
    };

    fetchResults();
  }, [location.search]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Search Results</h1>

      {loading ? (
        <p className="text-gray-500">Loading results...</p>
      ) : results.length === 0 ? (
        <p className="text-red-600">No properties found for your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((prop, i) => (
            <div key={i} className="bg-white rounded shadow p-4 space-y-2">
              <h2 className="text-lg font-semibold text-blue-700">{prop.title}</h2>
              <p className="text-sm text-gray-600">{prop.description}</p>
              <p className="text-sm">Price: ₦{prop.price?.toLocaleString()}</p>
              <p className="text-sm">Bedrooms: {prop.bedrooms}</p>
              <p className="text-sm">
                {prop.city}, {prop.state}, {prop.country}
              </p>
              <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs uppercase">
                {prop.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
