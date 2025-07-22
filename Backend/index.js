const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const UserModel = require('./models/User'); 
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/Zapshare')
    
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

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



app.post('/register', async (req, res) => {
    console.log('Incoming request to /register');
    console.log('req.body:', req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        console.log('Missing required field');
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.log('Email already registered');
            return res.status(400).json({ message: 'Email already registered.' });
        }

        const user = await UserModel.create({ name, email, password });
        console.log('User created successfully:', user);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: 'Error registering user', error: err.message });
    }
});


app.listen(3001,() => {
    console.log('Server is running on port 3001'); }
);