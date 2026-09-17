require('dotenv').config();
const jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {
    const role = req.user?.role;
    if (role === 'admin') {
        console.log("Администратор кинул запрос")
        return next();
    }
    return res.status(403).json({message: "Доступ разрешен только администраторам"})
}

module.exports = adminMiddleware;