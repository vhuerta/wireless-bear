const mongoose = require('mongoose');
const should = require('should');
const sinon = require('sinon');
const bcrypt = require('bcrypt');

const modelDefinition = require('src/app/modules/users/users.model');
const methods = require('src/app/modules/users/users.methods');

describe('User methods', () => {
  let model;

  beforeEach(() => {
    model = mongoose.model('User', modelDefinition);
  });

  describe('#makeRegister', () => {
    let register;

    let newUser = {
      name          : 'Victor',
      fathersSurname: 'Huerta',
      mothersSurname: 'Hernandez',
      email         : 'vhuertahnz@gmail.com',
      password      : 'admin1234'
    };

    beforeEach(() => {
      register = methods.makeRegister(model);
      should(register).be.a.Function();
    });

    it('Should register a new user', async () => {
      sinon.spy(bcrypt, 'hash');
      const saveStub = sinon.stub(model.prototype, 'save');
      await register(newUser);

      should(saveStub.called).be.true();
      should(bcrypt.hash.getCall(0).args[0]).be.equal(newUser.password);
    });
  });

  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });
});
