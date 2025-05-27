// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';
// import BackButton from '../../components/BackButton';

// const dummyProperties = [
//   {
//     id: '1',
//     title: '3 Bedroom Flat in Lekki',
//     type: 'rent',
//     bedrooms: 3,
//     price: 1500,
//     description: 'Spacious flat with parking and balcony.',
//     country: 'Nigeria',
//     state: 'Lagos',
//     images: [
//       'https://source.unsplash.com/600x400/?apartment,lekki',
//       'https://source.unsplash.com/600x400/?room,lekki',
//       'https://source.unsplash.com/600x400/?kitchen,lekki'
//     ]
//   },
//   {
//     id: '2',
//     title: 'Luxury Villa in Cape Town',
//     type: 'vacation',
//     bedrooms: 5,
//     price: 4500,
//     description: 'Sea view luxury with private pool.',
//     country: 'South Africa',
//     state: 'Western Cape',
//     images: ['https://source.unsplash.com/600x400/?villa,sea']
//   }
// ];

// export default function PropertyDetails() {
//   const { propertyId } = useParams();
//   const property = dummyProperties.find(p => p.id === propertyId);

//   const [currentImage, setCurrentImage] = useState(0);
//   const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const inquiry = {
//       propertyId,
//       ...form,
//       submittedAt: new Date().toISOString()
//     };

//     const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
//     inquiries.push(inquiry);
//     localStorage.setItem('inquiries', JSON.stringify(inquiries));

//     setSubmitted(true);
//     setForm({ name: '', email: '', phone: '', message: '' });
//   };

//   if (!property) return <p className="p-6 text-center text-red-500">Property not found.</p>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <BackButton />
//       <div className="mb-4">
//         <Zoom>
//           <img
//             src={property.images[currentImage]}
//             alt={property.title}
//             className="rounded-lg w-full h-80 object-cover cursor-zoom-in"
//           />
//         </Zoom>
//         {property.images.length > 1 && (
//           <div className="flex gap-2 mt-2 overflow-x-auto">
//             {property.images.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 alt={`thumb-${i}`}
//                 onClick={() => setCurrentImage(i)}
//                 className={`h-20 w-32 object-cover rounded cursor-pointer border-2 ${
//                   currentImage === i ? 'border-blue-600' : 'border-transparent'
//                 }`}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <h1 className="text-2xl font-bold text-blue-800 mb-2">{property.title}</h1>
//       <p className="text-gray-600 mb-2">{property.description}</p>
//       <p className="text-sm text-gray-700">
//         {property.country}, {property.state} | {property.bedrooms} Bed | ${property.price}
//       </p>

//       <div className="mt-8">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Send an Inquiry</h2>
//         {submitted && (
//           <p className="text-green-600 text-sm mb-3">Your inquiry was submitted successfully.</p>
//         )}
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 bg-white p-4 shadow rounded-lg">
//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             className="border p-2 rounded"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="border p-2 rounded"
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />
//           <textarea
//             name="message"
//             rows="3"
//             placeholder="Message"
//             value={form.message}
//             onChange={handleChange}
//             required
//             className="border p-2 rounded"
//           ></textarea>
//           <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
//             Submit Inquiry
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import axios from 'axios';
import BackButton from '../../components/BackButton';

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/properties/${propertyId}`)
      .then(res => setProperty(res.data))
      .catch(err => console.error('Error loading property:', err));
  }, [propertyId]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/properties/${propertyId}/inquiry`, {
      ...form,
      submittedAt: new Date().toISOString()
    })
    .then(() => {
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    })
    .catch(err => {
      console.error('Inquiry submission failed', err);
      alert('Failed to send inquiry. Try again.');
    });
  };

  if (!property) return <p className="p-6 text-center text-red-500">Loading property...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <BackButton />
      <div className="mb-4">
        <Zoom>
          <img
            src={property.images?.[currentImage] || 'https://via.placeholder.com/600x400'}
            alt={property.title}
            className="rounded-lg w-full h-80 object-cover cursor-zoom-in"
          />
        </Zoom>
        {property.images?.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {property.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setCurrentImage(i)}
                className={`h-20 w-32 object-cover rounded cursor-pointer border-2 ${
                  currentImage === i ? 'border-blue-600' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <h1 className="text-2xl font-bold text-blue-800 mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-2">{property.description}</p>
      <p className="text-sm text-gray-700">
        {property.country}, {property.state} | {property.bedrooms} Bed | ₦{property.price.toLocaleString()}
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Send an Inquiry</h2>
        {submitted && (
          <p className="text-green-600 text-sm mb-3">Your inquiry was submitted successfully.</p>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 bg-white p-4 shadow rounded-lg">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <textarea
            name="message"
            rows="3"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          ></textarea>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
