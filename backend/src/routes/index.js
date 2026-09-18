const Router = require('express');
const router = new Router();

const authRouter = require('./auth.router');
const productRouter = require('./product.router');
const staticRouter = require('./static.router');

router.use('/auth', authRouter);
router.use('/product', productRouter);
router.use('/file', staticRouter);
// router.use('/product');

module.exports = router;