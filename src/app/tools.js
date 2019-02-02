const { gql } = require('apollo-server-express');
const { makeMongoConnection, makeRedisConnection } = require('./connections');
const merge = require('lodash/merge');

/**
 * Root query Object
 */
const rootTypeDef = gql`
  type Query {
    ping: String
  }

  type Mutation {
    pong(message: String): String
  }
`;

/**
 * Build the basic structure for an Apollo Server app
 *
 *
 * @param {*} modules
 */
const makeModulesStructure = modules =>
  Object.keys(modules).reduce(
    (app, moduleName) => ({
      typeDefs : [...app.typeDefs, modules[moduleName].typeDefs],
      resolvers: merge({}, app.resolvers, modules[moduleName].resolvers), // Resolvers should be deep merged
      models   : { ...app.models, [moduleName]: modules[moduleName].model }
    }),
    {
      typeDefs : [rootTypeDef],
      resolvers: {},
      models   : {}
    }
  );

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

module.exports = { makeContext, makeModulesStructure };
