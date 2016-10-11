import jwtMiddleware from '../middleware/jwt';
import models from '../models';

const legRouter = (server) => {
  /**
   * Create leg
   */
  server.post('/api/leg/create', jwtMiddleware, async (req, res) => {
    const { journeyId, destinationCountry, destinationState, arrivalDate } = req.body;
    const leg = await models.Leg.create({
      userId: req.user.dataValues.id,
      journeyId,
      destinationCountry,
      destinationState,
      arrivalDate,
    });

    return res.json(leg);
  });
};

module.exports = legRouter;
