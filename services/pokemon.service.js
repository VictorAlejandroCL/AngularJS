angular.module('pokemonApp').factory('PokemonService', function($http) {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  function getPokemonList(offset, limit) {
    return $http.get(`${baseUrl}?offset=${offset}&limit=${limit}`);
  }

  function getPokemonDetails(name) {
    return $http.get(`${baseUrl}/${name}`);
  }

  return {
    getPokemonList,
    getPokemonDetails
  };
});
