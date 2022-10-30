import { GET_POKEMONS, GET_TYPES } from "./actions";

const initialState = {
  pokemons: [],
  types: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return{
        ...state,
        pokemons: action.payload
      }
    case GET_TYPES:
      return{
        ...state,
        types: action.payload
      }  
    default:
      return{
        ...state
      } 
  }
}

export default reducer;