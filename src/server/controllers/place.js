import _ from 'lodash';
import { api } from '../../utils';
import models from '../models';

export default {
  findOrCreate: async function(place) {
    const existingPlace = await models.Place.findOne({ where: { placeId: place.place_id }});

    if (!existingPlace) {
      let latitude, longitude;

      const foundPlace = await api.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.place_id}&key=${process.env.GOOGLE_MAP_KEY}`);
      const placeResult = foundPlace.result;
      if (placeResult) {
        const location = _.get(placeResult, 'geometry.location');
        if (location) {
          latitude = location.lat;
          longitude = location.lng;
        }
      }

      const newPlace = await models.Place.create({ name, placeId: placeResult.place_id, latitude, longitude, photos: placeResult.photos });
      return newPlace;
    }

    return existingPlace;
  },
};
