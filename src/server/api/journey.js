import jwtMiddleware from '../middleware/jwt';
import { placeCtrl } from '../controllers';
import models from '../models';

module.exports = (server) => {
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
      include: [{
        model: models.Leg,
        as: 'legs',
        include: [{ model: models.Place, as: 'place' }],
      }],
    }).catch(() => res.sendStatus(400));

    return res.json(journey);
  });

  /**
   * Create journey
   */
  server.post('/api/journey/create', jwtMiddleware, async (req, res) => {
    const { name, place, departureDate } = req.body;

    const newPlace = await placeCtrl.findOrCreate(place);

    const journey = await models.Journey.create({
      name,
      userId: req.user.dataValues.id,
    }).catch(() => res.sendStatus(400));

    const leg = await journey.createLeg({
      date: departureDate,
      isOrigin: true,
    });

    await leg.setPlace(newPlace);

    return res.json(journey);
  });
};
