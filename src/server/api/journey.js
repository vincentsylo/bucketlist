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
    }).catch(() => res.sendStatus(400));

    return res.json(journeys);
  });

  /**
   * Get specific journey
   */
  server.get('/api/journey/:journeyId', async (req, res) => {
    const journey = await models.Journey.findOne({
      where: { id: req.params.journeyId },
      include: [{ model: models.Leg, as: 'legs' }],
    }).catch(() => res.sendStatus(400));

    return res.json(journey);
  });

  /**
   * Create journey
   */
  server.post('/api/journey/create', jwtMiddleware, async (req, res) => {
    const { name } = req.body;
    const journey = await models.Journey.create({
      name,
      userId: req.user.dataValues.id
    }).catch(() => res.sendStatus(400));

    return res.json(journey);
  });
};

module.exports = journeyRouter;
