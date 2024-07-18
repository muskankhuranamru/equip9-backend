const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route to register a new user
router.post('/register', register);

// Route to log in a user
router.post('/login', login);

module.exports = router;
