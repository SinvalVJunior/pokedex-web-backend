const { Router } = require('express');
const UserController = require('./src/controllers/user-controller');
const LoginController = require('./src/controllers/login-controller');

const routes = new Router();

routes.get("/users", UserController.getUserInfo);
routes.post("/login", LoginController.login);


module.exports = routes;