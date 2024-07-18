const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


const createUser = (req, res) => {
    const { firstName, lastName, mobileNumber, password, createdBy } = req.body;

    // Hash the password before storing it
    const hashedPassword = bcrypt.hashSync(password, 10);

    User.create({ firstName, lastName, mobileNumber, password: hashedPassword, createdBy }, (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ message: 'Error creating user' });
        }
        res.status(201).json({ message: 'User created' });
    });
};


const getUserProfile = (req, res) => {
    const userId = req.user.id; 

    User.findById(userId, (err, results) => {
        if (err) {
            console.error('Error retrieving user profile:', err);
            return res.status(500).json({ message: 'Error retrieving user profile' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(results[0]);
    });
};

// Update user details
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, mobileNumber, updatedBy } = req.body;

    User.update(userId, { firstName, lastName, mobileNumber, updatedBy }, (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ message: 'Error updating user' });
        }
        res.status(200).json({ message: 'User updated' });
    });
};

// Delete a user
const deleteUser = (req, res) => {
    const userId = req.params.id;

    User.delete(userId, (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'Error deleting user' });
        }
        res.status(200).json({ message: 'User deleted' });
    });
};

// Find user by mobile number
const findUserByMobileNumber = (req, res) => {
    const { mobileNumber } = req.params;

    User.findByMobileNumber(mobileNumber, (err, results) => {
        if (err) {
            console.error('Error finding user by mobile number:', err);
            return res.status(500).json({ message: 'Error finding user by mobile number' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(results[0]);
    });
};

module.exports = {
    createUser,
    getUserProfile,
    updateUser,
    deleteUser,
    findUserByMobileNumber
};
