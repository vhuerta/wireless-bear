/**
 * Passport middleware for email and password authentication
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { makeRedisConnection } = require('../app/connections');
const { makeGetUserByToken } = require('../app/modules/users/users.methods');

const config = require('../config');

module.exports = async () => {
  const redis = await makeRedisConnection();
  // Authentication with JWT
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest   : ExtractJwt.fromHeader(config.jwt.header),
        secretOrKey      : config.jwt.key,
        passReqToCallback: true,
        session          : false
      },
      async function verifyToken(req, payload, done) {
        const token = req.header('x-auth-token');
        const getUserByToken = makeGetUserByToken(redis);
        const user = await getUserByToken(payload.id, token);
        done(null, user);
      }
    )
  );

  return passport.initialize();
};
