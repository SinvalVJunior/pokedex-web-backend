const PokeAPIClient = require('../clients/poke-api/poke-api');
const UserService = require('./user-service');

class InventoryService {

    constructor() {
        this.PokeAPI = new PokeAPIClient();
        this.userService = new UserService();
    }

    async getUserInventory(userId) {
        const user = await this.userService.getUserById(userId);
        return user.inventory;
    }

    async addPokemonToUserInventory(userId, pokemonId) {
        const inventoryElement = await this.#buildInventoryElement(pokemonId);

        const newUser = await this.userService.addPokemonToInventory(userId, inventoryElement);

        return newUser;
    }

    async #buildInventoryElement(pokemonId) {   

        const pokemon = await this.PokeAPI.getPokemonById(pokemonId);
        const pokemonSpecie = await this.PokeAPI.getPokemonSpeciesById(pokemonId);
        const pokemonEvolutionChain = await this.PokeAPI.getPokemonEvolutionChain(pokemonId);

        const inventoryElement = { ...pokemon, ...pokemonSpecie, ...pokemonEvolutionChain };

        return inventoryElement;

    }

}

module.exports=InventoryService;