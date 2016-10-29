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
};
