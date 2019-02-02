const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (_, user) => {
    req.user = user;
    return next();
  })(req, res, next);
};
