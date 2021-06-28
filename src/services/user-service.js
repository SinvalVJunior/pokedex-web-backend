const dbRepository = require('../respositories/json-repository');
class UserService {
    constructor() {
        this.dbRepository = new dbRepository();
    }
    async getUserInfo() {
        const userInfo = await this.dbRepository.getData("userInfo");
        return userInfo;
    }

}
module.exports=UserService;
