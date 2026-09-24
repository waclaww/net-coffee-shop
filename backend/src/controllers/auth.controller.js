require("dotenv").config();
const { UserRepository } = require('../repositories');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require('../dto');

class AuthController {
    async register (req, res) {
        try {
        const user = new User({
            name: req.body.name,
            password: req.body.password,
        })

        if (!user.name || !user.password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const existing = await UserRepository.isUser(user);
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        await UserRepository.addUser(new User({
            ...user,
            password: hashedPassword,
        }));

        res.json({ message: "User registered" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    }
    async login (req, res) {
        try {
        const user = new User({
            name: req.body.name,
            password: req.body.password,
        });

        const existing = await UserRepository.isUser(user);
        if (!existing) return res.status(401).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(user.password, existing.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: existing.id, role: existing.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );



        res.json({ token, user: User.fromDto(existing).toDto()});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    }
    async me (req, res) {
        console.log(req.user)
        res.json({
            user: User.fromDto(req.user).toDto(),
        });
    }
}

module.exports = new AuthController();