// import React, { useState } from 'react';

// function Calendar() {
//   const [reminders, setReminders] = useState([
//     { title: 'Rent Due - John Doe', date: '2025-05-05', type: 'Rent' },
//     { title: 'Property Inspection - Block B2', date: '2025-05-12', type: 'Inspection' },
//   ]);

//   const [form, setForm] = useState({
//     title: '',
//     date: '',
//     type: 'Rent'
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setReminders([...reminders, form]);
//     setForm({ title: '', date: '', type: 'Rent' });
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Calendar & Reminders</h1>

//       <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Reminder Title"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="date"
//           name="date"
//           value={form.date}
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
//           <option value="Rent">Rent</option>
//           <option value="Inspection">Inspection</option>
//           <option value="Maintenance">Maintenance</option>
//         </select>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Add Reminder
//         </button>
//       </form>

//       <ul className="space-y-3">
//         {reminders.map((reminder, index) => (
//           <li key={index} className="bg-white p-4 shadow rounded flex justify-between items-center">
//             <div>
//               <h2 className="text-lg font-semibold">{reminder.title}</h2>
//               <p className="text-sm text-gray-600">{reminder.date}</p>
//             </div>
//             <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800">
//               {reminder.type}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Calendar;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Calendar() {
  const userEmail = localStorage.getItem('email') || '';
  const [reminders, setReminders] = useState([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    type: 'Rent'
  });

  // Load reminders from backend on mount
  useEffect(() => {
    async function fetchReminders() {
      try {
        const response = await axios.get('http://localhost:8080/api/reminders', {
          params: { email: userEmail }
        });
        setReminders(response.data);
      } catch (err) {
        console.error('Failed to load reminders:', err);
      }
    }

    fetchReminders();
  }, [userEmail]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReminder = {
        ...form,
        email: userEmail
      };
      const res = await axios.post('http://localhost:8080/api/reminders', newReminder);
      setReminders([res.data, ...reminders]);
      setForm({ title: '', date: '', type: 'Rent' });
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Calendar & Reminders</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Reminder Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Rent">Rent</option>
          <option value="Inspection">Inspection</option>
          <option value="Maintenance">Maintenance</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Reminder
        </button>
      </form>

      {reminders.length === 0 ? (
        <p className="text-gray-500 text-sm">No reminders added yet.</p>
      ) : (
        <ul className="space-y-3">
          {reminders.map((reminder, index) => (
            <li
              key={index}
              className="bg-white p-4 shadow rounded flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{reminder.title}</h2>
                <p className="text-sm text-gray-600">
                  {new Date(reminder.date).toDateString()}
                </p>
              </div>
              <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                {reminder.type}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Calendar;
