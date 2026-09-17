const db = require('../config/db');

const UserRepository = {
    async addUser (username, hashedPassword) {
        const [result] = await db.execute(
            'INSERT INTO Users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        return (result.insertId);
    },
    async isUser(username) {
        const [rows] = await db.execute('SELECT * FROM Users WHERE username = ?', [username]);

        if (rows.length === 0) return null;
        return rows[0];
    },
}

module.exports = UserRepository;