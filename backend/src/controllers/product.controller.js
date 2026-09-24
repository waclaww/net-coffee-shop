const { ProductRepository } = require('../repositories/');
const Product = require('../dto');


class ProductController {
    async addProduct(req, res) {
        try {
            const product = new Product(req.body);
            if (!product.name || !product.type || !product.price || !product.preview) {
                return res.status(400).json({message: "Заполните все поля"})
            }

            if (await ProductRepository.isName(product.name)) {
                return res.status(400).json({message: "Продукт уже был добавлен"})
            }

            await ProductRepository.addProduct(product);
            res.json({message: "Product added"});

        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Server error"});
        }
    }

    async getProducts(req, res) {
        const products = await ProductRepository.getProducts();
        res.json(products);
    }

    async getOneProduct(req, res) {
        const id = req.body.id;
        const product = await ProductRepository.getOneProduct(id);
        return res.json(product);
    }
}

module.exports = new ProductController();