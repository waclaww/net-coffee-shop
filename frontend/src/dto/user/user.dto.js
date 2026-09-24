export class User {
    constructor ({
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

    static fromDto(dto) {
        return new User({
            id: dto?.id,
            role: dto?.role,
        })
    }

    isAdmin() {
        return this.role = "admin";
    }
}