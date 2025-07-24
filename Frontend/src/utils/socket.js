import { io } from 'socket.io-client';

// Replace this with your backend URL
const SERVER_URL = 'http://localhost:3001';

const socket = io(SERVER_URL, {
  autoConnect: false, // Only connect after login/registration if needed
  transports: ['websocket'],
  withCredentials: true , // Allow credentials for CORS
  reconnection: true, // Enable reconnection attempts
  reconnectionAttempts: 5, // Retry connection attempts
  reconnectionDelay: 1000, // Delay between reconnection attempts
});

export default socket;
