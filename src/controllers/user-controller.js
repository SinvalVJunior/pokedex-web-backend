const UserService = require('../services/user-service');

class UserController {

    async getUserInfo(req, res) {
        const service = new UserService();
        const userInfo = await service.getUserInfo();
        return res.status(200).send({ userInfo: userInfo });
    }
}



module.exports = new UserController();