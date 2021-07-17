const LoginService = require('../services/login-service');

class LoginController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const authService = new LoginService();
            const authenticateResponse = await authService.authenticate(email, password);
            return res.status(200).send(authenticateResponse);
        } catch(error) {
            return res.status(400).send({error: error.message});
        }
    }
}

module.exports = new LoginController();