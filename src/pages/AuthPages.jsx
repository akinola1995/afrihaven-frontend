import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';


const Landing = () => {
  const navigate = useNavigate();

  // Search form state
  const [form, setForm] = useState({
    type: 'rent',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    country: '',
    state: ''
  });

  // Country click search state
  const [countryResults, setCountryResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [loadingCountry, setLoadingCountry] = useState(false);

  // Handle form field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle main search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const query = new URLSearchParams(form).toString();
      const response = await axios.get(`http://localhost:8080/api/properties/search?${query}`);
      localStorage.setItem('searchResults', JSON.stringify(response.data));
      navigate(`/explore?${query}`);
    } catch (err) {
      alert('Search failed. Please try again.');
      console.error(err);
    }
  };

  // Handle country flag click
  const handleCountrySelect = async (countryName) => {
    setSelectedCountry(countryName);
    setLoadingCountry(true);
    setCountryResults([]);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/properties/search?country=${encodeURIComponent(countryName)}`
      );
      setCountryResults(response.data || []);
    } catch (e) {
      alert('Failed to fetch properties for ' + countryName);
      setCountryResults([]);
    }
    setLoadingCountry(false);
  };

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

  // Country list for Explore by Country
  const countries = [
    { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
    { name: 'Ghana', code: 'GH', flag: '🇬🇭' },
    { name: 'Kenya', code: 'KE', flag: '🇰🇪' },
    { name: 'South Africa', code: 'ZA', flag: '🇿🇦' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to AfriHaven</h1>
        <p className="text-gray-700 text-lg mb-8">
          Discover homes for rent, sale, or short stays across Africa — from Lagos to Nairobi.
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

        {/* Search Bar */}
        <div className="bg-white py-8 px-4 md:px-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Search Properties</h2>
          <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
            <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
              <option value="shortlet">Short Let</option>
              <option value="vacation">Vacation</option>
            </select>
            <select name="propertyType" value={form.propertyType} onChange={handleChange} className="border p-2 rounded">
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="duplex">Duplex</option>
              <option value="shop">Shop</option>
              <option value="land">Land</option>
              <option value="bungalow">Bungalow</option>
              <option value="office">Office Space</option>
              <option value="self-contain">Self Contain</option>
            </select>
            <input name="minPrice" type="number" placeholder="Min Price" value={form.minPrice} onChange={handleChange} className="border p-2 rounded" />
            <input name="maxPrice" type="number" placeholder="Max Price" value={form.maxPrice} onChange={handleChange} className="border p-2 rounded" />
            <select name="bedrooms" value={form.bedrooms} onChange={handleChange} className="border p-2 rounded">
              <option value="">Any Bedrooms</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} Bedroom{(i + 1 > 1) ? 's' : ''}</option>
              ))}
            </select>
            <select name="country" value={form.country} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>{country.name}</option>
              ))}
            </select>
            <input name="state" placeholder="State (e.g. Lagos)" value={form.state} onChange={handleChange} className="border p-2 rounded" />
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 col-span-full md:col-span-1">
              Search
            </button>
          </form>
        </div>

        {/* Demo Sections */}
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

        {/* Country Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">Explore by Country</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {countries.map((country, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleCountrySelect(country.name)}
                className="flex items-center justify-center gap-2 p-3 rounded border bg-white shadow hover:bg-blue-50 transition w-full"
              >
                <img
                  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                  alt={country.name}
                  className="w-6 h-4 object-cover"
                />
                <span className="text-sm font-medium text-blue-800">{country.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Country Results */}
        {selectedCountry && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              Properties in {selectedCountry}
            </h3>
            {loadingCountry ? (
              <p className="text-gray-500">Loading...</p>
            ) : countryResults.length === 0 ? (
              <p className="text-gray-600">No properties found for this country.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {countryResults.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white p-4 rounded shadow"
                  >
                    <img
                      src={
                        prop.imageUrls && prop.imageUrls.length > 0
                          ? prop.imageUrls[0]
                          : '/default-house.jpg'
                      }
                      alt={prop.title}
                      className="w-full h-36 object-cover rounded mb-2"
                    />
                    <h4 className="font-semibold text-lg mb-1">{prop.title}</h4>
                    <p className="text-sm text-gray-600">
                      {prop.city}, {prop.state}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">{prop.type}</p>
                    <p className="font-bold mt-2">₦{Number(prop.price).toLocaleString()}</p>
                    <button
                      className="mt-3 text-sm text-blue-600 underline"
                      onClick={() => navigate(`/properties/${prop.id}/details`)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const validUsers = {
  'admin@afrihaven.com': { password: 'admin123', role: 'Admin' },
  'owner@afrihaven.com': { password: 'owner123', role: 'Owner' },
  'agent@afrihaven.com': { password: 'agent123', role: 'Agent' },
  'tenant@afrihaven.com': { password: 'tenant123', role: 'Tenant' },
  'buyer@afrihaven.com': { password: 'buyer123', role: 'Buyer' },
  'renter@afrihaven.com': { password: 'renter123', role: 'Renter' },
  'guest@afrihaven.com': { password: 'inquire123', role: 'Inquirer' }
};


// const Login = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:8080/api/auth/login', form);
//       const { role, email, message } = response.data;

//       if (message === 'success') {
//         localStorage.setItem('auth', 'true');
//         localStorage.setItem('role', role);
//         localStorage.setItem('email', email);

//         switch (role) {
//           case 'Owner':
//             navigate('/dashboard/owner');
//             break;
//           case 'Agent':
//             navigate('/dashboard/agent');
//             break;
//           case 'Admin':
//             navigate('/dashboard/admin');
//             break;
//           case 'Tenant':
//             navigate('/dashboard/tenant');
//             break;
//           case 'Buyer':
//             navigate('/dashboard/buyer');
//             break;
//           case 'Renter':
//             navigate('/dashboard/renter');
//             break;
//           default:
//             navigate('/dashboard/inquirer');
//         }
//       } else {
//         setError('Invalid credentials. Please try again.');
//       }
//     } catch (err) {
//       setError('Authentication failed. Server may be unavailable.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login</h2>
//         {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-sm text-center mt-4 text-gray-600">
//           Don’t have an account?{' '}
//           <a href="/register" className="text-blue-600 underline">
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', form);

      if (response.data.message === "success") {
        const role = response.data.role;
        localStorage.setItem("auth", "true");
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", role);

        if (role && typeof role === "string") {
          navigate(`/dashboard/${role.toLowerCase()}`);
        } else {
          setError("No user role detected. Please contact support.");
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Authentication failed. Server may be unavailable.');
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
};


export { Landing, Login };
