const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');

router.use('/auth', authRouter);
// router.use('/types');
// router.use('/product');

module.exports = router;