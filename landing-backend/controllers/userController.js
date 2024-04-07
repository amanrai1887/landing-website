// controllers/userController.js
const bcrypt = require('bcryptjs');
const models = require('../models');

exports.signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Validate name
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ message: 'Name is required and must be a string' });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Validate phone number (allow only digits and must be 10 characters long)
        const phoneRegex = /^\d{10}$/;
        if (!phone || !phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number' });
        }

        // Validate password (must be at least 6 characters long)
        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Check if user already exists based on email
        const existingUser = await models.user.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'You already have an account. Please login instead.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await models.user.create({ email, phone, name, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Validate password
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        // Find user by email
        const user = await models.user.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
