const db = require('../config/dbConfig');

const User = {
    create: (userData, callback) => {
        const { firstName, lastName, mobileNumber, password, createdBy } = userData;
        const query = 'CALL InsertUser(?, ?, ?, ?, ?)';
        db.query(query, [firstName, lastName, mobileNumber, password, createdBy], callback);
    },

    findByMobileNumber: (mobileNumber, callback) => {
        const query = 'SELECT * FROM users WHERE mobileNumber = ?';
        db.query(query, [mobileNumber], callback);
    },

    findById: (id, callback) => {
        const query = 'CALL GetUser(?)';
        db.query(query, [id], callback);
    },

    updateByMobileNumber: (mobileNumber, userData, callback) => {
        const { firstName, lastName, updatedBy } = userData;
        const query = 'CALL UpdateUserByMobileNumber(?, ?, ?, ?)';
        db.query(query, [mobileNumber, firstName, lastName, updatedBy], callback);
    },

    deleteByMobileNumber: (mobileNumber, callback) => {
        const query = 'CALL DeleteUserByMobileNumber(?)';
        db.query(query, [mobileNumber], callback);
    }
};

module.exports = User;
