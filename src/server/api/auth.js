import passport from 'passport';
import jwt from 'jwt-simple';
import moment from 'moment';

const authRouter = (server) => {
  /**
   * Login
   */
  server.post('/api/auth/login', (req, res) => {
    passport.authenticate('local', (err, user) => {
      if (err) { return res.sendStatus(400); }
      if (!user) {
        return res.sendStatus(401);
      }

      const expires = moment().add(7, 'days').valueOf();
      const token = jwt.encode({
        id: user.id,
        expires,
      }, process.env.JWT_SECRET);

      res.cookie('access_token', token);
      return res.json({ token, expires, user });
    })(req, res);
  });

  /**
   * Logout
   */
  server.post('/api/auth/logout',
    (req, res) => {
      req.logout();
      res.redirect('/');
    }
  );
};

module.exports = authRouter;