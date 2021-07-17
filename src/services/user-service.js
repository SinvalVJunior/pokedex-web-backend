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

}
module.exports=UserService;
