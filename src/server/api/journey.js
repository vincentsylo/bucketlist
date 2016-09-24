import jwtMiddleware from '../middleware/jwt';
import models from '../models';

const journeyRouter = (server) => {
  /**
   * Get users journeys
   */
  server.get('/api/journey/list', jwtMiddleware, (req, res) => {
    models.Journey.findAll({
      where: { userId: req.user.dataValues.id },
      include: [{ model: models.Leg, as: 'legs' }],
    }).then((journeys) => {
      return res.json(journeys);
    });
  });

  /**
   * Create journey
   */
  server.post('/api/journey/create', jwtMiddleware, (req, res) => {
    const { name } = req.body;
    models.Journey.create({ name, userId: req.user.dataValues.id })
      .then((journey) => {
        return res.json(journey);
      });
  });
};

module.exports = journeyRouter;