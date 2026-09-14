require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserRepository = require('./src/repositories/userRepository')
const cors = require('cors');

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());


app.post("/api/auth/register", async (req, res) => {
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
});

app.post("/api/auth/login", async (req, res) => {
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
});

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next()
    })
}

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({message: `Hello, ${req.user.username}`})
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
    res.json({
        username: req.user.username,
    });
});

app.listen(3000)