'use strict';

// Third-party dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Local dependencies
const config = require('../../../config');

async function _emailExists(model, email) {
  const user = await model.findOne({ email }).lean();
  return Boolean(user);
}

async function _createUser(
  model,
  { name, mothersSurname, fathersSurname, email, password }
) {
  const hashedPassword = await bcrypt.hash(password, 2);
  return new model({
    name,
    mothersSurname,
    fathersSurname,
    email,
    password: hashedPassword
  }).save();
}

async function _getUserByCredentials(User, { email, password }) {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }
  return user;
}

async function _assignToken(redis, user) {
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, config.jwt.key, { expiresIn: '1 day' });
  redis.set(`auth:token:${user.id}:${token}`, JSON.stringify(user));
  return token;
}

async function _getUserByToken(redis, id, token) {
  return new Promise(function(resolve) {
    redis.get(`auth:token:${id}:${token}`, (err, user) =>
      resolve(err ? err : JSON.parse(user))
    );
  });
}

function makeGetUserByCredentials(User) {
  return _getUserByCredentials.bind(this, User);
}

function makeEmailExists(User) {
  return _emailExists.bind(this, User);
}

function makeRegister(User) {
  return _createUser.bind(this, User);
}

function makeAssignToken(redis) {
  return _assignToken.bind(this, redis);
}

function makeGetUserByToken(redis) {
  return _getUserByToken.bind(this, redis);
}

module.exports = {
  makeRegister,
  makeEmailExists,
  makeGetUserByCredentials,
  makeAssignToken,
  makeGetUserByToken,
  _getUserByCredentials,
  _createUser,
  _emailExists,
  _assignToken
};
