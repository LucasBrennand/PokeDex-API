
const getPokemonAPI = async () => {
   await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=3000')
    .then(response => response.json())
    .then(data => {
        const bulba = data.results.filter(pokemon => pokemon.name == "bulbasaur")
        console.log(bulba)
        
    })
    .catch(error => console.error('Get pokemon api error:',error)
    )
}

//Bulbassaur example
const getPokemonInfo = async () => {
    await fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(response => response.json())
    .then(data => {
        console.log(data.sprites.front_default)
        for (const ability of data.abilities){
            console.log(ability.ability.name)
        }
    })
    .catch(error => console.error('Get pokemon info error:',error)
    )
}

getPokemonAPI()
getPokemonInfo()