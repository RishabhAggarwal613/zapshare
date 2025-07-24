const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const UserModel = require('./models/User');

const app = express();
const server = http.createServer(app);

// Setup socket.io with CORS
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Zapshare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

// === LOGIN Route ===
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required.' });

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password.' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// === REGISTER Route ===
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required.' });

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

// === SOCKET.IO LOGIC ===
const emailToSocketMap = {};

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.on('register_email', (email) => {
    emailToSocketMap[email] = socket.id;
    console.log(`📧 ${email} registered with socket ID ${socket.id}`);
  });

  socket.on('connect_to_user', ({ from, to }) => {
    const targetSocketId = emailToSocketMap[to];
    if (targetSocketId) {
      socket.join(to);
      io.to(targetSocketId).emit('connection_success', { from, to });
      socket.emit('connection_success', { from, to });
      console.log(`🔗 ${from} connected to ${to}`);
    } else {
      socket.emit('connection_failed', { reason: 'User not online or registered' });
      console.log(`⚠️ Connection failed: ${to} not available`);
    }
  });

  socket.on('send_file', ({ to, fileData, fileName }) => {
    const targetSocketId = emailToSocketMap[to];
    if (targetSocketId) {
      io.to(targetSocketId).emit('receive_file', {
        from: socket.id,
        fileData,
        fileName
      });
      console.log(`📁 File "${fileName}" sent to ${to}`);
    } else {
      console.log(`❌ File transfer failed: ${to} not connected`);
    }
  });

  socket.on('disconnect', () => {
    for (let email in emailToSocketMap) {
      if (emailToSocketMap[email] === socket.id) {
        delete emailToSocketMap[email];
        console.log(`🛑 ${email} disconnected and removed from map`);
        break;
      }
    }
    console.log('🔴 User disconnected:', socket.id);
  });

  socket.on("error", (err) => {
    console.error("🔥 Socket error:", err);
  });
});

// === START SERVER ===
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running at http://localhost:${PORT}`);
});
