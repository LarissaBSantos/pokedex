const limit = 5;
const offset = 0;

const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

let pokemons;

function convertObjectToLi(object) {
    return `<li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${object.name}</span>

                <div class="detail">

                    <ol>
                        <li class="type">grass</li>
                        <li class="type">poisom</li>
                    </ol>


                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="Bulbasaur">
                </div>
            </li>`
}

fetch(url)
    .then((response) => response.json())
    .then((responseJson) => responseJson.results)
    .then((pokemonsList) => {
            document.getElementsByClassName("pokemons")[0].innerHTML = pokemonsList.map(convertObjectToLi).join('')
        }
    )
