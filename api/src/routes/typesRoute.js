const { Router } = require('express');
const typesRoute = Router();
const { getTypes } = require('./../controllers/typesC');

typesRoute.get('/', async(req,res) => {
  try {
      const typeDb = await getTypes();
      res.status(200).send(typeDb);
  } catch (error) {
      res.status(400).send({error: error.message});
  }
});

module.exports = typesRoute;