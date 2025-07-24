const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt");

const app = express();
const UserModel = require('./models/User'); 

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Zapshare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("MongoDB connected");

// LOGIN Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            console.log('User not found:', email);
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//  REGISTER Route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        console.log('User registered:', user.email);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
