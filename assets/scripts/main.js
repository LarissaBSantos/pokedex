//Funcao que converte um objeto para um string li
function convertObjectToLi(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">

                    <ol>
                        ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`
}

//Funcao retorna uma lista de pokemons personalizada
function getPokemonDetail(pokemonObject){
    const pokemon = new Pokemon();

    pokemon.name = pokemonObject.name;
    pokemon.id = pokemonObject.id;
    pokemon.photo = pokemonObject.sprites.other.dream_world.front_default;
    pokemon.types = pokemonObject.types.map((AType) => AType.type.name);
    pokemon.type = pokemon.types[0];

    return pokemon
}  

pokeApi.getPokemons(limit, offset).then((pokemons = []) => {
    pokemons = pokemons.map(getPokemonDetail)
    document.getElementById("pokemons").innerHTML += pokemons.map(convertObjectToLi).join('')
});                

function loadMore(){
    offset += 10;
    if((maxPokemons - offset) <= limit){
        const newLimit = maxPokemons - offset;

        pokeApi.getPokemons(newLimit, offset).then((pokemons = []) => {
            pokemons = pokemons.map(getPokemonDetail)
            document.getElementById("pokemons").innerHTML += pokemons.map(convertObjectToLi).join('')
        });  

        document.getElementsByClassName("btn-loadMore")[0].remove();

    } else {
        pokeApi.getPokemons(limit, offset).then((pokemons = []) => {
            pokemons = pokemons.map(getPokemonDetail)
            document.getElementById("pokemons").innerHTML += pokemons.map(convertObjectToLi).join('')
        });
    }
}