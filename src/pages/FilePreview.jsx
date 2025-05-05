import React, { useState } from 'react';

function FilePreview() {
  const [docs] = useState([
    {
      name: 'Lease Agreement - John Doe.pdf',
      type: 'pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      uploadedAt: '2025-04-20'
    },
    {
      name: 'ID Card - Jane Smith.jpg',
      type: 'image',
      url: 'https://source.unsplash.com/400x300/?id-card',
      uploadedAt: '2025-04-22'
    }
  ]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">File Preview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {docs.map((doc, index) => (
          <div key={index} className="bg-white rounded shadow p-4 space-y-2">
            <h2 className="text-lg font-semibold">{doc.name}</h2>
            <p className="text-sm text-gray-500">Uploaded: {doc.uploadedAt}</p>

            {doc.type === 'image' ? (
              <img src={doc.url} alt={doc.name} className="rounded w-full object-cover h-48" />
            ) : (
              <iframe
                src={doc.url}
                title={doc.name}
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
    </div>
  );
}

export default FilePreview;
