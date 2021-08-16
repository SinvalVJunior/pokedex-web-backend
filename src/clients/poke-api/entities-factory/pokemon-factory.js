class PokemonFactory {

    buildPokemon(pokemon) {

        return { 
                name:           this.#extractPokemonName(pokemon),

                gif:            this.#extractPokemonGIF(pokemon),

                image:          this.#extractPokemonImage(pokemon),

                attack:         this.#extractPokemonStatValue(pokemon, "attack"),
                specialAttack:  this.#extractPokemonStatValue(pokemon, "special-attack"),
                specialDefense: this.#extractPokemonStatValue(pokemon, "special-defense"),
                speed:          this.#extractPokemonStatValue(pokemon, "speed"),
                defense:        this.#extractPokemonStatValue(pokemon, "defense"),
                hp:             this.#extractPokemonStatValue(pokemon, "hp"),
            };
    }

    #extractPokemonName(pokemon) {
        return pokemon.name;
    } 

    #extractPokemonGIF(pokemon) {
        return pokemon.sprites.versions["generation-v"]["black-white"].animated["front_default"];
    }

    #extractPokemonImage(pokemon) {
        return pokemon.sprites.other["dream_world"]["front_default"];
    }

    #extractPokemonStatValue(pokemon, statName) {
        const stat = pokemon.stats.filter((statElement) => statElement.stat.name === statName)[0];
        const value = stat["base_stat"];

        return value;
    }

}

module.exports= new PokemonFactory();