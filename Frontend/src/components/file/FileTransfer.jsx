import React, { useEffect, useState } from 'react';
import socket from '../../utils/socket';
import IncomingFiles from './IncomingFiles'; // if you want to show received files

const FileTransfer = ({
  senderEmail,
  receiverEmail,
  selectedFile,
  setTransferProgress,
  setSentFiles,
}) => {
  const [progress, setProgress] = useState(0);
  const [sending, setSending] = useState(false);
  const [incomingFiles, setIncomingFiles] = useState([]);

  useEffect(() => {
    socket.on('transfer_progress', ({ percent }) => {
      setProgress(percent);
      setTransferProgress(percent);
    });

    socket.on('file_sent_ack', ({ file }) => {
      setSending(false);
      alert('File sent successfully!');
      setSentFiles((prev) => [...prev, file]);
      setTransferProgress(100);
    });

    // Listen for incoming file
    socket.on('receive_file', ({ fileData, fileName, size, timestamp }) => {
      setIncomingFiles((prev) => [
        ...prev,
        { name: fileName, fileData, size, timestamp },
      ]);
    });

    return () => {
      socket.off('transfer_progress');
      socket.off('file_sent_ack');
      socket.off('receive_file');
    };
  }, [setSentFiles, setTransferProgress]);

  const handleSendFile = () => {
    if (!selectedFile) return alert('Please select a file first.');
    if (!receiverEmail || !socket.connected)
      return alert('Please connect to a receiver first.');

    setSending(true);
    const reader = new FileReader();

    reader.onload = () => {
      const fileData = reader.result; // base64 encoded data
      socket.emit('send_file', {
        from: senderEmail,
        to: receiverEmail,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        size: selectedFile.size,
        timestamp: Date.now(),
        fileData, // base64
      });
    };

    reader.readAsDataURL(selectedFile); // ⚠️ read as base64
  };

  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.fileData;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-4 p-5 center flex item-center bg-purple-900/60 rounded shadow text-white">
      <button
        onClick={handleSendFile}
        className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded"
        disabled={sending}
      >
        {sending ? 'Sending...' : 'Send File'}
      </button>

      {sending && (
        <p className="mt-2 text-sm text-purple-200">Progress: {progress}%</p>
      )}

      
    </div>
  );
};

export default FileTransfer;

