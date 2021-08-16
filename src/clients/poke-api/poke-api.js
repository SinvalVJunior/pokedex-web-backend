
const axios = require('axios');

const PokemonFactory = require('./entities-factory/pokemon-factory');
const PokemonSpecieFactory = require('./entities-factory/pokemon-specie-factory');
const EvolutionChainFactory = require('./entities-factory/evolution-chain-factory');

class PokeAPIClient {

    constructor () {
        this.apiUrl = process.env.POKE_API_URL;
    }

    async getPokemons(numberOfPokemons) {
        
        const pokemonsSelectedIds = this.#getSelectedIds(numberOfPokemons);
        const pokemonsAPI = await this.#getSelectedPokemons(pokemonsSelectedIds);
        const pokemonsNecessaryFields = this.#buildPokemons(pokemonsAPI);

        return pokemonsNecessaryFields;
    }

    async getPokemonEvolutionChain(pokemonId) {
        const pokemonSpecie = await this.getPokemonSpeciesById(pokemonId);

        const url = pokemonSpecie.evolutionChainUrl;

        const evolutionChainAPI = await this.#callAPI(url);

        const evolutionChain = EvolutionChainFactory.buildEvolutionChain(pokemonSpecie.name, evolutionChainAPI);

        return evolutionChain;
    }

    async getPokemonSpeciesById(pokemonId) {
        const section = `pokemon-species/${pokemonId}`;
        const url = this.#buildUrl(section);

        const pokemonSpecieAPI = await this.#callAPI(url);

        const pokemonSpecie = PokemonSpecieFactory.buildPokemonSpecie(pokemonSpecieAPI);

        return pokemonSpecie;
    }

    async getPokemonById(pokemonId) {
        const section = `pokemon/${pokemonId}`;
        const url = this.#buildUrl(section);
        
        const pokemonAPI = await this.#callAPI(url);

        const pokemon = PokemonFactory.buildPokemon(pokemonAPI);

        return pokemon;
    }

    #buildUrl(section) {
        return `${this.apiUrl}/${section}`;
    }

    #getSelectedIds(numberOfPokemons) {
        let selectedIds = [];
        for(let i = 0; i<numberOfPokemons; i++) {
            const id = this.#getRandomIntNumber();
            const alreadySelected = selectedIds.includes(id);
            
            if(!alreadySelected) {
                selectedIds.push(id);
            } else {
                i--;
            }
        }

        return selectedIds;
    }

    #getRandomIntNumber() {
        return parseInt(Math.random() * 500);
    }

    async #getSelectedPokemons(pokemonsSelectedIds) {
        let pokemons = [];

        for(const id of pokemonsSelectedIds) {
            const pokemon = await this.#getPokemon(id);
            pokemons.push(pokemon);
        }

        return pokemons;
    }

    async #getPokemon(id) {
        const section = "pokemon";
        const getPokemonUrl = `${this.apiUrl}/${section}/${id}`;

        const pokemon = await this.#callAPI(getPokemonUrl);

        return pokemon;
    }

    async #callAPI(url) {
        const response = await axios.get(url);
        return response.data;
    }

    #buildPokemons(pokemonsAPI) {
        let pokemons = [];
        
        for(const pokemonAPI of pokemonsAPI) {
            const pokemon = PokemonFactory.buildPokemon(pokemonAPI);
            pokemons.push(pokemon);
        }

        return pokemons;
    }

}

module.exports=PokeAPIClient;