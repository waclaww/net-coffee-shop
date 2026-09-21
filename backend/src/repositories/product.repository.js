const db = require('../config/db');
// const Product = require('../dto/product.dto')


const ProductRepository = {
    async addProduct(ProductData) {
        const {
            name = null,
            type = null,
            description = null,
            price = null,
            preview = null,
        } = ProductData;

        const [result] = await db.execute(
            `INSERT INTO Products (
            name, type, description, price, preview)
            VALUES (?, ?, ?, ?, ?)`,
            [name, type, description, price, preview]
        );
        return result.insertId;
    },
    async getProducts() {
        const [rows] = await db.execute(
            `SELECT
            p.id, 
            p.name, 
            p.type, 
            p.description, 
            p.price, 
            f.path AS preview 
            FROM products p 
            LEFT JOIN files f ON p.preview = f.id`,
        );
        return rows;
    },
    async getOneProduct(id) {
        const [rows] = await db.execute(
            'SELECT * FROM Products WHERE id = ?',
            [id]
        );
        if (rows.length === 0) return null;
        return rows[0];
    },
    async isName(name) {
        const [rows] = await db.execute(
            `SELECT 1 FROM Products WHERE name = ? LIMIT 1`,
            [name]
        )
        return rows.length > 0;
    }
}

module.exports = ProductRepository;



