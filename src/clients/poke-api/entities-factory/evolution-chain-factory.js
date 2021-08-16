class EvolutionChainFactory {

    buildEvolutionChain(pokemonName, evolutionChain) {

        return {
            evolvesTo: this.#extractPokemonEvolution(pokemonName, evolutionChain)
        };
    }

    #extractPokemonEvolution(pokemonName, evolutionChain) {
        let pokemonNode = evolutionChain.chain;
        
        while(pokemonNode.species.name !== pokemonName && this.#isNotEndOfEvolutionChain(pokemonNode)) {
            pokemonNode = pokemonNode["evolves_to"][0];
        }

        const pokemonEvolutionName = this.#extractPokemonEvolutionName(pokemonNode);

        return pokemonEvolutionName;
    }

    #isNotEndOfEvolutionChain(pokemonNode) {
        return pokemonNode["evolves_to"].length > 0;
    }

    #extractPokemonEvolutionName(pokemonNode) {

        if(this.#isNotEndOfEvolutionChain(pokemonNode)) {
            const pokemonEvolutionNode = pokemonNode["evolves_to"];

            return pokemonEvolutionNode[0].species.name;
        } else {
            return "None"
        }
    }

}

module.exports= new EvolutionChainFactory();