const axios = require('axios');
const { Pokemon, Type } = require('./../db');

const dataApi = async() => {

      // let pokemonsApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0')
      // let urlPokemons = pokemonsApi.data.results
      // let dataPokemons=[]
      // // console.log(urlPokemons.length);
      // for(let i=0; i<urlPokemons.length; i++){
      //     let aux = await axios.get(`${urlPokemons[i].url}`)
      //     dataPokemons.push(aux.data) 
      // }
      // let pokemons = dataPokemons.map(pokemon => {
      //   return{
      //     id: pokemon.id,
      //     name: pokemon.name,
      //     image: pokemon.sprites.other.home.front_default,
      //     types: pokemon.types.map(type => { return {name: type.type.name}}),
      //     attack: pokemon.stats[1].base_stat, 
      //   }
      // })
      // throw Error('error voluntario')
    let apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
    const apiInfo = apiUrl.data.results.map(e => axios.get(e.url)) 
    let pokeInfo = await axios.all(apiInfo)
    .then(respuesta => 
        respuesta.map( pokemon => { 
            return  {
                id: pokemon.data.id,
                name: pokemon.data.name,
                image: pokemon.data.sprites.other.home.front_default,
                types: pokemon.data.types.map(tp =>{return {name: tp.type.name}}),
                attack: pokemon.data.stats[1].base_stat,
            }
        })
    )
      return globalThis.pokeData = pokeInfo
}
dataApi()

const dataDB = async()=> {
  const pokemonDb = await Pokemon.findAll({
    attributes: ["id", "name", "image", "attack"],
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    }
  })
  return pokemonDb; 
}

const getPokemons = async()=>{
  let api = pokeData
  let DB = await dataDB()
  return [...api,...DB];
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
        image: pokemonId.sprites.other.home.front_default,
        types: pokemonId.types.map(type => { return {name: type.type.name}})
      }
      return pokemon;
    }
}

const createPokemon = async({name, hp, attack, defense, speed, height, weight, image, types}) => {
  if(!name || !hp || !attack || !defense || !speed || !height || !weight || !image || !types){
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
    })
    let typeDb = await Type.findAll({
      where: { name: types}
    })
    await create.addType(typeDb);
    return {message: "Pokémon created successfully", create };
  }
}

module.exports = { getPokemons, createPokemon, getPokemonId };