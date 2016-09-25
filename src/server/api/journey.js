import jwtMiddleware from '../middleware/jwt';
import models from '../models';

const journeyRouter = (server) => {
  /**
   * Get users journeys
   */
  server.get('/api/journey/list', jwtMiddleware, async (req, res) => {
    const journeys = await models.Journey.findAll({
      where: { userId: req.user.dataValues.id },
      include: [{ model: models.Leg, as: 'legs' }],
    });

    return res.json(journeys);
  });

  /**
   * Create journey
   */
  server.post('/api/journey/create', jwtMiddleware, async (req, res) => {
    const { name } = req.body;
    const journey = await models.Journey.create({ name, userId: req.user.dataValues.id });
    return res.json(journey);
  });
};

module.exports = journeyRouter;
