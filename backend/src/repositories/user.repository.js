const db = require('../config/db');

const UserRepository = {
    async addUser (username, hashedPassword) {
        const [result] = await db.execute(
            'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, 'user']
        );
        return (result.insertId);
    },
    async isUser(username) {
        const [rows] = await db.execute('SELECT * FROM Users WHERE username = ?', [username]);

        if (rows.length === 0) return null;
        return rows[0];
    },
    async getRole(username) {
        const [rows] = await db.execute(
            "SELECT role FROM users WHERE username = ?",
            [username]
        )       
        return rows[0]?.role || null;
    }
}

module.exports = UserRepository;