import React, { useState } from 'react';

function Onboarding() {
  const [selectedRole, setSelectedRole] = useState('');

  const handleSelect = (role) => {
    setSelectedRole(role);
    // You can save this in localStorage, context, or send to backend
    console.log(`Role selected: ${role}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Who Are You?</h1>
      <p className="text-gray-600 mb-4">Please select the role that best describes you:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          onClick={() => handleSelect('Owner')}
          className={`p-6 rounded-lg border-2 cursor-pointer transition hover:shadow-md ${
            selectedRole === 'Owner' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <h2 className="text-xl font-semibold mb-2">🏠 I'm a Property Owner</h2>
          <p className="text-sm text-gray-600">
            Manage your personal properties, tenants, documents, and rent payments all in one place.
          </p>
        </div>

        <div
          onClick={() => handleSelect('Agent')}
          className={`p-6 rounded-lg border-2 cursor-pointer transition hover:shadow-md ${
            selectedRole === 'Agent' ? 'border-green-600 bg-green-50' : 'border-gray-300'
          }`}
        >
          <h2 className="text-xl font-semibold mb-2">💼 I'm a Real Estate Agent</h2>
          <p className="text-sm text-gray-600">
            List multiple properties, manage clients, view listings, and communicate with tenants and owners.
          </p>
        </div>
      </div>

      {selectedRole && (
        <div className="mt-6 text-center">
          <p className="text-lg font-medium">
            ✅ You selected: <span className="text-blue-600">{selectedRole}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Onboarding;
