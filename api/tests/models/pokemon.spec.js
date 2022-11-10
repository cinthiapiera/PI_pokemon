const { Pokemon, Types, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
      it('should not work when there is no name', () => {
        Pokemon.create({ weight: '15' })
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
      });
    });
  });
  describe('Ejemplo', ()=>{
    it('should not create the type de pokemon if name is not send', async()=>{
      expect.assertions(1)
      try{
        await Types.create({name: 'Hola'});
      }catch(error){
        expect(error.message).toBeDefined();
      }
    })
  })
});
