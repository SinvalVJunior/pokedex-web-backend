const dbRepository = require('../respositories/json-repository');
const MongoRepository = require('../respositories/mongo-repository');
const bcrypt = require('bcrypt');
const saltRounds = 10;
class UserService {
    constructor() {
        this.dbRepository = new dbRepository();
        this.mongoRepository = new MongoRepository();
    }
    async getUserInfo() {
        const userInfo = await this.dbRepository.getData("userInfo");
        return userInfo;
    }

    async saveUser(email, password, name) {

        const newPassword = await bcrypt.hash(password, saltRounds);

        const user = {
            email,
            password: newPassword,
            name
        }
    
        return await this.mongoRepository.saveUser(user);
    }

    async editUser(userId, name){
        const user = await this.getUserById(userId);
        const newUserInfo = {
            email: user.email,
            password: user.password,
            name: user.name,
        };

        if(name){
            newUserInfo.name = name;
        }

        return await this.mongoRepository.updateUser(userId, newUserInfo)
    }

    async getUserById(userId) {
        return await this.mongoRepository.findUserById(userId);
    }

    async addPokemonToInventory(userId, inventoryElement) {
        const user = await this.getUserById(userId);
        const newInventory = [ ...user.inventory, inventoryElement ];
        
        return await this.mongoRepository.updateUserInventory(userId, newInventory);
    }

}
module.exports=UserService;
