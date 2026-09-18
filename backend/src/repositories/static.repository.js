const db = require('../config/db');

const StaticRepository = {
    async addFile(path) {
        const [result] = await db.execute(
            "INSERT INTO Files (path) VALUES (?)",
            [path]
        )
        return result.insertId;
    },
    async getId(path) {
        const rows = await db.execute(
            "SELECT id FROM Files WHERE path = ?",
            [path]
        )
        if (rows.length === 0) return false;
        return rows[0][0];
    },
}

module.exports = StaticRepository;