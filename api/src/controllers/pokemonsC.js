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
    const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/
    if(regex.test(id)){
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
      return pokemonDb;
    }else{
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
    }
}

const createPokemon = async({name, hp, attack, defense, speed, height, weight, image, created, types}) => {
  if(!name || !hp || !attack || !defense || !speed || !height || !weight || !image || !created || !types){
    throw Error("Sending incomplete information!");
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
    return {message: "Pokémon created successfully", create };
  }
}

module.exports = { getPokemons, createPokemon, getPokemonId };