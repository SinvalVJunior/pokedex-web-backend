const UserService = require('../services/user-service');

class UserController {

    async getUserInfo(req, res) {
        const service = new UserService();
        const userInfo = await service.getUserInfo();
        
        return res.status(200).send({ userInfo: userInfo });
    }

    async saveUser(req, res) {
        try {
            const { email, password, name } = req.body;
            const service = new UserService();

            const userSaved = await service.saveUser(email, password, name);

            return res.status(200).send(userSaved);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}



module.exports = new UserController();