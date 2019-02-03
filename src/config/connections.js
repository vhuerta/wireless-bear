/**
 * Connection urls
 */
module.exports = {
  mongo: {
    connectionUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/bear'
  },
  redis: {
    connectionUrl: process.env.REDISDB_URI || 'redis://localhost'
  }
} 