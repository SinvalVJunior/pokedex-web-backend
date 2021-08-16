class PokemonSpecieFactory {

    buildPokemonSpecie(pokemonSpecie) {

        return {

            name :              this.#extractPokemonName(pokemonSpecie),

            habitat:            this.#extractPokemonHabitat(pokemonSpecie),

            isLegendary:        this.#extractPokemonLegendary(pokemonSpecie),

            isMythical:         this.#extractPokemonMythical(pokemonSpecie),

            baseHappiness:      this.#extractPokemonBaseHappiness(pokemonSpecie),

            shape:              this.#extractPokemonShape(pokemonSpecie),

            color:              this.#extractPokemonColor(pokemonSpecie),

            curiosity:          this.#extractPokemonCuriosity(pokemonSpecie),

            evolvesFrom:        this.#extractPokemonEvolvesFrom(pokemonSpecie),

            evolutionChainUrl:  this.#extractEvolutionChainUrl(pokemonSpecie)

        };
    }

    #extractPokemonName(pokemonSpecie) {
        return pokemonSpecie.name;
    }


    #extractPokemonHabitat(pokemonSpecie) {
        if(pokemonSpecie.habitat)
            return pokemonSpecie.habitat.name;

        return "Unkown";
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
        const curiosities = pokemonSpecie["flavor_text_entries"];

        for (const curiosity of curiosities) {
            if(curiosity?.language?.name === "en") {
                return curiosity["flavor_text"];
            }
        }
        return curiosities[0]["flavor_text"];
    }

    #extractPokemonEvolvesFrom(pokemonSpecie) {
        return pokemonSpecie?.["evolves_from_species"]?.name ? pokemonSpecie?.["evolves_from_species"]?.name : "None";
    }

    #extractEvolutionChainUrl(pokemonSpecie) {
        return pokemonSpecie["evolution_chain"].url;
    }

}

module.exports= new PokemonSpecieFactory();