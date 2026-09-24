require('dotenv').config()
const multer = require('multer');

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `http://localhost:${process.env.PORT}/static${Math.round(Math.random() * 1E9).toString()}.${file.originalname.split('.')[1]}`)
    }
});

module.exports = multerConfig;