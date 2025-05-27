// import React, { useState } from 'react';

// function FilePreview() {
//   const [docs] = useState([
//     {
//       name: 'Lease Agreement - John Doe.pdf',
//       type: 'pdf',
//       url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
//       uploadedAt: '2025-04-20'
//     },
//     {
//       name: 'ID Card - Jane Smith.jpg',
//       type: 'image',
//       url: 'https://source.unsplash.com/400x300/?id-card',
//       uploadedAt: '2025-04-22'
//     }
//   ]);

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">File Preview</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {docs.map((doc, index) => (
//           <div key={index} className="bg-white rounded shadow p-4 space-y-2">
//             <h2 className="text-lg font-semibold">{doc.name}</h2>
//             <p className="text-sm text-gray-500">Uploaded: {doc.uploadedAt}</p>

//             {doc.type === 'image' ? (
//               <img src={doc.url} alt={doc.name} className="rounded w-full object-cover h-48" />
//             ) : (
//               <iframe
//                 src={doc.url}
//                 title={doc.name}
//                 className="w-full h-64 rounded border"
//               ></iframe>
//             )}

//             <a
//               href={doc.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 underline text-sm"
//             >
//               View or Download
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FilePreview;

// src/pages/FilePreview.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function FilePreview() {
  const { propertyId } = useParams(); // Optional for per-property preview
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    try {
      const endpoint = propertyId
        ? `/api/documents/property/${propertyId}`
        : '/api/documents';

      const res = await axios.get(endpoint);
      setDocs(res.data);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [propertyId]);

  const getFileType = (name) => {
    const ext = name.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
    return 'pdf';
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {propertyId ? `Documents for Property: ${propertyId}` : 'All Uploaded Documents'}
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading documents...</p>
      ) : docs.length === 0 ? (
        <p className="text-gray-500">No documents available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {docs.map((doc, index) => (
            <div key={index} className="bg-white rounded shadow p-4 space-y-2">
              <h2 className="text-lg font-semibold">{doc.filename}</h2>
              <p className="text-sm text-gray-500">
                Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
              </p>

              {getFileType(doc.filename) === 'image' ? (
                <img
                  src={doc.url}
                  alt={doc.filename}
                  className="rounded w-full object-cover h-48"
                />
              ) : (
                <iframe
                  src={doc.url}
                  title={doc.filename}
                  className="w-full h-64 rounded border"
                ></iframe>
              )}

              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View or Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilePreview;
