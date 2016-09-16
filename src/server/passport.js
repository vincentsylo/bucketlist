const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('./models');

module.exports = (server) => {
  server.use(passport.initialize());

  passport.use(new LocalStrategy({
      usernameField: 'email',
    },
    (email, password, done) => {
      models.User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Invalid email.' });
          }

          bcrypt.compare(password, user.hash, (err, res) => {
            if (!res) {
              return done(null, false, { message: 'Incorrect password.' });
            } else {
              return done(null, user);
            }
          });
        });
    }
  ));
};