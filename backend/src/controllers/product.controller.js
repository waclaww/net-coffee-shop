const ProductRepository = require('../repositories/product.repository');
// const Product = require('../dto/product.dto');
const UserRepository = require('../repositories/user.repository');

class ProductController {
    async addProduct(req, res) {
        try {
            const ProductData = req.body;
            if (await ProductRepository.isName(ProductData.name)) {
                console.log("Product already exists")
                return res.status(400).json({message: "Product already exists"})
            }

            await ProductRepository.addProduct(ProductData);
            return res.json({message: "Product added"});

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Server error"});
        }
    }

    async getProducts(req, res) {
        const products = await ProductRepository.getProducts();
        console.log('/product/get-all/', products)
        return res.json(products);
    }

    async getOneProduct(req, res) {
        const id = req.body.id;
        const product = await ProductRepository.getOneProduct(id);
        return res.json(product);
    }
}

module.exports = new ProductController();