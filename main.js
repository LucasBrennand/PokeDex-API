const container = document.querySelector("#container");
const loadBtn = document.querySelector(".load-btn");
const searchInputValue = document.querySelector("#search-input").value;
const searchBtn = document.querySelector("#search-btn");
const pokemonArray = [];
let offset = 0;

const getPokemonArray = async () => {
  const newPokemons = [];
  await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=4`)
    .then((response) => response.json())
    .then((data) => {
      for (const i of data.results) {
        pokemonArray.push(i);
        newPokemons.push(i);
      }
      offset += 4;
    })
    .catch((error) => console.error("Get pokemon api error:", error));
  return newPokemons;
};

const getPokemonInfo = async (pokemonList) => {
  const pokemonInfoArray = [];
  try {
    for (const pokemon of pokemonList) {
      const sprite = await getPokemonSprite(pokemon.url);
      if (!sprite) throw new Error("Sprites undefined");

      const abilities = await getPokemonAbilities(pokemon.url);
      if (!abilities) throw new Error("Abilities undefined");

      const types = await getPokemonTypes(pokemon.url);
      if (!types) throw new Error("Types undefined");

      const pokemonInfo = createPokemonInfo(
        pokemon.name,
        sprite,
        abilities,
        types
      );
      pokemonInfoArray.push(pokemonInfo);
    }
    return pokemonInfoArray;
  } catch (error) {
    console.error(error);
  }
};

const getPokemonInfoByName = async () => {
  const name = document.querySelector("#search-input").value.trim().toLowerCase();
  if (!name) return [];

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Pokémon not found");
    const data = await response.json();

    const pokemonObj = { name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${data.name}` };
    pokemonArray.push(pokemonObj);

    return [pokemonObj];
  } catch (error) {
    console.error("Get pokemon api error:", error);
    return [];
  }
};

const getPokemonSprite = async (link) => {
  return fetch(link)
    .then((response) => response.json())
    .then((data) => data.sprites.front_default)
    .catch((error) => console.error("Error fetching sprite", error));
};

const getPokemonAbilities = async (link) => {
  const abilities = [];
  return fetch(link)
    .then((response) => response.json())
    .then((data) => {
      for (const i of data.abilities) {
        abilities.push(i.ability.name);
      }
      return abilities;
    })
    .catch((error) => console.error("Error fetching abilities", error));
};

const getPokemonTypes = async (link) => {
  const types = [];
  return fetch(link)
    .then((response) => response.json())
    .then((data) => {
      for (const i of data.types) {
        types.push(i.type.name);
      }
      return types;
    })
    .catch((error) => console.error("Error fetching types", error));
};

const createPokemonInfo = (name, sprite, abilities, types) => {
  return { name, sprite, abilities, types };
};

const createPokemonCard = async (pokemonObject) => {
  let movesListCounter = 0;
  let typesListCounter = 0;
  pokemonObject.forEach((pokemon) => {
    const newCard = document.createElement("div");
    container.appendChild(newCard);
    newCard.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h1>${pokemon.name}</h1>
          <img width="200px" src="${pokemon.sprite}" alt="pokemon-img">
          <ul class="list-container type-list" id="types-list-${typesListCounter}"></ul>
        </div>
        <div class="card-body">
          <ul class="list-container moves-list" id="moves-list-${movesListCounter}"></ul>
        </div>
      </div>
    `;

    const typesList = newCard.querySelector(`#types-list-${typesListCounter}`);
    for (const element of pokemon.types) {
      const newType = document.createElement("li");
      typesList.appendChild(newType);
      newType.innerText = element.toUpperCase();

      const colors = {
        fire: "red",
        grass: "green",
        poison: "purple",
        water: "blue",
        flying: "rgba(140, 137, 226, 0.877)",
        normal: "grey",
        fighting: "rgba(158, 37, 35, 0.877)",
        ground: "rgb(234, 181, 36)",
        rock: "rgba(151, 138, 23, 0.877)",
        bug: "rgba(139, 213, 79, 0.877)",
        ghost: "rgba(65, 46, 209, 0.877)",
        electric: "yellow",
        psychic: "rgba(240, 13, 160, 0.877)",
        ice: "rgba(136, 238, 240, 0.877)",
        dragon: "rgba(174, 102, 242, 0.877)",
        dark: "rgba(79, 35, 32, 0.877)",
        steel: "rgb(199, 199, 199)",
        fairy: "rgb(242, 197, 230)",
        food: "grey",
        slug: "grey",
        plastic: "grey",
        wind: "grey",
        crystal: "grey",
        light: "grey",
      };
      if (colors[element]) newType.style.backgroundColor = colors[element];
    }

    const movesList = newCard.querySelector(`#moves-list-${movesListCounter}`);
    for (const element of pokemon.abilities) {
      const newAbility = document.createElement("li");
      movesList.appendChild(newAbility);
      newAbility.innerText = element;
    }

    typesListCounter++;
    movesListCounter++;
  });
};

const main = async () => {
  const newPokemons = await getPokemonArray();
  const pokemonInfo = await getPokemonInfo(newPokemons);
  await createPokemonCard(pokemonInfo);
};

const search = async () => {
  const newPokemon = await getPokemonInfoByName();
  const pokemonInfo = await getPokemonInfo(newPokemon);
  await createPokemonCard(pokemonInfo);
}

loadBtn.addEventListener("click", main);
searchBtn.addEventListener("click", search);
main();
