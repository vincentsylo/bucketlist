import bcrypt from 'bcrypt';
import models from '../models';

const userRouter = (server) => {
  /**
   * Signup
   */
  server.post('/api/user/signup', (req, res) => {
    const { email, password } = req.body;

    models.User.findOne({ where: { email } })
      .then((existingUser) => {
        if (existingUser) {
          return res.sendStatus(400);
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            models.User.create({ email, hash })
              .then(() => {
                return res.sendStatus(200);
              });
          });
        }
      });
    }
  );
};

module.exports = userRouter;