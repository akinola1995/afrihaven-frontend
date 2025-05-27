// import React, { useEffect, useState } from 'react';

// export default function Inbox() {
//   const email = localStorage.getItem('email');
//   const role = localStorage.getItem('role');
//   const name = email?.split('@')[0] || 'User';

//   const [messages, setMessages] = useState([]);
//   const [form, setForm] = useState({ to: '', subject: '', message: '' });
//   const [reply, setReply] = useState({});
//   const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' or 'sent'

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem('messages') || '[]');
//     setMessages(stored.reverse());
//   }, []);

//   const inboxMessages = messages.filter(m => m.toEmail === email);
//   const sentMessages = messages.filter(m => m.fromEmail === email);

//   const handleSend = (e) => {
//     e.preventDefault();
//     const newMsg = {
//       from: name,
//       fromEmail: email,
//       to: form.to,
//       toEmail: form.to,
//       subject: form.subject,
//       message: form.message,
//       sentAt: new Date().toISOString()
//     };
//     const updated = [newMsg, ...messages];
//     localStorage.setItem('messages', JSON.stringify(updated));
//     setMessages(updated);
//     setForm({ to: '', subject: '', message: '' });
//   };

//   const handleReply = (msg) => {
//     const newMsg = {
//       from: name,
//       fromEmail: email,
//       to: msg.from,
//       toEmail: msg.fromEmail,
//       subject: `RE: ${msg.subject}`,
//       message: reply[msg.sentAt] || '',
//       sentAt: new Date().toISOString()
//     };
//     const updated = [newMsg, ...messages];
//     localStorage.setItem('messages', JSON.stringify(updated));
//     setMessages(updated);
//     setReply({ ...reply, [msg.sentAt]: '' });
//   };

//   const handleDelete = (sentAt) => {
//     const filtered = messages.filter((msg) => msg.sentAt !== sentAt);
//     localStorage.setItem('messages', JSON.stringify(filtered));
//     setMessages(filtered);
//   };

//   const renderMessages = (list) =>
//     list.length === 0 ? (
//       <p className="text-gray-600">No messages found.</p>
//     ) : (
//       <div className="space-y-4">
//         {list.map((msg, i) => (
//           <div key={i} className="bg-white shadow rounded p-4">
//             <div className="flex justify-between">
//               <div className="text-sm text-gray-500">
//                 <p><strong>From:</strong> {msg.from} ({msg.fromEmail})</p>
//                 <p><strong>To:</strong> {msg.to}</p>
//                 <p><strong>Subject:</strong> {msg.subject}</p>
//                 <p><strong>Date:</strong> {new Date(msg.sentAt).toLocaleString()}</p>
//               </div>
//               <button
//                 onClick={() => handleDelete(msg.sentAt)}
//                 className="text-red-600 text-sm hover:underline"
//               >
//                 Delete
//               </button>
//             </div>

//             <p className="mt-2 text-gray-800">{msg.message}</p>

//             {activeTab === 'inbox' && (
//               <div className="mt-4 space-y-2">
//                 <textarea
//                   rows="2"
//                   placeholder="Reply..."
//                   value={reply[msg.sentAt] || ''}
//                   onChange={(e) =>
//                     setReply({ ...reply, [msg.sentAt]: e.target.value })
//                   }
//                   className="w-full border p-2 rounded"
//                 ></textarea>
//                 <button
//                   onClick={() => handleReply(msg)}
//                   className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
//                 >
//                   Reply
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     );

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-blue-800 mb-4">Inbox & Messages</h1>

//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === 'inbox'
//               ? 'bg-blue-600 text-white'
//               : 'bg-gray-200 text-gray-800'
//           }`}
//           onClick={() => setActiveTab('inbox')}
//         >
//           Inbox
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === 'sent'
//               ? 'bg-blue-600 text-white'
//               : 'bg-gray-200 text-gray-800'
//           }`}
//           onClick={() => setActiveTab('sent')}
//         >
//           Sent
//         </button>
//       </div>

//       {/* New Message Form */}
//       <div className="bg-white shadow rounded p-4 mb-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-2">Send New Message</h2>
//         <form onSubmit={handleSend} className="space-y-3">
//           <input
//             type="text"
//             name="to"
//             placeholder="To (email)"
//             value={form.to}
//             onChange={(e) => setForm({ ...form, to: e.target.value })}
//             required
//             className="w-full border p-2 rounded"
//           />
//           <input
//             type="text"
//             name="subject"
//             placeholder="Subject"
//             value={form.subject}
//             onChange={(e) => setForm({ ...form, subject: e.target.value })}
//             required
//             className="w-full border p-2 rounded"
//           />
//           <textarea
//             name="message"
//             rows="3"
//             placeholder="Message"
//             value={form.message}
//             onChange={(e) => setForm({ ...form, message: e.target.value })}
//             required
//             className="w-full border p-2 rounded"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Send
//           </button>
//         </form>
//       </div>

//       {/* Messages Section */}
//       {activeTab === 'inbox'
//         ? renderMessages(inboxMessages)
//         : renderMessages(sentMessages)}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Inbox() {
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  const name = email?.split('@')[0] || 'User';

  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ to: '', subject: '', message: '' });
  const [reply, setReply] = useState({});
  const [activeTab, setActiveTab] = useState('inbox');

  const API = 'http://localhost:8080/api/messages';

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await axios.get(`${API}/${activeTab}/${email}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    };
    if (email) loadMessages();
  }, [activeTab, email]);

  const handleSend = async (e) => {
    e.preventDefault();
    const newMsg = {
      fromName: name,
      fromEmail: email,
      toEmail: form.to,
      subject: form.subject,
      message: form.message
    };

    try {
      await axios.post(API, newMsg);
      setForm({ to: '', subject: '', message: '' });
      if (activeTab === 'sent') {
        const res = await axios.get(`${API}/sent/${email}`);
        setMessages(res.data);
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const handleReply = async (msg) => {
    const replyMsg = {
      fromName: name,
      fromEmail: email,
      toEmail: msg.fromEmail,
      subject: `RE: ${msg.subject}`,
      message: reply[msg.id] || ''
    };

    try {
      await axios.post(API, replyMsg);
      setReply({ ...reply, [msg.id]: '' });
      if (activeTab === 'sent') {
        const res = await axios.get(`${API}/sent/${email}`);
        setMessages(res.data);
      }
    } catch (err) {
      console.error("Reply failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setMessages(messages.filter(m => m.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const renderMessages = (list) => list.length === 0 ? (
    <p className="text-gray-600">No messages found.</p>
  ) : (
    <div className="space-y-4">
      {list.map((msg, i) => (
        <div key={msg.id} className="bg-white shadow rounded p-4">
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">
              <p><strong>From:</strong> {msg.fromName} ({msg.fromEmail})</p>
              <p><strong>To:</strong> {msg.toEmail}</p>
              <p><strong>Subject:</strong> {msg.subject}</p>
              <p><strong>Date:</strong> {new Date(msg.sentAt).toLocaleString()}</p>
            </div>
            <button
              onClick={() => handleDelete(msg.id)}
              className="text-red-600 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
          <p className="mt-2 text-gray-800">{msg.message}</p>

          {activeTab === 'inbox' && (
            <div className="mt-4 space-y-2">
              <textarea
                rows="2"
                placeholder="Reply..."
                value={reply[msg.id] || ''}
                onChange={(e) =>
                  setReply({ ...reply, [msg.id]: e.target.value })
                }
                className="w-full border p-2 rounded"
              ></textarea>
              <button
                onClick={() => handleReply(msg)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
              >
                Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Inbox & Messages</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'inbox' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('inbox')}
        >
          Inbox
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'sent' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setActiveTab('sent')}
        >
          Sent
        </button>
      </div>

      {/* New Message Form */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Send New Message</h2>
        <form onSubmit={handleSend} className="space-y-3">
          <input
            type="text"
            name="to"
            placeholder="To (email)"
            value={form.to}
            onChange={(e) => setForm({ ...form, to: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="message"
            rows="3"
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>

      {/* Render Messages */}
      {renderMessages(activeTab === 'inbox' ? messages.filter(m => m.toEmail === email) : messages.filter(m => m.fromEmail === email))}
    </div>
  );
}
