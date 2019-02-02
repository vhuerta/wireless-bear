'use strict';

// Local dependencies
const { makeFindPaginated } = require('./patients.methods');
const { verifyAuthentication } = require('../../helpers');

function patients(_, args, { models, user }) {
  verifyAuthentication(user);
  return makeFindPaginated(models.Patient)(args);
}

module.exports = {
  Query: {
    patients
  }
};
