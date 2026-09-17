class Product {
    constructor({name, type, description, price, preview} = {}) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
        this.preview = preview;
    }
}

module.exports = new Product();