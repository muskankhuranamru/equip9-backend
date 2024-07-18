const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get user profile, requires authentication
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
