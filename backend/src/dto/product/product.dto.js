class Product {
    constructor (
        id,
        name,
        type,
        description,
        price,
        preview = {}
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
        this.preview = preview;
    } 

    toDto() {
        return new Product({
            id: this.id,
            name: this.name,
            type: this.type,
            description: this.description,
            price: this.price,
            preview: this.preview,
        })
    }

    static fromDto(dto) {
        return new Product({
            id: dto?.id,
            name: dto?.name,
            type: dto?.type,
            description: dto?.description,
            price: dto?.price,
            preview: dto?.preview,
        })
    }
}

module.exports = { Product };