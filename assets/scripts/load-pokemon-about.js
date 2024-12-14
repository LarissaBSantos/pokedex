// Pega o parâmetro "id" da URL
const urlParams = new URLSearchParams(window.location.search);
const loadId = urlParams.get('id');

if (loadId) {
    pokeApi.getPokemon(loadId)
    .then((pokemon) => {
        const content = document.getElementById("content");
        const html = convertToHTML(getPokemonAboutPage(pokemon));
        content.innerHTML = html;
    })
    .catch((err) => {
        console.error(err);
        alert("Erro ao carregar o Pokémon.");
    });
}
