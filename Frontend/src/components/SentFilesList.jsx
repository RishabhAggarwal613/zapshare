import React from 'react';

function SentFilesList({ files }) {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-4 mt-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Sent Files</h2>
      {files.length === 0 ? (
        <p className="text-sm text-gray-500">No files sent yet.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file, index) => {
            const sizeInKB = file.size ? (file.size / 1024).toFixed(2) : '—';
            const sentTime = file.timestamp
              ? new Date(file.timestamp).toLocaleTimeString()
              : '';

            return (
              <li key={index} className="text-sm text-gray-700 flex justify-between items-center">
                <span>{file.name}</span>
                <span className="text-xs text-gray-400">
                  {sizeInKB} KB {sentTime && `• ${sentTime}`}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SentFilesList;
