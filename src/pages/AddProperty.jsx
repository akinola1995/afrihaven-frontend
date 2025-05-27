// import React, { useState } from 'react';

// function AddProperty() {
//   const [form, setForm] = useState({
//     title: '',
//     type: 'Rent',
//     description: '',
//     price: '',
//     state: '',
//     city: '',
//     images: [],
//     video: null
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'images') {
//       setForm({ ...form, images: [...files] });
//     } else if (name === 'video') {
//       setForm({ ...form, video: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     const existing = JSON.parse(localStorage.getItem('properties') || '[]');
//     const newProperty = { ...form, id: Date.now() };
//     localStorage.setItem('properties', JSON.stringify([...existing, newProperty]));
  
//     alert('Property submitted and saved locally!');
//     setForm({
//       title: '',
//       type: 'Rent',
//       description: '',
//       price: '',
//       state: '',
//       city: '',
//       images: [],
//       video: null
//     });
//   };
  

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-bold text-blue-700 mb-4">Add New Property</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Property Title"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <select
//           name="type"
//           value={form.type}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="Rent">For Rent</option>
//           <option value="Sale">For Sale</option>
//           <option value="Shortlet">Short Let</option>
//           <option value="Vacation">Vacation Home</option>
//         </select>

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
//           placeholder="Property Description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           rows="4"
//         />

//         <div>
//           <label className="block text-sm text-gray-700 mb-1">Upload Photos (Max 10)</label>
//           <input
//             type="file"
//             name="images"
//             accept="image/*"
//             multiple
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//           {form.images.length > 0 && (
//             <div className="mt-2 grid grid-cols-2 gap-2">
//               {Array.from(form.images).map((img, i) => (
//                 <img
//                   key={i}
//                   src={URL.createObjectURL(img)}
//                   alt={`upload-${i}`}
//                   className="rounded object-cover h-32 w-full"
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm text-gray-700 mb-1">Optional Video</label>
//           <input
//             type="file"
//             name="video"
//             accept="video/*"
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//           {form.video && (
//             <p className="text-sm text-gray-600 mt-1">Selected: {form.video.name}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Submit Property
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProperty;

// src/pages/AddProperty.jsx

import React, { useState } from 'react';
import axios from 'axios';

function AddProperty() {
  const [form, setForm] = useState({
    title: '',
    type: 'Rent',
    propertyType: '',
    bedrooms: '',
    description: '',
    price: '',
    state: '',
    city: '',
    country: '',
    images: [],
    video: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setForm({ ...form, images: [...files] });
    } else if (name === 'video') {
      setForm({ ...form, video: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append property JSON as Blob
      const propertyPayload = {
        title: form.title,
        description: form.description,
        price: form.price,
        type: form.type,
        propertyType: form.propertyType,
        bedrooms: parseInt(form.bedrooms, 10),
        state: form.state,
        city: form.city,
        country: form.country,
        ownerEmail: localStorage.getItem('email') || 'owner@afrihaven.com' // fallback
      };

      formData.append(
        'property',
        new Blob([JSON.stringify(propertyPayload)], { type: 'application/json' })
      );

      // Append images
      form.images.forEach((img) => {
        formData.append('images', img);
      });

      // Append video
      if (form.video) {
        formData.append('video', form.video);
      }

      await axios.post('/api/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Property uploaded successfully!');
      setForm({
        title: '',
        type: 'Rent',
        propertyType: '',
        bedrooms: '',
        description: '',
        price: '',
        state: '',
        city: '',
        country: '',
        images: [],
        video: null
      });
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload property. Check the console for details.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Add New Property</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={form.title} onChange={handleChange}
          placeholder="Property Title" className="w-full border p-2 rounded" required />

        <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="Rent">For Rent</option>
          <option value="Sale">For Sale</option>
          <option value="Shortlet">Short Let</option>
          <option value="Vacation">Vacation Home</option>
        </select>

        <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="duplex">Duplex</option>
          <option value="shop">Shop</option>
          <option value="land">Land</option>
          <option value="bungalow">Bungalow</option>
          <option value="office">Office Space</option>
          <option value="self-contain">Self Contain</option>
        </select>

        <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange}
          placeholder="Number of Bedrooms" className="w-full border p-2 rounded" />

        <input type="text" name="price" value={form.price} onChange={handleChange}
          placeholder="Price (₦)" className="w-full border p-2 rounded" required />

        <input type="text" name="state" value={form.state} onChange={handleChange}
          placeholder="State" className="w-full border p-2 rounded" />

        <input type="text" name="city" value={form.city} onChange={handleChange}
          placeholder="City" className="w-full border p-2 rounded" />

        <input type="text" name="country" value={form.country} onChange={handleChange}
          placeholder="Country (e.g. Nigeria)" className="w-full border p-2 rounded" />

        <textarea name="description" value={form.description} onChange={handleChange}
          placeholder="Property Description" rows="4" className="w-full border p-2 rounded" />

        <div>
          <label className="block text-sm mb-1 text-gray-700">Upload Images (Max 10)</label>
          <input type="file" name="images" accept="image/*" multiple onChange={handleChange}
            className="w-full border p-2 rounded" />
          {form.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {form.images.map((img, i) => (
                <img key={i} src={URL.createObjectURL(img)} alt={`preview-${i}`}
                  className="h-32 w-full object-cover rounded" />
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-700">Optional Video</label>
          <input type="file" name="video" accept="video/*" onChange={handleChange}
            className="w-full border p-2 rounded" />
          {form.video && <p className="text-sm text-gray-600 mt-1">Selected: {form.video.name}</p>}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
