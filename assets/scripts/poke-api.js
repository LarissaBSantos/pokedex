const pokeApi = {}

const limit = 10;
const maxPokemons = 151;
let offset = 0;

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