const { Router } = require('express');
const UserController = require('./src/controllers/user-controller');
const LoginController = require('./src/controllers/login-controller');
const PokemonAPIController = require('./src/controllers/poke-api-controller');
const InventoryController = require('./src/controllers/inventory-controller');

const routes = new Router();

routes.get("/users", UserController.getUserInfo);
routes.post("/users", UserController.saveUser);

routes.post("/login", LoginController.login);

routes.get("/pokemon", PokemonAPIController.getPokemons);

routes.get("/inventory", InventoryController.getIventory);
routes.post("/inventory", InventoryController.addPokemonToUserInventory);

module.exports = routes;