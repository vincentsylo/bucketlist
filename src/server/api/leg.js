import jwtMiddleware from '../middleware/jwt';
import models from '../models';

const legRouter = (server) => {
  /**
   * Create leg
   */
  server.post('/api/leg/create', jwtMiddleware, async (req, res) => {
    const { journeyId, country, state, arrivalDate } = req.body;
    const leg = await models.Leg.create({
      userId: req.user.dataValues.id,
      journeyId,
      country,
      state,
      arrivalDate,
    });

    return res.json(leg);
  });
};

module.exports = legRouter;
