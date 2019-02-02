const mongoose = require('mongoose');
const redis = require('redis');

const models = {};
let connection = null;
let client = null;

async function makeRedisConnection() {
  if (client === null) {
    client = redis.createClient(
      'redis://localhost'
    );
  }
  return client;
}

async function makeMongoConnection(
  _models = {},
  url = 'mongodb://localhost:27017/bear'
) {
  if (connection === null) {
    // TODO: unhardcode the connection url
    // TODO: handle connection loose
    mongoose.set('debug', true);
    connection = await mongoose.createConnection(url, {
      useNewUrlParser: true
    });

    // Load all models dynamically from the models object
    Object.keys(_models).forEach(
      modelName =>
        (models[modelName] = connection.model(modelName, _models[modelName]))
    );
  }

  return { connection, models };
}

module.exports = { makeMongoConnection, makeRedisConnection };
