'use strict';

// Third-party dependencies
const { ApolloError } = require('apollo-server-express');

function verifyAuthentication(user) {
  if (!user)
    throw new ApolloError('error.not_authenticated', 'ERROR_NOT_AUTHENTICATED');
  return;
}

module.exports = { verifyAuthentication };
