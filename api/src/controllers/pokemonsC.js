const axios = require('axios');

const getPokemons = async() => {
      let array=[]
      const pokemonsApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0')
      const aux = pokemonsApi.data.results
      
      for (let i = 0; i < aux.length; i++){
          let aux2 = await axios.get(`${aux[i].url}`)
          array.push(aux2.data) 
      }
      let array2 = array.map(el => {
        return{
          id: el.id,
          name: el.name,
          sprites: el.sprites.other['official-artwork']['front_default'],
          types: el.types.map(type => type.type.name)
        }
      })
      return array2;    
}

module.exports = { getPokemons };

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