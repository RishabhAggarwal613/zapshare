import React from 'react';

const TransferProgress = ({ progress, fileName }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-lg font-semibold mb-2">Transferring File</h2>
      <p className="text-sm text-gray-600 mb-1">{fileName}</p>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-right text-sm text-gray-500 mt-1">{progress}%</p>
    </div>
  );
};
export default TransferProgress
