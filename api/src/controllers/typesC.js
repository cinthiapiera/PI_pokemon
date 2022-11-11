const axios = require('axios')
const { Type } = require('./../db.js');

const getTypes = async () => {

  const typesDb = await Type.findAll();
  if(!typesDb.length){
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type')
    const types = typesApi.data.results.map(type => {
      return{ name: type.name }
    })
    await Type.bulkCreate(types);
  }
  return typesDb;
};

module.exports = { getTypes };