class User {
    constructor({
        id,
        name,
        role,
        password
    } = {}) {
        this.id = id,
        this.name = name,
        this.role = role,
        this.password = password
    }
    
    toDto () {
        return new User({
            id: this.id,
            name: this.name,
            role: this.role,
        })
    }

    static fromDto (dto) {
        return new User ({
            id: dto?.id,
            name: dto?.name,
            role: dto?.role,
        })
    }
}

module.exports = { User };