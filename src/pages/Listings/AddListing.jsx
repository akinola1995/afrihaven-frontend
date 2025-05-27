// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// function AddListing() {
//   const { type } = useParams();
//   const [form, setForm] = useState({
//     title: '',
//     price: '',
//     state: '',
//     city: '',
//     description: ''
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitting new listing:', { type, ...form });
//     // Hook this up to backend later
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">
//         Add New Listing for {type.charAt(0).toUpperCase() + type.slice(1)}
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
//         <input
//           type="text"
//           name="title"
//           placeholder="Listing Title"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="price"
//           placeholder="Price (e.g. ₦2,500,000)"
//           value={form.price}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="state"
//           placeholder="State"
//           value={form.state}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={form.city}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           rows="4"
//         />
//         <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
//           Add Listing
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddListing;

// src/pages/AddListing.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddListing() {
  const { type } = useParams(); // e.g. rent, sale, shortlet, vacation, land
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || '';
  const role = localStorage.getItem('role') || '';

  const [form, setForm] = useState({
    title: '',
    price: '',
    propertyType: '',
    bedrooms: '',
    country: '',
    state: '',
    city: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newListing = {
      ...form,
      type, // rent, sale, vacation, shortlet
      ownerEmail: email // to be matched in backend with actual user
    };

    try {
      await axios.post('http://localhost:8080/api/properties', newListing);
      alert('Listing added successfully!');
      navigate('/properties');
    } catch (err) {
      console.error('Error adding listing:', err);
      alert('Error adding property. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Add New Listing for {type.charAt(0).toUpperCase() + type.slice(1)}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Listing Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₦)"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="propertyType"
          placeholder="Property Type (e.g. Apartment, Bungalow)"
          value={form.propertyType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Number of Bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="4"
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Add Listing
        </button>
      </form>
    </div>
  );
}

export default AddListing;
