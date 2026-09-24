require('dotenv').config()
const multer = require('multer');

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Math.round(Math.random() * 1E9).toString()}.${file.originalname.split('.')[1]}`)
    }
});

module.exports = multerConfig;