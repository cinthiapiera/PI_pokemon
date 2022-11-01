import { GET_POKEMONS, GET_TYPES, GET_POKEMON_NAME, GET_POKEMON_ID, FILTER_POKEMONS_TYPES, FILTER_POKEMONS_CREATED, SORT_POKEMONS_ALPHA, SORT_POKEMONS_ATTACK } from "./actions";

const initialState = {
  pokemons: [],
  auxpokemons: [], //state auxiliar con todos los pokemones (40)
  types: [],
  detail: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return{
        ...state,
        pokemons: action.payload,
        auxpokemons: action.payload
      }
    case GET_TYPES:
      return{
        ...state,
        types: action.payload
      }
    case GET_POKEMON_NAME:
      return{
        ...state,
        pokemons: action.payload
      }
    case GET_POKEMON_ID:
      return{
        ...state,
        detail: action.payload
      }     
    case FILTER_POKEMONS_TYPES:
      const allpokemons1 = state.auxpokemons
      const filterpokemonstypes = action.payload === "All" ? allpokemons1 : allpokemons1.filter(pokemon => pokemon.types.map(type => type.name)[0] === action.payload || pokemon.types.map(type => type.name)[1] === action.payload)
      //console.log(filterpokemons);
      return{
        ...state,
        pokemons: filterpokemonstypes //solo contiene los filtrados en el estado (pokemons) que siempre se renderiza
      }
    case FILTER_POKEMONS_CREATED:
      const allpokemons2 = state.auxpokemons
      const filterpokemonscreated = action.payload === "created"? allpokemons2.filter(pokemon => pokemon.created) : allpokemons2.filter(pokemon => !pokemon.created)
      return{
        ...state,
        pokemons: action.payload === "All" ? allpokemons2 : filterpokemonscreated
      }
    case SORT_POKEMONS_ALPHA:
      const sorted1 = action.payload === "asc" 
        ? state.pokemons.sort(function (a,b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;  
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1; 
          return 0;
          })
        : state.pokemons.sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          return 0;
          });
      //console.log(sorted1);
      return{
        ...state,
        pokemons: sorted1
      }
    case SORT_POKEMONS_ATTACK:
      const sorted2 = action.payload === "asc"
      ? state.pokemons.sort(function (a,b){
        if (a.attack > b.attack) return 1;  
        if (a.attack < b.attack) return -1; 
        return 0;
        })
      : state.pokemons.sort(function (a, b) {
        if (a.attack < b.attack) return 1;
        if (a.attack > b.attack) return -1;
        return 0;
        });
      return{
        ...state,
        pokemons: sorted2
      }
    default:
      return{
        ...state
      } 
  }
}

export default reducer;