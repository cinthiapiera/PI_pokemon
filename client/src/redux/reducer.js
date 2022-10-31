import { GET_POKEMONS, GET_TYPES, FILTER_POKEMONS_TYPES, FILTER_POKEMONS_CREATED} from "./actions";

const initialState = {
  pokemons: [],
  auxpokemons: [], //state auxiliar con todos los pokemones (40)
  types: []
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
    default:
      return{
        ...state
      } 
  }
}

export default reducer;