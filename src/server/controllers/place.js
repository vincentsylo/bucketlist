import _ from 'lodash';
import { api } from '../../utils';
import models from '../models';

export default {
  findOrCreate: async (place) => {
    const existingPlace = await models.Place.findOne({ where: { placeId: place.place_id } });

    if (!existingPlace) {
      const details = await api.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${process.env.GOOGLE_MAP_KEY}`);
      const result = details.result;

      const location = _.get(result, 'geometry.location');
      const latitude = location.lat;
      const longitude = location.lng;

      const name = place.terms ? _.initial(place.terms).map(term => term.value).join(' ') : '';
      const country = place.terms ? _.last(place.terms).value : '';

      const newPlace = await models.Place.create({
        name,
        placeId: place.place_id,
        latitude,
        longitude,
        country,
        photos: result.photos,
      });
      return newPlace;
    }

    return existingPlace;
  },
};
