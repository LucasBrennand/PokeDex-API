// const container = document.querySelector("#container");
const pokemonArray = [];
let offset = 0;
let movesListCounter = 0;
let typesListCounter = 0;

const getPokemonArray = async () => {
  await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=4`)
    .then((response) => response.json())
    .then((data) => {
      for (const i of data.results) {
        pokemonArray.push(i);
      }
      //   console.log(pokemonArray);
      offset += 4;
    })
    .catch((error) => console.error("Get pokemon api error:", error));
};

const getPokemonInfo = async () => {
  const pokemonInfoArray = [];
  try {
    for (const pokemon of pokemonArray) {
      //   console.log(pokemon.name);
      const sprite = await getPokemonSprite(pokemon.url);
      if (sprite == undefined) {
        throw new Error("Sprites undefined");
      }
      const abilites = await getPokemonAbilities(pokemon.url);
      if (abilites == undefined) {
        throw new Error("Abilities undefined");
      }
      const types = await getPokemonTypes(pokemon.url);
      if (types == undefined) {
        throw new Error("Types undefined");
      }
      const pokemonInfo = createPokemonInfo(
        pokemon.name,
        sprite,
        abilites,
        types
      );
      pokemonInfoArray.push(pokemonInfo);
    }
    return pokemonInfoArray;
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

const getPokemonAbilities = async (link) => {
  const abilites = [];
  return fetch(link)
    .then((response) => response.json())
    .then((data) => {
      for (const i of data.abilities) {
        abilites.push(i.ability.name);
      }
      return abilites;
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
    .catch((error) => console.error("Error fetching abilities", error));
};

const createPokemonInfo = (name, sprite, abilites, types) => {
  const pokemonInfo = {
    name: name,
    sprite: sprite,
    abilites: abilites,
    types: types,
  };
  return pokemonInfo;
};

const createPokemonCard = async () => {
  const pokemonObject = await getPokemonInfo();
  pokemonObject.forEach((pokemon) => {
    const newCard = document.createElement("div");
    container.appendChild(newCard);
    newCard.innerHTML = `
  <div class="card">
      <div class="card-header">
        <h1>${pokemon.name}</h1>
        <img width="200px" src="${pokemon.sprite}" alt="pokemon-img">
        <ul class="list-container type-list types-list-${typesListCounter}">
          
        </ul>
      </div>
      <div class="card-body">
        <ul class="list-container moves-list moves-list-${movesListCounter}">
          
        </ul>
      </div>
    </div>
  `;

    const typesList = document.querySelector(`.types-list-${typesListCounter}`);
    for (const element of pokemon.types) {
      const newType = document.createElement("li");
      typesList.appendChild(newType);
      newType.innerText = element;
    }

    const movesList = document.querySelector(`.moves-list-${movesListCounter}`);
    for (const element of pokemon.abilites) {
      const newAbility = document.createElement("li");
      movesList.appendChild(newAbility);
      newAbility.innerText = element;
    }
    typesListCounter++;
    movesListCounter++;
  });
};

const main = async () => {
  await getPokemonArray();
  await getPokemonArray();
  console.log(await getPokemonInfo());
  await createPokemonCard(getPokemonInfo());
};

main();
