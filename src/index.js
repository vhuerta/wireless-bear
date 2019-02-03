'use strict';

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');

const logger = require('./logger');
const app = require('./app');
const config = require('./config').webserver;

const passport = require('./middlewares/passport');
const jwt = require('./middlewares/jwt');

const server = new ApolloServer(app);

const path = '/graphql';
const expressApp = express();

passport().then(pass => expressApp.use(pass));
expressApp.use(cors());
expressApp.use(jwt);

server.applyMiddleware({ app: expressApp, path });

expressApp.listen({ port: config.port }, () =>
  logger.info(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
);
