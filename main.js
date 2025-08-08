
const pokemonArray = []
let offset = 0
const getPokemonAPI = async () => {
   await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=3`)
    .then(response => response.json())
    .then(data => {
        for (i of data.results){
            pokemonArray.push(i)
        }
        console.log(pokemonArray)
        offset+=3
        
    })
    .catch(error => console.error('Get pokemon api error:',error)
    )
}

//Bulbassaur example
const getPokemonInfo = async () => {
    for (pokemon of pokemonArray){
        console.log(pokemon.name)
    }
        // await fetch('https://pokeapi.co/api/v2/pokemon/1')
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data.sprites.front_default)
        //     for (const ability of data.abilities){
        //         console.log(ability.ability.name)
        //     }
        // })
        // .catch(error => console.error('Get pokemon info error:',error)
        // )
}

const main = async () => {
    await getPokemonAPI()
    await getPokemonAPI()
    await getPokemonInfo()
}

main()