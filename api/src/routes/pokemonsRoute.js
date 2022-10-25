const { Router } = require('express');
const pokemonsRoute = Router();
const { getPokemons, createPokemons, getPokemonId } = require('./../controllers/pokemonsC');
const { Pokemon } = require('./../db');


//localhost:3001/pokemons => parametros(params, query and body)

pokemonsRoute.get('/', async(req,res) => {
  try {
      const { name } = req.query;
      if(name){
        res.status(200).send('esta buscando pokemon por name')
      }
      else{
        const pokemonsApi = await getPokemons()
        res.status(200).send(pokemonsApi)
      } 
  } catch (error) {
      res.status(400).send({error: error.message})
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
    const pokemonCreated = await createPokemons(req.body)
    res.status(201).send({create: "ok", pokemon: pokemonCreated})
  } catch (error) {
    res.status(400).send({error: error.message})
  }
})

// router.put('/pokemons', (req,res) => {
//     console.log('put pokemons')
// })

// router.delete('/pokemons', (req,res) => {
//     console.log('detele pokemons')
// })


module.exports = pokemonsRoute;
