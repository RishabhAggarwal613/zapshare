import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const FileTransfer = ({ senderEmail, recipientEmail }) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.emit('register_email', senderEmail);

    socket.on('receive_file', ({ from, fileData, fileName }) => {
      const link = document.createElement('a');
      link.href = fileData;
      link.download = fileName;
      link.click();
      alert(`Received file "${fileName}" from ${from}`);
    });

    return () => socket.disconnect();
  }, [senderEmail]);

  const sendFile = () => {
    const file = fileInputRef.current.files[0];
    if (!file || !recipientEmail) return alert('Select a file and connect first.');

    const reader = new FileReader();
    reader.onload = () => {
      const socket = io('http://localhost:3001');
      socket.emit('send_file', {
        to: recipientEmail,
        fileName: file.name,
        fileData: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-8">
      <input type="file" ref={fileInputRef} className="mb-2 w-full text-purple-200" />
      <button onClick={sendFile} className="bg-pink-600 text-white px-4 py-2 rounded w-full">
        Send File to {recipientEmail}
      </button>
    </div>
  );
};

export default FileTransfer;
