import React from 'react';

export default function Footer() {
  return (
    <div className="text-center text-xs text-gray-500 py-6">
      <a href="/terms" className="text-blue-600 hover:underline mr-4">Terms of Use</a>
      <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
    </div>
  );
}
