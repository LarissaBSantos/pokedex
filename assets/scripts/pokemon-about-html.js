//Funcao que converte um objeto para HTML
function convertToHTML(pokemon) {
    return `
        <div class="general-info">
            <span id="id">#${pokemon.id}</span>

            <button type="button" onclick="window.location.href='./index.html'" class="btn-return">Voltar</button>
            <h1>${pokemon.name}</h1>
            
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
            </ol>

            <div class="pokemon-image">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>
        <div class="about">
                <table class="general-data">
                    <tbody>
                        <tr>
                            <th>Species</th>
                            <td>Seed</td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>(${pokemon.height}cm)</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>(${pokemon.weight}kg)</td>
                        </tr>
                        <tr>
                            <th>Abilities</th>
                            <td>
                                ${pokemon.abilities.map((ability) => `${ability}`).join(', ')}
                            </td>
                        </tr>
                    </tbody>
                </table>    

                <table class="breeding">
                    <thead>
                        <tr>
                            <th colspan="3" id="title-table">Breeding</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Gender</th>
                            <td colspan="2">♂️ ${pokemon.gender.male}%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♀️${pokemon.gender.female}%</td>
                        </tr>
                        <tr>
                            <th>Egg Groups</th>
                            <td>
                                ${pokemon.eggGroups.map((group) => `${group}`).join(', ')}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>Egg Cycle</th>
                            <td>${pokemon.eggCycle}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div> 
    `
}