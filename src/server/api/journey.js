import jwtMiddleware from '../middleware/jwt';
import { countryCtrl, stateCtrl } from '../controllers';
import models from '../models';

module.exports = (server) => {
  /**
   * Get users journeys
   */
  server.get('/api/journey/list', jwtMiddleware, async (req, res) => {
    const journeys = await models.Journey.findAll({
      where: { userId: req.user.dataValues.id },
      include: [{ model: models.Leg, as: 'legs' }],
    }).catch((e) => {
      console.log(e);
      return res.sendStatus(400);
    });

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
    const { name, originCountry, originState, departureDate } = req.body;

    const country = await countryCtrl.findOrCreate(originCountry);
    const state = await stateCtrl.findOrCreate(originState, country);

    const journey = await models.Journey.create({
      name,
      originCountry,
      originState,
      departureDate,
      userId: req.user.dataValues.id,
    }).catch(() => res.sendStatus(400));

    return res.json(journey);
  });
};
