class PokemonSpecieFactory {

    buildPokemonSpecie(pokemonSpecie) {

        return {
            habitat:        this.#extractPokemonHabitat(pokemonSpecie),

            isLegendary:    this.#extractPokemonLegendary(pokemonSpecie),

            isMythical:     this.#extractPokemonMythical(pokemonSpecie),

            baseHappiness:  this.#extractPokemonBaseHappiness(pokemonSpecie),

            shape:          this.#extractPokemonShape(pokemonSpecie),

            color:          this.#extractPokemonColor(pokemonSpecie),

            curiosity:      this.#extractPokemonCuriosity(pokemonSpecie),

            evolvesFrom:    this.#extractPokemonEvolvesFrom(pokemonSpecie),

            evolutionChainUrl: this.#extractEvolutionChainUrl(pokemonSpecie)

        };
    }


    #extractPokemonHabitat(pokemonSpecie) {
        return pokemonSpecie.habitat.name;
    }
    
    #extractPokemonBaseHappiness(pokemonSpecie) {
        return pokemonSpecie["base_happiness"];
    }

    #extractPokemonLegendary(pokemonSpecie) {
        return pokemonSpecie["is_legendary"];
    }

    #extractPokemonMythical(pokemonSpecie) {
        return pokemonSpecie["is_mythical"];
    }

    #extractPokemonShape(pokemonSpecie) {
        return pokemonSpecie.shape.name;
    }

    #extractPokemonColor(pokemonSpecie) {
        return pokemonSpecie.color.name;
    }

    #extractPokemonCuriosity(pokemonSpecie) {
        return pokemonSpecie["flavor_text_entries"][0]["flavor_text"];
    }

    #extractPokemonEvolvesFrom(pokemonSpecie) {
        return pokemonSpecie?.["evolves_from_species"]?.name ? pokemonSpecie?.["evolves_from_species"]?.name : "None";
    }

    #extractEvolutionChainUrl(pokemonSpecie) {
        return pokemonSpecie["evolution_chain"].url;
    }

}

module.exports= new PokemonSpecieFactory();