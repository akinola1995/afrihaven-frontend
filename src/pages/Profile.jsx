// import React, { useState, useEffect } from 'react';

// function Profile() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     role: '',
//     phone: '',
//     avatar: null // for later use
//   });

//   useEffect(() => {
//     // Simulate fetching user info from localStorage
//     const email = localStorage.getItem('email') || 'user@caremyhome.com';
//     const role = localStorage.getItem('role') || 'User';
//     setForm((prev) => ({ ...prev, email, role }));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'avatar') {
//       setForm({ ...form, avatar: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('User info updated (not yet saved to backend)');
//     // In a real app, you would send this to your backend here
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-bold text-blue-700 mb-6">My Profile</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           disabled
//           className="w-full border p-2 rounded bg-gray-100"
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="role"
//           value={form.role}
//           disabled
//           className="w-full border p-2 rounded bg-gray-100"
//         />

//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Upload Avatar (optional)</label>
//           <input
//             type="file"
//             name="avatar"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Profile;





import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    avatar: null
  });

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      axios.get(`/api/users/${email}`)
        .then((res) => setForm(res.data))
        .catch(() => alert('Failed to load user profile.'));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setForm({ ...form, avatar: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('phone', form.phone);
    if (form.avatar) {
      formData.append('avatar', form.avatar);
    }

    try {
      await axios.put(`/api/users/${form.email}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Profile updated successfully');
    } catch {
      alert('Update failed. Try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">My Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" value={form.name || ''} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="email" name="email" value={form.email || ''} disabled className="w-full border p-2 rounded bg-gray-100" />
        <input type="text" name="phone" placeholder="Phone Number" value={form.phone || ''} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="role" value={form.role || ''} disabled className="w-full border p-2 rounded bg-gray-100" />

        <div>
          <label className="block text-sm text-gray-600 mb-1">Upload Avatar (optional)</label>
          <input type="file" name="avatar" accept="image/*" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
