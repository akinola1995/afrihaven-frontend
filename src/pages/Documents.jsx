import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Documents() {
  const { propertyId } = useParams();

  const [docs, setDocs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const newDoc = {
      name: selectedFile.name,
      description,
      uploadedAt: new Date().toISOString().split('T')[0],
      url: URL.createObjectURL(selectedFile),
      propertyId
    };

    setDocs([newDoc, ...docs]);
    setSelectedFile(null);
    setDescription('');
  };

  const filteredDocs = docs.filter((doc) => doc.propertyId === propertyId);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">
        Documents for Property ID: <span className="text-gray-800">{propertyId}</span>
      </h1>

      <form onSubmit={handleUpload} className="space-y-4 bg-white p-4 rounded shadow mb-8">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
          accept=".pdf,.png,.jpg,.jpeg"
          required
        />
        <input
          type="text"
          placeholder="Description (e.g. Lease Agreement)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload Document
        </button>
      </form>

      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredDocs.map((doc, index) => (
            <div key={index} className="bg-white p-4 rounded shadow space-y-2">
              <h3 className="text-md font-semibold text-gray-800">{doc.name}</h3>
              <p className="text-sm text-gray-600">{doc.description}</p>
              <p className="text-xs text-gray-500">Uploaded: {doc.uploadedAt}</p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View / Download
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No documents uploaded yet for this property.</p>
      )}
    </div>
  );
}

export default Documents;
