//Funcao que converte um objeto para um string li
function convertObjectToLi(pokemon) {
    return `<li class="pokemon ${pokemon.type}" type="button" onclick="window.location.href='../pokemon-about.html';">
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

//Funcao que retorna um objeto do tipo Pokemon, utilizada para carregar os pokemons da pagina principal
function getPokemonMainPage(pokemonObj){
    const pokemon = new Pokemon();

    pokemon.name = pokemonObj.name;
    pokemon.id = pokemonObj.id;
    pokemon.photo = pokemonObj.sprites.other.dream_world.front_default;
    pokemon.types = pokemonObj.types.map((AType) => AType.type.name);
    pokemon.type = pokemon.types[0];

    return pokemon
}

//Funcao que retorna um objeto do tipo pokemon, utilizada para carregar o pokemon da pagina about
function getPokemonAboutPage(pokemonObj){
    const pokemon = new Pokemon();

    pokemon.name = pokemonObj.name;
    pokemon.id = pokemonObj.id;
    pokemon.photo = pokemonObj.sprites.other.dream_world.front_default;
    pokemon.types = pokemonObj.types.map((AType) => AType.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.height = pokemonObj.height / 10;
    pokemon.weight = pokemonObj.weight / 10;
    pokemon.eggCycle = pokemonObj.hatch_counter;
    pokemon.abilities = pokemonObj.abilities.map((Aability) => Aability.ability.name);
    pokemon.eggGroups = pokemonObj.egg_groups.map((eggG) => eggG.name);
    pokemon.genderRate = pokemonObj.gender_rate;
    pokemon.gender = pokemon.calculateGenderProportion(pokemon.genderRate);

    return pokemon
}

//Funcao que retorna uma lista de pokemons
pokeApi.getPokemons(limit, offset).then((pokemons = []) => {
    pokemons = pokemons.map(getPokemonMainPage)
    document.getElementById("pokemons").innerHTML += pokemons.map(convertObjectToLi).join('')
});                

//Funcao que carrega mais pokemons na tela
function loadMore(){
    offset += 10;
    if((maxPokemons - offset) <= limit){
        const newLimit = maxPokemons - offset;

        pokeApi.getPokemons(newLimit, offset).then((pokemons = []) => {
            pokemons = pokemons.map(getPokemonMainPage)
            document.getElementById("pokemons").innerHTML += pokemons.map(convertObjectToLi).join('')
        });  

        document.getElementsByClassName("btn-loadMore")[0].remove();

    } else {
        pokeApi.getPokemons(limit, offset).then((pokemons = []) => {
            pokemons = pokemons.map(getPokemonMainPage)
            document.getElementById("pokemons").innerHTML += pokemons.map(convertObjectToLi).join('')
        });
    }
}

//Funcao que carrega o pokemon na tela about
pokeApi.getPokemon(143).then((pokemon) => {
    pokemon = getPokemonAboutPage(pokemon);
    pokemon = convertToHTML(pokemon);
    document.getElementById("content").innerHTML = pokemon;
    // console.log(pokemon);
});