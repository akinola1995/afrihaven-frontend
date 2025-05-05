import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AddListing() {
  const { type } = useParams();
  const [form, setForm] = useState({
    title: '',
    price: '',
    state: '',
    city: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting new listing:', { type, ...form });
    // Hook this up to backend later
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
          type="text"
          name="price"
          placeholder="Price (e.g. ₦2,500,000)"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Add Listing
        </button>
      </form>
    </div>
  );
}

export default AddListing;
