const bcrypt = require("bcryptjs");
const User = require("./src/models/models")

async function createUser(username, password) {
    const hashed = await bcrypt.hash(password, 10);

    User.create({
        username: username,
        password: hashed,
    })
}

async function findUser(username) {
    User.findOne({where: {username: username}}).then(user=>{
        if(!user) return;
        return true
    }).catch(err=>console.log(err));

}

module.exports = {
    createUser,
    findUser,
};