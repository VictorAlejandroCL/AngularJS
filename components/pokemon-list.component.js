angular.module('pokemonApp').component('pokemonList', {
    templateUrl: 'components/pokemon-list.html',
    controller: function(PokemonService, $rootScope) {
      const ctrl = this;
      ctrl.pokemons = [];
      ctrl.filterText = '';
      ctrl.page = 1;
      ctrl.totalPages = 0;
      const limit = 5;
  
      ctrl.loadPokemons = function() {
        const offset = (ctrl.page - 1) * limit;
        PokemonService.getPokemonList(offset, limit).then(response => {
          ctrl.pokemons = response.data.results;
          ctrl.totalPages = Math.ceil(response.data.count / limit);
        }).catch(error => {
          console.error('Error loading pokemons:', error);
        });
      };
  
      ctrl.selectPokemon = function(name) {
        $rootScope.$broadcast('pokemonSelected', name);
      };
  
      ctrl.$onInit = function() {
        ctrl.loadPokemons();
      };
  
      ctrl.prevPage = function($event) {
        $event.preventDefault();
        if (ctrl.page > 1) {
          ctrl.page--;
          ctrl.loadPokemons();
        }
      };
  
      ctrl.nextPage = function($event) {
        $event.preventDefault();
        if (ctrl.page < ctrl.totalPages) {
          ctrl.page++;
          ctrl.loadPokemons();
        }
      };
    }
  });
  