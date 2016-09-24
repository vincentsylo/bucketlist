import jwtMiddleware from '../middleware/jwt';
import models from '../models';

const legRouter = (server) => {
  server.post('/api/leg/create', jwtMiddleware, (req, res) => {
    const { journeyId, country, state } = req.body;
    models.Leg.create({
      userId: req.user.dataValues.id,
      journeyId,
      country,
      state,
    }).then((leg) => {
      return res.json(leg);
    });
  });
};

module.exports = legRouter;