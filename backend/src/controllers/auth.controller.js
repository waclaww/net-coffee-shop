require("dotenv").config();
const UserRepository = require('../repositories/userRepository');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
    async register (req, res) {
        try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await UserRepository.isUser(username);
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserRepository.addUser(username, hashedPassword);
        res.json({ message: "User registered" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    }
    async login (req, res) {
        try {
        const { username, password } = req.body;
        const user = await UserRepository.isUser(username);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    }
    async me (req, res) {
        res.json({
        username: req.user.username,
    });
    }
}

module.exports = new AuthController();