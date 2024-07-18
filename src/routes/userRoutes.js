const express = require('express');
const router = express.Router();
const { getUserProfile, updateUser, deleteUser, findUserByMobileNumber } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get user profile, requires authentication
router.get('/profile', authMiddleware, getUserProfile);

// Route to update user details, requires authentication
router.put('/profile/:id', authMiddleware, updateUser);

// Route to delete a user, requires authentication
router.delete('/profile/:id', authMiddleware, deleteUser);

// Route to find user by mobile number
router.get('/users/:mobileNumber', findUserByMobileNumber);

module.exports = router;
