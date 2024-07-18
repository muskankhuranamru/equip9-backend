const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const register = (req, res) => {
    const { firstName, lastName, mobileNumber, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        const userData = {
            firstName,
            lastName,
            mobileNumber,
            password: hashedPassword
        };

        User.create(userData, (err, result) => {
            if (err) return res.status(500).json({ message: 'Error creating user' });

            res.status(201).json({ success: true, message: 'User registered successfully' });
        });
    });
};

const login = (req, res) => {
    const { mobileNumber, password } = req.body;

    User.findByMobileNumber(mobileNumber, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error finding user' });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid mobile number or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error comparing passwords' });

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid mobile number or password' });
            }

            const token = jwt.sign({ id: user.id, mobileNumber: user.mobileNumber }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.json({ success: true, token, user });
        });
    });
};

module.exports = {
    register,
    login
};
