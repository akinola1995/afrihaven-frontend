import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ label = "Go Back" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-blue-600 text-sm underline hover:text-blue-800 mb-4"
    >
      ← {label}
    </button>
  );
}
