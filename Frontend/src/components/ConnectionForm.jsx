import React, { useState } from 'react';
import socket from '../utils/socket';

const ConnectionForm = () => {
  const [yourEmail, setYourEmail] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    socket.connect();
    socket.emit('register_email', yourEmail);
    socket.emit('connect_to_user', { from: yourEmail, to: receiverEmail });

    socket.on('connection_success', () => {
      setConnected(true);
      alert('Connected successfully!');
    });

    socket.on('connection_failed', ({ reason }) => {
      alert('Connection failed: ' + reason);
    });
  };

  return (
    <div className="p-4 border rounded mb-4">
      <input
        type="email"
        placeholder="Your Email"
        value={yourEmail}
        onChange={(e) => setYourEmail(e.target.value)}
        className="p-2 border mr-2"
      />
      <input
        type="email"
        placeholder="Receiver Email"
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
        className="p-2 border mr-2"
      />
      <button onClick={handleConnect} className="bg-blue-500 text-white p-2 rounded">
        Connect
      </button>
      {connected && <p className="text-green-600 mt-2">✅ Connected to {receiverEmail}</p>}
    </div>
  );
};

export default ConnectionForm;
