import passport from 'passport';
import jwt from 'jwt-simple';
import moment from 'moment';
import jwtMiddleware from '../middleware/jwt';

const authRouter = (server) => {
  /**
   * Login
   */
  server.post('/api/auth/login', (req, res) => {
    passport.authenticate('local', (err, user) => {
      if (err) { return res.sendStatus(400); }
      if (!user) {
        return res.sendStatus(403);
      }

      let expires = moment().add(12, 'hours').toDate();
      if (req.body.rememberMe) {
        expires = moment().add(7, 'days').toDate();
      }

      const token = jwt.encode({
        id: user.id,
        expires,
      }, process.env.JWT_SECRET);

      res.cookie('access_token', token, { expires });
      return res.json({ token });
    })(req, res);
  });

  /**
   * Validate current user
   */
  server.post('/api/auth/validate', jwtMiddleware, (req, res) => res.json({ validated: true }));
};

module.exports = authRouter;
