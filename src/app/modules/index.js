/**
 * Graphql Modules
 */
const { gql } = require('apollo-server-express');
const merge = require('lodash/merge');

const modules = {
  Patient: require('./patients'),
  User   : require('./users')
};

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
const _makeModulesStructure = modules =>
  Object.keys(modules).reduce(
    (app, moduleName) => ({
      typeDefs : [...app.typeDefs, modules[moduleName].typeDefs],
      resolvers: merge({}, app.resolvers, modules[moduleName].resolvers),
      models   : { ...app.models, [moduleName]: modules[moduleName].model }
    }),
    {
      typeDefs : [rootTypeDef],
      resolvers: {},
      models   : {}
    }
  );

module.exports = {
  _makeModulesStructure,
  modules: _makeModulesStructure(modules)
};
