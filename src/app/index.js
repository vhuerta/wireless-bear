const { makeContext } = require('./tools.js');
const { typeDefs, resolvers, models } = require('./modules').modules;

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
