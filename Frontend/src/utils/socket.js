import { io } from 'socket.io-client';

// Replace this with your backend URL
const SERVER_URL = 'http://localhost:5000';

const socket = io(SERVER_URL, {
  autoConnect: false, // Only connect after login/registration if needed
  transports: ['websocket'],
});

export default socket;
