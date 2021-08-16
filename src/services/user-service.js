const dbRepository = require('../respositories/json-repository');
const MongoRepository = require('../respositories/mongo-repository');
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
        const user = {
            email,
            password,
            name
        }
        return await this.mongoRepository.saveUser(user);
    }

    async getUserById(userId) {
        return await this.mongoRepository.finUserById(userId);
    }

    async addPokemonToInventory(userId, inventoryElement) {
        const user = await this.getUserById(userId);
        const newInventory = [ ...user.inventory, inventoryElement ];
        
        return await this.mongoRepository.updateUserInventory(userId, newInventory);
    }

}
module.exports=UserService;
