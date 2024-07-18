const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const getUserProfile = (req, res) => {
    const userId = req.user.id; // Ensure this is set correctly from your auth middleware

    User.findById(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving user profile' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(results[0]);
    });
};

const createUser = (req, res) => {
    const { firstName, lastName, mobileNumber, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    User.create({ firstName, lastName, mobileNumber, password: hashedPassword }, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(201).json({ message: 'User created' });
    });
};

const updateUser = (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, mobileNumber } = req.body;

    User.update(userId, { firstName, lastName, mobileNumber }, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating user' });
        }
        res.status(200).json({ message: 'User updated' });
    });
};

const deleteUser = (req, res) => {
    const userId = req.params.id;

    User.delete(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting user' });
        }
        res.status(200).json({ message: 'User deleted' });
    });
};

module.exports = {
    getUserProfile,
    createUser,
    updateUser,
    deleteUser
};
