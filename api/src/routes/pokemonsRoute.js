const { Router } = require('express');
const pokemonsRoute = Router();
const { getPokemons } = require('./../controllers/pokemonsC');

//localhost:3001/pokemons => parametros(params, query and body)

pokemonsRoute.get('/', async(req,res) => {
    try {
        const api = await getPokemons()
        res.status(200).send(api)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

// pokemonsRoute.post('/pokemons', (req,res) => {
//     console.log('post pokemons')
// })

// router.put('/pokemons', (req,res) => {
//     console.log('put pokemons')
// })

// router.delete('/pokemons', (req,res) => {
//     console.log('detele pokemons')
// })


module.exports = pokemonsRoute;
