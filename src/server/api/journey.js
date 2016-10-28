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
      include: [{ model: models.Leg, as: 'legs' }],
    }).catch(() => res.sendStatus(400));

    return res.json(journey);
  });

  /**
   * Create journey
   */
  server.post('/api/journey/create', jwtMiddleware, async (req, res) => {
    const { name, place, departureDate } = req.body;

    const newPlace = await placeCtrl.findOrCreate(place);

    const originCity = place.terms ? place.terms[0].value : '';
    const originState = place.terms ? place.terms[1].value : '';
    const originCountry = place.terms ? place.terms[2].value : '';

    const journey = await models.Journey.create({
      name,
      originCountry,
      originState,
      originCity,
      departureDate,
      userId: req.user.dataValues.id,
    }).catch(() => res.sendStatus(400));

    return res.json(journey);
  });
};
