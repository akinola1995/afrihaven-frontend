// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     role: 'Tenant'
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check password match
//     if (form.password !== form.confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     // Simulate registration (can be replaced with API call)
//     const newUser = {
//       fullName: form.fullName,
//       email: form.email,
//       password: form.password,
//       phone: form.phone,
//       role: form.role
//     };

//     console.log('Registered user:', newUser);

//     // Save minimal info in localStorage (not for production!)
//     localStorage.setItem('auth', 'false'); // Force login after registration
//     localStorage.setItem('registeredUser', JSON.stringify(newUser));
    
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Register</h2>
//         {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

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
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
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

//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           >
//             <option value="Tenant">Tenant</option>
//             <option value="Owner">Owner</option>
//             <option value="Agent">Agent</option>
//             <option value="Buyer">Buyer</option>
//             <option value="Renter">Renter</option>
//             <option value="Inquirer">Inquirer</option>
//           </select>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4 text-gray-600">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-600 underline">
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'Tenant'
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/register', form);

      if (response.status === 200) {
        const user = response.data;

        // Save auth data
        localStorage.setItem('auth', 'true');
        localStorage.setItem('email', user.email);
        localStorage.setItem('role', user.role);

        // Redirect to dashboard based on role
        const dashboardPath = `/dashboard/${user.role.toLowerCase()}`;
        navigate(dashboardPath);
      }
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Register</h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
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
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
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
            <option value="Tenant">Tenant</option>
            <option value="Owner">Owner</option>
            <option value="Agent">Agent</option>
            <option value="Buyer">Buyer</option>
            <option value="Renter">Renter</option>
            <option value="Inquirer">Inquirer</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 underline">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;

