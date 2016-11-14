import jwtMiddleware from '../middleware/jwt';
import { placeCtrl } from '../controllers';
import models from '../models';

module.exports = (server) => {
  /**
   * Create leg
   */
  server.post('/api/leg/create', jwtMiddleware, async (req, res) => {
    const { journeyId, place, date } = req.body;

    const journey = await models.Journey.findOne({ where: { userId: req.user.id, id: journeyId } });

    if (journey) {
      const newPlace = await placeCtrl.findOrCreate(place);

      const leg = await journey.createLeg({
        date,
        isOrigin: false,
      });

      await leg.setPlace(newPlace);

      return res.json(leg);
    }

    return res.sendStatus(500);
  });

  /**
   * Delete leg
   */
  server.post('/api/leg/remove', jwtMiddleware, async (req, res) => {
    const { journeyId, legId } = req.body;

    const journey = await models.Journey.findOne({ where: { userId: req.user.id, id: journeyId } });

    if (journey) {
      const success = await models.Leg.delete({ where: { id: legId, journeyId }});

      console.log(success);
      return res.send(success);
    }

    return res.sendStatus(500);
  });
};
