import React, { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Get all users
    const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    setUsers(savedUsers);

    // Get all properties (future: use real backend)
    const dummyProps = JSON.parse(localStorage.getItem('dummyProperties') || '[]');
    setProperties(dummyProps);

    // Get all messages
    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(storedMessages);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
        <BackButton />
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow p-4 rounded text-center">
          <h2 className="text-lg font-medium text-gray-600">Total Users</h2>
          <p className="text-3xl text-blue-700 font-bold">{users.length}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h2 className="text-lg font-medium text-gray-600">Total Properties</h2>
          <p className="text-3xl text-green-700 font-bold">{properties.length}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h2 className="text-lg font-medium text-gray-600">Total Messages</h2>
          <p className="text-3xl text-pink-600 font-bold">{messages.length}</p>
        </div>
      </div>

      {/* User List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Registered Users</h2>
        <table className="w-full table-auto text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td className="p-2 text-gray-500" colSpan="3">No users found.</td></tr>
            ) : (
              users.map((user, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{user.name || 'N/A'}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
