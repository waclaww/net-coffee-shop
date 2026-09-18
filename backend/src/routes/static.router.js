const Router = require('express');
const router = new Router();
const StaticController = require('../controllers/static.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const storageConfig = require('../config/multer');
const multer = require('multer')


const upload = multer({storage:storageConfig})

router.post('/send', upload.single('file'), StaticController.add)

module.exports = router;