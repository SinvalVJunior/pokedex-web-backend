const { Router } = require('express');
const checkJwt = require('./src/middlewares/token-validator');

const UserController = require('./src/controllers/user-controller');
const LoginController = require('./src/controllers/login-controller');
const PokemonAPIController = require('./src/controllers/poke-api-controller');
const InventoryController = require('./src/controllers/inventory-controller');

const routes = new Router();

routes.get("/users", checkJwt, UserController.getUserInfo);
routes.post("/users", UserController.saveUser);
routes.put("/users", checkJwt, UserController.updateUser);

routes.post("/login", LoginController.login);
routes.post("/login/facebook", LoginController.loginFacebook);

routes.get("/pokemon", checkJwt, PokemonAPIController.getPokemons);

routes.get("/inventory", checkJwt, InventoryController.getIventory);
routes.post("/inventory", checkJwt, InventoryController.addPokemonToUserInventory);

module.exports = routes;