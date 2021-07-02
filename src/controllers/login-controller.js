const LoginService = require('../services/login-service');
const jwtSecret = require('../config');

class LoginController {
    async login(req, res) {
        const { username, password } = req.body;
        const authService = new LoginService(jwtSecret);
        const accessToken = await authService.authenticate(username, password);
        return res.status(200).send({ token: accessToken });
    }
}

module.exports = new LoginController();