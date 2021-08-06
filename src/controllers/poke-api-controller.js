const PokeAPIService = require('../services/poke-api-service');

class PokeAPIController {


    async getPokemons(req, res) {
        try {
            const numberOfPokemons = req.query.numberOfPokemons;
            const pokeAPIService = new PokeAPIService();
            const pokemons = await pokeAPIService.getPokemons(numberOfPokemons);

            return res.status(200).send(pokemons);
        } catch(error) {
            return res.status(400).send({error: error.message});
        }
    }

}

module.exports = new PokeAPIController();