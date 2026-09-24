export class Product {
    constructor (
        id,
        name,
        type,
        description,
        price,
        preview,
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
        this.preview = preview;
    }

    static fromDto (dto) {
        return new Product({
            id: dto?.id,
            name: dto?.name,
            type: dto?.type,
            description: dto?.description,
            price: dto?.price,
            preview: dto?.preview,
        })
    }
    
    static toDto (dto) {
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