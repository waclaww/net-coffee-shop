const Router = require('express');
const router = new Router();
const ProductController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware')

router.post('/add', authMiddleware, adminMiddleware, ProductController.addProduct);
router.get('/get-all', authMiddleware, ProductController.getProducts);
router.post('/get-one', authMiddleware, ProductController.getOneProduct);

module.exports = router;