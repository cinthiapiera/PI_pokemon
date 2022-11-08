import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const FILTER_POKEMONS_TYPES = "FILTER_POKEMONS_TYPES";
export const FILTER_POKEMONS_CREATED = "FILTER_POKEMONS_CREATED";
export const SORT_POKEMONS_ALPHA = "SORT_POKEMONS_ALPHA";
export const SORT_POKEMONS_ATTACK = "SORT_POKEMONS_ATTACK";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_POKEMON_ID = "GET_POKEMON_ID";
export const POST_POKEMON = "POST_POKEMON";
// export const MESSAGE_ERROR = "MESSAGE_ERROR";

export function getPokemons() {
  return async function (dispatch) {
    try {
      const pokemons = await axios.get(`http://localhost:3001/pokemons`)
      return dispatch({
        type: GET_POKEMONS,
        payload: pokemons.data
      })
    } catch (error) {
      window.alert([error.message])
    }
  }
};

export function getTypes() {
  return async function(dispatch) {
    try {
      const types = await axios.get(`http://localhost:3001/types`)
      return dispatch({
        type: GET_TYPES,
        payload: types.data
      })
    } catch (error) {
      window.alert([error.message])
    }
  }
}

export function getPokemonName(name) {
  return async function (dispatch) {
    try {
      const namepokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      //console.log(namepokemon);
      return dispatch({
        type: GET_POKEMON_NAME,
        payload: namepokemon.data
      })
    } catch (error) {
      window.alert([error.message]) 
    }
  }
}

export function getPokemonId(id) {
  return async function (dispatch) {
    try {
      const pokemonid = await axios.get(`http://localhost:3001/pokemons/${id}`)
      //console.log(pokemonid.data);
      return dispatch({
        type: GET_POKEMON_ID,
        payload: pokemonid.data
      })
    } catch (error) {
      //alert("Pokemon not found")
      window.alert([error.message])
    }
    
  }
}

export function postPokemon(payload) {
  console.log(payload)
  return async function () {
    try {
      const create = await axios.post("http://localhost:3001/pokemons/",payload)
      alert('se creo el pokemon')
      return create;
    } catch (error) {
      // alert('Pokemon name already exist')
      window.alert([error.message])
    }

  }
}

export function sortPokemonsAlphabetic(payload) {
  return{
    type: SORT_POKEMONS_ALPHA,
    payload
  }
}

export function sortPokemonsAttack(payload){
  return{
    type: SORT_POKEMONS_ATTACK,
    payload
  }
}

export function filterPokemonsTypes(payload){
  return {
    type: FILTER_POKEMONS_TYPES,
    payload
  }
}

export function filterPokemonsCreated(payload) {
  return{
    type: FILTER_POKEMONS_CREATED,
    payload
  }
}