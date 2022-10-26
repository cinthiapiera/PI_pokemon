const axios = require('axios');
const { Pokemon, Type } = require('./../db');

const getPokemons = async() => {
      const pokemonsApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0')
      const urlPokemons = pokemonsApi.data.results
      let dataPokemons=[]
      for (let i = 0; i < urlPokemons.length; i++){
          let aux = await axios.get(`${urlPokemons[i].url}`)
          dataPokemons.push(aux.data) 
      }
      let pokemons = dataPokemons.map(pokemon => {
        return{
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other['official-artwork']['front_default'],
          types: pokemon.types.map(type => { return {name: type.type.name}})
        }
      })
      //throw Error('error voluntario')
      const pokemonDb = await Pokemon.findAll({
        attributes: ["id", "name", "image"],
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        }
      })

      return [...pokemons,...pokemonDb];
}

const getPokemonId = async(id) => {
    //limite de pokeapi = 905
    if(id.length){
      const pokemonsApiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const pokemonId = pokemonsApiId.data
      let pokemon = {
        id: pokemonId.id,
        name: pokemonId.name,
        hp: pokemonId.stats[0].base_stat,
        attack: pokemonId.stats[1].base_stat,
        defense:pokemonId.stats[2].base_stat,
        speed: pokemonId.stats[5].base_stat,
        height: pokemonId.height,
        weight: pokemonId.weight,
        image: pokemonId.sprites.other['official-artwork']['front_default'],
        types: pokemonId.types.map(type => { return {name: type.type.name}})
      }
      return pokemon;
    }else{
      let pokemonDb = await Pokemon.findOne({
        where:{
          id: id
        },
          include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        }
      })
      return pokemonDb
    }
}

const createPokemons = async({name, hp, attack, defense, speed, height, weight, image, created, types}) => {
  if(!name || !hp || !attack || !defense || !speed || !height || !weight || !image || !created || !types){
    return "information required!";
  }else{
    const create = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        created
    })
    let typeDb = await Type.findAll({
      where: { name: types}
    })
    await create.addType(typeDb);
    return create;
  }
}

module.exports = { getPokemons, createPokemons, getPokemonId };

/*
    console.log(pokemonsApi) => 
    {  
      data: {
        count: 1154,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=2&limit=2',
        previous: null,
        results: [ [Object], [Object] ]
      }
    }

    console.log(aux)
    [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
    ]

    console.log(array)
    [
      {
        abilities: [ [Object], [Object] ],
        base_experience: 64,
        forms: [ [Object] ],
        game_indices: [
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object]
        ],
        height: 7,
        held_items: [],
        id: 1,
        is_default: true,
        location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/1/encounters',
        moves: [
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object]
        ],
        name: 'bulbasaur',
        order: 1,
        past_types: [],
        species: {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
        },
        sprites: {
          back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
          back_female: null,
          back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
          back_shiny_female: null,
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          front_female: null,
          front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
          front_shiny_female: null,
          other: [Object],
          versions: [Object]
        },
        stats: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
        types: [ [Object], [Object] ],
        weight: 69
      },
      {},
      {},...
    ]

    console.log(array2)
    [
      {
        id: 1,
        name: 'bulbasaur',
        sprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        types: [ 'grass', 'poison' ]
      },
      {
        id: 2,
        name: 'ivysaur',
        sprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
        types: [ 'grass', 'poison' ]
      }
    ]
*/