import { GET_POKEMONS, GET_TYPES, GET_POKEMON_NAME, GET_POKEMON_ID, FILTER_POKEMONS_TYPES, FILTER_POKEMONS_CREATED, SORT_POKEMONS_ALPHA, SORT_POKEMONS_ATTACK, POST_POKEMON, CLEAR} from "./actions";

const initialState = {
  pokemons: [],
  auxpokemons: [],
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
        return {
          ...state,
          pokemons: action.payload,
        };
    case GET_POKEMON_ID:
      return{
        ...state,
        detail: action.payload
      }
    case POST_POKEMON:
      return{
        ...state,
      }
    case SORT_POKEMONS_ALPHA:
      const aux1 = state.pokemons
      let sorted1 = action.payload === "asc"
      ? aux1.sort( (a,b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
        return 0;
        })
      : aux1.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
        return 0;
        });
      return{
        ...state,
        pokemons: sorted1,
      }
    case SORT_POKEMONS_ATTACK:
      let aux2 = state.pokemons
      let sorted2 = action.payload === "asc"
      ? aux2.sort((a,b) => a.attack - b.attack)
      : aux2.sort((a,b) => b.attack - a.attack)
      return{
        ...state,
        pokemons: sorted2,
      }
    case FILTER_POKEMONS_TYPES:
      let aux3 = state.auxpokemons
      let filterpokemonstypes = action.payload === "All"? aux3 
      : aux3.filter(pokemon => pokemon.types.map(type => type.name)[0] === action.payload || pokemon.types.map(type => type.name)[1] === action.payload)
      if(filterpokemonstypes.length === 0){
        filterpokemonstypes=aux3
        alert("Dear user there has not been found pokemon of that type")
      }
      return{
        ...state,
        pokemons: filterpokemonstypes
      }
    case FILTER_POKEMONS_CREATED:
      const aux4 = state.auxpokemons
      let filterpokemonscreated = action.payload === "created"? aux4.filter(pokemon => typeof pokemon.id !== 'number') : aux4.filter(pokemon => typeof pokemon.id === 'number')
      return{
        ...state,
        pokemons: action.payload === "All"? aux4 :  filterpokemonscreated
      }
    case CLEAR:
      return{
        ...state,
        detail: action.payload
      }
    default:
      return {
        ...state
      } 
  }
}

export default reducer;