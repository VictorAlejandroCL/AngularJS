angular.module('pokemonApp').component('pokemonSummary', {
  templateUrl: 'components/pokemon-summary.html',
  controller: function(PokemonService) {
    const ctrl = this;
    ctrl.summary = [];

    ctrl.calculateSummary = function(pokemons) {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      ctrl.summary = alphabet.map(letter => {
        return {
          letter: letter,
          count: pokemons.filter(pokemon => pokemon.name.toUpperCase().startsWith(letter)).length
        };
      });
    };

    ctrl.loadAllPokemons = function(offset = 0, allPokemons = []) {
      PokemonService.getPokemonList(offset, 100).then(response => {
        const fetchedPokemons = response.data.results;
        allPokemons = allPokemons.concat(fetchedPokemons);
        if (response.data.next) {
          ctrl.loadAllPokemons(offset + 100, allPokemons);
        } else {
          ctrl.calculateSummary(allPokemons);
        }
      }).catch(error => {
        console.error('Error loading summary:', error);
      });
    };

    ctrl.$onInit = function() {
      ctrl.loadAllPokemons();
    };
  }
});
