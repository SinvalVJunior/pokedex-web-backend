const LoginService = require('../services/login-service');
const jwtSecret = require('../config');

class LoginController {
    async login(req, res) {
        const { username, password } = req.body;
        const authService = new LoginService(jwtSecret);
        const authenticateResponse = await authService.authenticate(username, password);
        return res.status(200).send(authenticateResponse);
    }
}

module.exports = new LoginController();