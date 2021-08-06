
const axios = require('axios');

class PokeAPIClient {

    constructor () {
        this.apiUrl = process.env.POKE_API_URL;
    }

    async getPokemons(numberOfPokemons) {
        
        const pokemonsSelectedIds = this.#getSelectedIds(numberOfPokemons);
        const pokemons = await this.#getSelectedPokemons(pokemonsSelectedIds);
        const pokemonsNecessaryFields = this.#filterPokemonsFields(pokemons);

        return pokemonsNecessaryFields;
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

    #filterPokemonsFields(pokemons) {
        let pokemonsNecessaryFields = [];
        
        for(const pokemon of pokemons) {
            const pokemonFilteredFields = { id: pokemon.id, name: pokemon.name, gif:  this.#getPokemonGIF(pokemon) }
            pokemonsNecessaryFields.push(pokemonFilteredFields);
        }

        return pokemonsNecessaryFields;
    }

    #getPokemonGIF(pokemon) {
        return pokemon.sprites.versions["generation-v"]["black-white"].animated["front_default"];
    }

}

module.exports=PokeAPIClient;