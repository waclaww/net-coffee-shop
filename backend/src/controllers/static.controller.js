const multer = require('multer');
const StaticRepository = require('../repositories/static.repository');

class StaticController {
    async add(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'Файл не загружен' });
            }
            // public/images/256662232.png

            await StaticRepository.addFile(path);

            const id = await StaticRepository.getId(path);
            console.log("/send file success")
            res.status(200).json({
                message: "Файл успешно отправлен и сохранён",
                file: id
            });



        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new StaticController();