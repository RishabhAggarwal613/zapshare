// src/utils/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  autoConnect: false,          // We’ll connect manually after login
  transports: ['websocket'],   // Use only websocket (no fallback to polling)
  withCredentials: true,       // Allow cookies (if needed in auth flows)
  reconnection: true,          // Try to reconnect on disconnect
  reconnectionAttempts: 5,     // Retry 5 times
  reconnectionDelay: 1000,     // Wait 1s between attempts
  timeout: 10000,               // Fail the connection if it takes more than 5s
});

// Optional: Add default event logging for debugging (can remove in prod)
socket.on('connect', () => console.log('Socket connected:', socket.id));
socket.on('disconnect', (reason) => console.warn('Socket disconnected:', reason));
socket.on('connect_error', (err) => console.error('Connection Error:', err.message));

export default socket;
