angular.module('pokemonApp').component('pokemonDetail', {
    templateUrl: 'components/pokemon-detail.html',
    controller: function(PokemonService, $scope) {
      const ctrl = this;
      ctrl.pokemon = null;
  
      ctrl.loadPokemonDetails = function(name) {
        PokemonService.getPokemonDetails(name).then(response => {
          ctrl.pokemon = response.data;
        });
      };
  
      ctrl.$onInit = function() {
        ctrl.loadPokemonDetails('charizard');
      };
  
      $scope.$on('pokemonSelected', function(event, name) {
        ctrl.loadPokemonDetails(name);
      });
    }
});
  