const db = require('../config/db');

const UserRepository = {
    async addUser (user) {
        const [result] = await db.execute(
            `INSERT INTO Users 
            (name, password, role) 
            VALUES (?, ?, ?)`,
            [user.name, user.password, 'user']
        );
        return (result.insertId);
    },
    async isUser(user) {
        const [rows] = await db.execute(
            'SELECT * FROM Users WHERE name = ?', 
            [user.name]
        );

        if (rows.length === 0) return null;
        return rows[0];
    },
    async getRole(user) {
        const [rows] = await db.execute(
            "SELECT role FROM users WHERE name = ?",
            [user.name]
        )       
        return rows[0]?.role || null;
    }
}

module.exports = UserRepository ;