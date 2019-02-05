const { makeMongoConnection, makeRedisConnection } = require('./connections');

/**
 * Generates the context callback for the app,
 * it's called each time that server gets a valid request
 *
 * @param {*} models
 */
const makeContext = mongooseModels => async ({ req }) => {
  const [redis, mongo] = await Promise.all([
    makeRedisConnection(),
    makeMongoConnection(mongooseModels)
  ]);
  const { connection, models } = mongo;
  return {
    redis,
    mongo: connection,
    models,
    user : req.user
  };
};

module.exports = { makeContext };
