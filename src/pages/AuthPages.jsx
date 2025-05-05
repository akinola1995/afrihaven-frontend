import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ----- Landing.jsx -----

export function Landing() {
  const sections = [
    {
      title: 'For Rent',
      type: 'rent',
      link: '/explore/rent',
      properties: [
        'https://source.unsplash.com/400x250/?apartment',
        'https://source.unsplash.com/400x250/?flat',
        'https://source.unsplash.com/400x250/?room'
      ]
    },
    {
      title: 'For Sale',
      type: 'sale',
      link: '/explore/sale',
      properties: [
        'https://source.unsplash.com/400x250/?house',
        'https://source.unsplash.com/400x250/?bungalow',
        'https://source.unsplash.com/400x250/?real-estate'
      ]
    },
    {
      title: 'Short Lets',
      type: 'shortlet',
      link: '/explore/shortlet',
      properties: [
        'https://source.unsplash.com/400x250/?studio,apartment',
        'https://source.unsplash.com/400x250/?modern,apartment'
      ]
    },
    {
      title: 'Vacation Homes',
      type: 'vacation',
      link: '/explore/vacation',
      properties: [
        'https://source.unsplash.com/400x250/?beach-house',
        'https://source.unsplash.com/400x250/?villa,sea'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to CareMyHome</h1>
        <p className="text-gray-700 text-lg mb-8">
          Explore, rent, buy, or manage your perfect home across Nigeria and Africa.
        </p>

        <div className="flex justify-center gap-4 mb-10">
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-gray-200 text-blue-700 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Register Now
          </a>
        </div>

        {sections.map((section, i) => (
          <div key={i} className="mb-10 text-left">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
              {section.properties.map((img, j) => (
                <img
                  key={j}
                  src={img}
                  alt={`${section.type}-${j}`}
                  className="rounded-lg shadow-md object-cover w-full h-52"
                />
              ))}
            </div>
            <a
              href={section.link}
              className="text-blue-600 text-sm underline hover:text-blue-800"
            >
              Explore More {section.title} →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}


// ----- Login.jsx -----
export function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'Owner' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validUsers = {
    'admin@caremyhome.com': { password: 'admin123', role: 'Admin' },
    'owner@caremyhome.com': { password: 'owner123', role: 'Owner' },
    'agent@caremyhome.com': { password: 'agent123', role: 'Agent' },
    'tenant@caremyhome.com': { password: 'tenant123', role: 'Tenant' },
    'buyer@caremyhome.com': { password: 'buyer123', role: 'Buyer' },
    'renter@caremyhome.com': { password: 'renter123', role: 'Renter' }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = validUsers[form.email];
    if (user && user.password === form.password) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', user.role);
  
      switch (user.role) {
        case 'Owner':
        case 'Agent':
        case 'Admin':
          navigate('/dashboard');
          break;
        case 'Tenant':
          navigate('/properties');
          break;
        case 'Buyer':
          navigate('/listings/sale');
          break;
        case 'Renter':
          navigate('/listings/rent');
          break;
        default:
          navigate('/dashboard');
      }
    } else {
      setError('Invalid email or password');
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login</h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Owner">I'm a Property Owner</option>
            <option value="Agent">I'm a Real Estate Agent</option>
            <option value="Buyer">I'm Looking to Buy</option>
            <option value="Renter">I'm Looking to Rent</option>
            <option value="Tenant">I'm a Current Tenant</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
