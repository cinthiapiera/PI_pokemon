const axios = require('axios')
const { Type } = require('./../db.js');
// const typesApi = require('./../data/types.json');

const getTypes = async () => {

  const typesDb = await Type.findAll();
  if(!typesDb.length){
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type')
    // typesApi.data.results.map
    const types = typesApi.data.results.map(type => {
      return{ name: type.name }
    })
    await Type.bulkCreate(types);
  }
  return typesDb;
};

module.exports = { getTypes };

// fetch('https://pokeapi.co/api/v2/type')
//     .then((response) => response.json()) //lo paso a un objeto por json
//     .then((data) => data.results.map((e)=> {
//          return {name: e.name};
//          })
//     )
//     .then(async(data) => {
//        await Type.bulkCreate(data)
//          res.status(200).send(data)
//       })
//     .catch((error) => { error})