import React from 'react';

const FileListDisplay = ({ files }) => {
  if (!files || files.length === 0) {
    return <p className="text-center text-purple-300 mt-4">No files uploaded yet.</p>;
  }

  return (
    <div className="mt-8 mx-auto max-w-xl bg-white/5 backdrop-blur-sm border border-pink-500/20 rounded-lg shadow p-4">
      <h2 className="text-lg font-bold text-pink-300 mb-4">Uploaded Files</h2>
      <ul className="divide-y divide-pink-500/10 max-h-60 overflow-y-auto">
        {files.map((file, index) => (
          <li key={index} className="py-2 text-purple-200 flex justify-between items-center">
            <span className="truncate">{file.name}</span>
            <a
              href={file.url}
              download={file.name}
              className="text-sm text-pink-400 hover:underline"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileListDisplay;
