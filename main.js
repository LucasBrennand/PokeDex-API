const pokemonArray = [];
let offset = 0;

const getPokemonArray = async () => {
  await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=3`)
    .then((response) => response.json())
    .then((data) => {
      for (i of data.results) {
        pokemonArray.push(i);
      }
      console.log(pokemonArray);
      offset += 3;
    })
    .catch((error) => console.error("Get pokemon api error:", error));
};

//Bulbassaur example
const getPokemonInfo = async () => {
  try {
    for (pokemon of pokemonArray) {
      console.log(pokemon.name);
      const sprite = await getPokemonSprite(pokemon.url);
      if (sprite == undefined) {
        throw new Error("Sprites undefined");
      }
      const abilites = await fetchPokemonAbilities(pokemon.url);
      if (abilites == undefined) {
        throw new Error("Abilities undefined");
      }
      console.log(sprite);
      console.log(abilites);
    }
  } catch (error) {
    console.error(error);
  }

  // await fetch('https://pokeapi.co/api/v2/pokemon/1')
};

const getPokemonSprite = async (link) => {
  return fetch(link)
    .then((response) => response.json())
    .then((data) => {
      return data.sprites.front_default;
    })
    .catch((error) => console.error("Error fetching abilities", error));
};

const fetchPokemonAbilities = async (link) => {
  const abilites = [];
  return fetch(link)
    .then((response) => response.json())
    .then((data) => {
      for (i of data.abilities) {
        abilites.push(i.ability.name);
      }
      return abilites;
    })
    .catch((error) => console.error("Error fetching abilities", error));
};

const main = async () => {
  await getPokemonArray();
  await getPokemonArray();
  await getPokemonInfo();
};

main();
