'use strict';

// Third-party dependencies
const { ApolloError } = require('apollo-server-express');
const jschemator = require('jschemator');

// Local dependencies
const {
  makeEmailExists,
  makeRegister,
  makeAssignToken,
  makeGetUserByCredentials
} = require('./users.methods');
const { validateSignUp, validateLogin } = require('./users.validations');
const { verifyAuthentication } = require('../../helpers');

/**
 * SignUp resolver
 * @param {*} _
 * @param {*} param1
 * @param {*} param2
 */
async function signUp(_, { input }, { models, redis }) {
  // Validate Input
  const validator = jschemator(validateSignUp, 'en', {
    flat : true,
    $data: true
  });
  if (!validator.validate(input)) {
    // Validation failed
    const errors = { fields: validator.paths, detail: validator.errors };
    throw new ApolloError('error.verify_data', 'ERROR_VERIFY_DATA', errors);
  }

  // Validate that the email doesn't exists
  const emailExists = makeEmailExists(models.User);
  if (await emailExists(input.email)) {
    const errors = {
      fields: ['email.exists'],
      detail: { 'email.exists': 'email already registered' }
    };
    throw new ApolloError('error.verify_data', 'ERROR_VERIFY_DATA', errors);
  }

  // Create the new user and generate authentication token
  const register = makeRegister(models.User);
  const assignToken = makeAssignToken(redis);
  const user = await register(input);
  const token = await assignToken(user);

  // TODO: send confirmation email

  return { id: user.id, user, token };
}

async function login(_, { input }, { models, redis }) {
  const validator = jschemator(validateLogin, 'en', {
    flat : true,
    $data: true
  });

  if (!validator.validate(input)) {
    // Validation failed
    const errors = { fields: validator.paths, detail: validator.errors };
    throw new ApolloError('error.verify_data', 'ERROR_VERIFY_DATA', errors);
  }

  const getUserByCredentials = makeGetUserByCredentials(models.User);
  const user = await getUserByCredentials(input);

  if (!user)
    throw new ApolloError('error.bad_credentials', 'ERROR_BAD_CREDENTIALS');

  const assignToken = makeAssignToken(redis);
  const token = await assignToken(user);
  return { id: user.id, user, token };
}

async function verifyToken(_, __, { user }) {
  verifyAuthentication(user);
  return { id: user._id.toString(), ...user };
}

module.exports = {
  Mutation: {
    signUp,
    login
  },
  Query: {
    verifyToken
  }
};
