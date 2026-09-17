const Router = require('express');
const router = new Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me);

module.exports = router;