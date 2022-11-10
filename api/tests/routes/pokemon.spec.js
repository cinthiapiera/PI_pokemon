/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const { request } = require('../../src/app.js');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
  
  // describe('POST /pokemons'),()=>{
  //   it('should return status 400 and corresponding text if any of the mandatory parameters is not send')
  //   const res = request(app).post('/pokemons');
  //   expect(res.statusCode).toBe(400)
  //   expect(res.message.error).toBe("Sending incomplete information!")
  // }
  // afterAll(async () => {
  //   await db.sync({ force: true });
  // })
});
