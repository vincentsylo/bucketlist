const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
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

    bcrypt.compare(password, user.hash, (err, res) => {
      if (!res) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }));
};
