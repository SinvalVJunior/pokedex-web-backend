const PokeAPIClient = require('../clients/poke-api/poke-api');
const UserService = require('./user-service');
class PokeAPIService {

    constructor() {
        this.PokeAPI = new PokeAPIClient();
        this.userService = new UserService();
    }

    async getPokemons(numberOfPokemons) {
        return await this.PokeAPI.getPokemons(numberOfPokemons);
    }
}

module.exports=PokeAPIService;