import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const ConnectionForm = ({ currentUserEmail, onConnectSuccess }) => {
  const [targetEmail, setTargetEmail] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (currentUserEmail) {
      socket.emit('register_email', currentUserEmail);
    }

    socket.on('connection_success', ({ from, to }) => {
      setStatus(`Connected to ${to}`);
      if (onConnectSuccess) onConnectSuccess(to);
    });

    socket.on('connection_failed', ({ reason }) => {
      setStatus(`Connection failed: ${reason}`);
    });

    return () => {
      socket.off('connection_success');
      socket.off('connection_failed');
    };
  }, [currentUserEmail]);

  const handleConnect = () => {
    if (!targetEmail) return;
    socket.emit('connect_to_user', {
      from: currentUserEmail,
      to: targetEmail,
    });
    setStatus('Connecting...');
  };

  return (
    <div className="max-w-md mx-auto bg-white/5 p-6 rounded-lg shadow border border-pink-500/30 mt-10">
      <h2 className="text-xl font-bold text-pink-300 mb-4">Connect to Another User</h2>
      <input
        type="email"
        value={targetEmail}
        onChange={(e) => setTargetEmail(e.target.value)}
        placeholder="Enter recipient's email"
        className="w-full mb-4 px-3 py-2 rounded border border-pink-400 bg-transparent text-purple-200 focus:outline-none"
      />
      <button
        onClick={handleConnect}
        className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:opacity-90"
      >
        Connect
      </button>
      {status && (
        <p className="text-sm mt-3 text-purple-300 text-center">{status}</p>
      )}
    </div>
  );
};

export default ConnectionForm;
