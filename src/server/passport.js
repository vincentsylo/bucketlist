const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs-then');
const models = require('./models');

module.exports = (server) => {
  server.use(passport.initialize());

  passport.use(new LocalStrategy({
    usernameField: 'email',
  }, async (email, password, done) => {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'Invalid email.' });
    }

    const result = bcrypt.compare(password, user.hash);
    if (!result) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }));
};
