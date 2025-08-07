
const getPokemonAPI = async () => {
   await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=3000')
    .then(response => response.json())
    .then(data => {
        const bulba = data.results.filter(pokemon => pokemon.name == "ninjask")
        console.log(bulba)
        
    })
    .catch(error => console.error('Error found',error)
    )
}

getPokemonAPI()