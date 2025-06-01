// import React from 'react';
// import { useParams } from 'react-router-dom';

// function Documents() {
//   const { propertyId } = useParams();

//   const docs = [
//     { name: 'Lease Agreement.pdf', uploaded: '2025-04-01', url: '#' },
//     { name: 'Payment Receipt.png', uploaded: '2025-04-10', url: '#' }
//   ];

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Documents for Property: {propertyId}</h1>

//       <ul className="space-y-4">
//         {docs.map((doc, i) => (
//           <li key={i} className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold text-lg">{doc.name}</h3>
//             <p className="text-sm text-gray-500">Uploaded on: {doc.uploaded}</p>
//             <a href={doc.url} className="text-blue-600 underline text-sm" target="_blank" rel="noreferrer">View / Download</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Documents;

// src/pages/Documents.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Documents() {
  const { propertyId } = useParams();
  const [docs, setDocs] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/documents/${propertyId}`);
      setDocs(res.data);
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [propertyId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      await axios.post(`http://localhost:8080/api/documents/upload/${propertyId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFile(null);
      fetchDocuments();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed!');
    }
    setUploading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Documents for Property: {propertyId}</h1>

      {/* Upload form */}
      <form onSubmit={handleUpload} className="mb-6">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2"
          required
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>

      {/* Document List */}
      <ul className="space-y-4">
        {docs.map((doc) => (
          <li key={doc.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg">{doc.name}</h3>
            <p className="text-sm text-gray-500">Uploaded on: {new Date(doc.uploadedAt).toLocaleDateString()}</p>
            <a
              href={`http://localhost:8080/api/documents/download/${doc.id}`}
              className="text-blue-600 underline text-sm"
              target="_blank"
              rel="noreferrer"
            >
              View / Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Documents;
