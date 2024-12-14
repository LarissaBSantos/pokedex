const pokeApi = {}

const limit = 10;
const maxPokemons = 151;
let offset = 0;
let id = 1;

//Funcao que converte o body do response para json
function convertBodyToJson(listResponses){
    return Promise.all(listResponses.map((response) => response.json()))
}

//Funcao que converte uma lista de objetos em uma lista de requisicoes
function convertToPromiseList(objectList){
    return objectList.map((object) => fetch(object.url))
}

//Funcao que retorna uma lista de pokemons
pokeApi.getPokemons = (limit = 0, offset = 0) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())                    
        .then((responseJson) => responseJson.results)               
        .then((results) => convertToPromiseList(results))                   //retorna uma lista de promises
        .then((pokemonPromises) => Promise.all(pokemonPromises))            //retorna uma lista de responses
        .then((pokemonsResponses) => convertBodyToJson(pokemonsResponses))  //retorna a lista de pokemons                                   
}

//Funcao que retorna dados do pokemon
pokeApi.getPokemonData = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const response = await fetch(url);
    return await response.json();
}

//Funcao que retorna os dados do campo 'Breeding'
pokeApi.getPokemonBreeding = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`

    const response = await fetch(url);
    return await response.json();
}

//Funcao que retorna todos os dados para a resolucao das informacoes
pokeApi.getPokemon = async (id) => {
    const generalData = await pokeApi.getPokemonData(id);
    const breedingData = await pokeApi.getPokemonBreeding(id);
    
    pokemon = Object.assign({}, generalData, breedingData);

    return pokemon
}
