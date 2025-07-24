import React, { useEffect } from 'react';
import socket from '../utils/socket';

const SocketManager = ({ userEmail }) => {
  useEffect(() => {
    socket.connect();
    socket.emit('register_email', userEmail);

    return () => {
      socket.disconnect();
    };
  }, [userEmail]);

  return null; // this is just a hook component
};

export default SocketManager;
