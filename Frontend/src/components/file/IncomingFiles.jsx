import React from 'react';

const IncomingFiles = ({ incomingFiles = [], onDownload }) => {
  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-[#200a3a] rounded shadow">
      <h2 className="text-white text-xl mb-4 font-bold">Incoming Files</h2>
      {incomingFiles.length === 0 ? (
        <p className="text-purple-300">No incoming files yet.</p>
      ) : (
        <ul className="space-y-2">
          {incomingFiles.map((file, index) => (
            <li key={index} className="bg-purple-700/30 text-white px-4 py-2 rounded flex justify-between items-center">
              <span>{file.name}</span>
              <button
                onClick={() => onDownload(file)}
                className="text-sm px-3 py-1 bg-pink-500 rounded hover:bg-pink-600"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncomingFiles;
