const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    // Check if the Authorization header is present
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
