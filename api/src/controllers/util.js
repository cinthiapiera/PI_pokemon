// const axios = require('axios');
// const { Pokemon, Type } = require('./../db');
// // const pokemons = require('./../data/pokemon.json')

// const getPokemons = async() => {
//       const pokemonsApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0')
//       const urlPokemons = pokemonsApi.data.results
//       let dataPokemons=[]
//       for (let i = 0; i < urlPokemons.length; i++){
//           let aux = await axios.get(`${urlPokemons[i].url}`)
//           dataPokemons.push(aux.data) 
//       }
//       let pokemons = dataPokemons.map(pokemon => {
//         return{
//           id: pokemon.id,
//           name: pokemon.name,
//           image: pokemon.sprites.other.home.front_default,
//           types: pokemon.types.map(type => { return {name: type.type.name}}),
//           attack: pokemon.stats[1].base_stat, 
//         }
//       })

//       // return globalThis.pokeData = pokemons
//       //invocas a la funcion de getPokemons()

//       // throw Error('error voluntario')
//       //crear funcion de getBD 
//       const pokemonDb = await Pokemon.findAll({
//         attributes: ["id", "name", "image", "attack"],
//         include: {
//           model: Type,
//           attributes: ["name"],
//           through: {
//             attributes: [],
//           },
//         }
//       })

//       return [...pokemons,...pokemonDb];
// }
