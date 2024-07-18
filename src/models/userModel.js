const db = require('../config/dbConfig');

const User = {
    create: (userData, callback) => {
        const { firstName, lastName, mobileNumber, password } = userData;
        const query = 'CALL InsertUser(?, ?, ?, ?)';
        db.query(query, [firstName, lastName, mobileNumber, password], callback);
    },

    findByMobileNumber: (mobileNumber, callback) => {
        const query = 'SELECT * FROM users WHERE mobileNumber = ?';
        db.query(query, [mobileNumber], callback);
    },

    findById: (id, callback) => {
        const query = 'CALL GetUser(?)';
        db.query(query, [id], callback);
    },

    update: (id, userData, callback) => {
        const { firstName, lastName, mobileNumber } = userData;
        const query = 'CALL UpdateUser(?, ?, ?, ?)';
        db.query(query, [id, firstName, lastName, mobileNumber], callback);
    },

    delete: (id, callback) => {
        const query = 'CALL DeleteUser(?)';
        db.query(query, [id], callback);
    }
};

module.exports = User;
