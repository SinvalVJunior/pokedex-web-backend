const PokeAPIClient = require('../clients/poke-api/poke-api');
class PokeAPIService {

    constructor() {
        this.PokeAPI = new PokeAPIClient();
    }

    async getPokemons(numberOfPokemons) {
        return await this.PokeAPI.getPokemons(numberOfPokemons);
    }
}

module.exports=PokeAPIService;