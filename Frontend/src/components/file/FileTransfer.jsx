import React, { useEffect, useState } from 'react';
import socket from "../../utils/socket";

const FileTransfer = ({
  senderEmail,
  receiverEmail,
  selectedFile,
  setTransferProgress,
  setSentFiles,
}) => {
  const [progress, setProgress] = useState(0);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Listen for progress updates
    socket.on('transfer_progress', ({ percent }) => {
      setProgress(percent);
      setTransferProgress(percent);
    });

    // Listen for file sent ack
    socket.on('file_sent_ack', ({ file }) => {
      setSending(false);
      alert('File sent successfully!');
      setSentFiles((prev) => [...prev, file]);
      setTransferProgress(100);
    });

    return () => {
      socket.off('transfer_progress');
      socket.off('file_sent_ack');
    };
  }, [setSentFiles, setTransferProgress]);

  const handleSendFile = () => {
    if (!selectedFile) return alert('Please select a file first.');
    if (!receiverEmail) return alert('Please connect to a receiver first.');

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = () => {
      const fileBuffer = reader.result;
      setSending(true);

      socket.emit('send_file', {
        from: senderEmail,
        to: receiverEmail,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        size: selectedFile.size,
        timestamp: Date.now(),
        fileBuffer,
      });
    };
  };

  return (
    <div className="mt-4 p-4 bg-purple-900/60 rounded shadow text-white">
      <button
        onClick={handleSendFile}
        className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded"
        disabled={sending}
      >
        {sending ? 'Sending...' : 'Send File'}
      </button>
      {sending && <p className="mt-2">Progress: {progress}%</p>}
    </div>
  );
};

export default FileTransfer;
