import _ from 'lodash';
import { api } from '../../utils';
import models from '../models';

export default {
  findOrCreate: async function(place) {
    const existingPlace = await models.Place.findOne({ where: { placeId: place.place_id }});

    if (!existingPlace) {
      const details = await api.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${process.env.GOOGLE_MAP_KEY}`);
      const result = details.result;

      const location = _.get(result, 'geometry.location');
      const latitude = location.lat;
      const longitude = location.lng;

      const city = place.terms ? place.terms[0].value : '';
      const state = place.terms ? place.terms[1].value : '';
      const country = place.terms ? place.terms[2].value : '';

      const newPlace = await models.Place.create({
        name: place.description,
        placeId: place.place_id,
        latitude,
        longitude,
        city,
        state,
        country,
        photos: result.photos
      });
      return newPlace;
    }

    return existingPlace;
  },
};
