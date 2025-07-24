const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
     credentials: true
  }
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Store email to socket ID mapping
const emailToSocketMap = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Register user with email
  socket.on('register_email', (email) => {
    emailToSocketMap[email] = socket.id;
    console.log(`${email} registered with socket ID ${socket.id}`);
  });

  // 🔄 Join a specific user room (optional for future features)
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`Socket ${socket.id} joined room ${userId}`);
  });

  // 🔌 Connect two users
  socket.on('connect_to_user', ({ from, to }) => {
    const targetSocketId = emailToSocketMap[to];

    if (targetSocketId) {
      socket.join(to); // optional room-based design
      io.to(targetSocketId).emit('connection_success', { from, to });
      socket.emit('connection_success', { from, to });
      console.log(`Connected ${from} with ${to}`);
    } else {
      socket.emit('connection_failed', { reason: 'User not online or registered' });
      console.log(`Connection failed: ${to} not online`);
    }
  });

  // Handle File Transfer
  socket.on('send_file', ({ to, fileData, fileName }) => {
    const targetSocketId = emailToSocketMap[to];
    if (targetSocketId) {
      io.to(targetSocketId).emit('receive_file', {
        from: socket.id,
        fileData,
        fileName
      });
      console.log(`File "${fileName}" sent from ${socket.id} to ${targetSocketId}`);
    } else {
      console.log(`File transfer failed: ${to} not connected`);
    }
  });

  // Handle Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    for (let email in emailToSocketMap) {
      if (emailToSocketMap[email] === socket.id) {
        delete emailToSocketMap[email];
        console.log(`🗑️ Removed ${email} from socket map`);
        break;
      }
    }
  });
});

// 🚀 Start Server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(` Socket server listening on port ${PORT}`);
});
