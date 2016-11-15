import bcrypt from 'bcryptjs';
import models from '../models';

module.exports = (server) => {
  /**
   * Signup
   */
  server.post('/api/user/signup', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      res.sendStatus(400);
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        const user = await models.User.create({ email, hash });
        if (user) {
          return res.sendStatus(200);
        }
      });
    }
  });
};
