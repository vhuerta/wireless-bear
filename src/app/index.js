const { makeContext, makeModulesStructure } = require('./tools.js');

const modules = {
  Patient: require('./modules/patients'),
  User   : require('./modules/users')
};

const { typeDefs, resolvers, models } = makeModulesStructure(modules);
const app = {
  typeDefs,
  resolvers,
  cors       : true,
  context    : makeContext(models),
  formatError: error => {
    const { extensions, message } = error;
    delete extensions.exception.stacktrace;
    return { ...extensions.exception, message };
  }
};

module.exports = app;
