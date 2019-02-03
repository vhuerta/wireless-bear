const mongoose = require('mongoose');
const redis = require('redis');

const config = require('../../config').connections;

const models = {};
let connection = null;
let client = null;

async function makeRedisConnection() {
  if (client === null) {
    client = redis.createClient(config.redis.connectionUrl);
  }
  return client;
}

async function makeMongoConnection(_models = {}, url = config.mongo.connectionUrl) {
  if (connection === null) {
    // TODO: unhardcode the connection url
    // TODO: handle connection loose
    mongoose.set('debug', true);
    connection = await mongoose.createConnection(url, {
      useNewUrlParser: true
    });

    // Load all models dynamically from the models object
    const modelNames = Object.keys(_models);
    modelNames.forEach(
      modelName => (models[modelName] = connection.model(modelName, _models[modelName]))
    );
  }

  return { connection, models };
}

module.exports = { makeMongoConnection, makeRedisConnection };
