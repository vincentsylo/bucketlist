import bcrypt from 'bcryptjs-then';
import models from '../models';

module.exports = (server) => {
  /**
   * Signup
   */
  server.post('/api/user/signup', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      return res.sendStatus(400);
    }

    const hash = await bcrypt.hash(password, 10);
    if (hash) {
      const user = await models.User.create({ email, hash });
      if (user) {
        return res.sendStatus(200);
      }
    }
    return res.sendStatus(400);
  });
};
