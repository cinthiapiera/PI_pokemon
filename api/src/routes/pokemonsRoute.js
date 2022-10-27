const { Router } = require('express');
const pokemonsRoute = Router();
const { getPokemons, createPokemon, getPokemonId } = require('./../controllers/pokemonsC');

pokemonsRoute.get('/', async(req,res) => {
  try {
      const { name } = req.query;
      const pokemonsAll = await getPokemons()
      if(name){
        let pokemonName = pokemonsAll.filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()))
        pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send({error:'Pokemon not found'})
      }else{
        res.status(200).send(pokemonsAll)
      }
  } catch (error) {
      res.status(404).send({error: error.message})
  }
})

pokemonsRoute.get('/:id', async(req,res) => {
  try {
      const { id } = req.params;
      const pokemonId = await getPokemonId(id)
      res.status(200).send(pokemonId)
  } catch (error) {
      res.status(400).send({error: error.message})
  }
})

pokemonsRoute.post('/', async(req,res) => {
  try {
    const pokemonCreated = await createPokemon(req.body);
    res.status(201).send(pokemonCreated);
  } catch (error) {
    res.status(400).send({error: error.message});
  }
})

module.exports = pokemonsRoute;