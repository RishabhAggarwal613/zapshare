const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' }
});

app.use(cors());

const emailToSocketMap = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // File Transfer
  socket.on('send_file', ({ to, fileData, fileName }) => {
    io.to(to).emit('receive_file', { from: socket.id, fileData, fileName });
  });

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  // Email-based User Registration
  socket.on('register_email', (email) => {
    emailToSocketMap[email] = socket.id;
    console.log(`${email} registered with socket ID ${socket.id}`);
  });

  socket.on('connect_to_user', ({ from, to }) => {
    const targetSocketId = emailToSocketMap[to];
    if (targetSocketId) {
      socket.join(to);
      io.to(targetSocketId).emit('connection_success', { from, to });
      socket.emit('connection_success', { from, to });
      console.log(`Connected ${from} with ${to}`);
    } else {
      socket.emit('connection_failed', { reason: 'User not online or registered' });
    }
  });

  // Handle disconnect and cleanup
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    // Clean up email mapping
    for (let email in emailToSocketMap) {
      if (emailToSocketMap[email] === socket.id) {
        delete emailToSocketMap[email];
        break;
      }
    }
  });
});

server.listen(3001, () => {
  console.log('Socket server listening on port 3001');
});
