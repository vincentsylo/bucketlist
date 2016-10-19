import _ from 'lodash';
import { api } from '../../utils';
import models from '../models';

export default {
  findOrCreate: async function(name, country) {
    const existingState = await models.State.findOne({ where: { name }});

    if (!existingState) {
      let latitude, longitude;

      const geocode = await api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}+${country.name}&key=${process.env.GOOGLE_MAP_KEY}`);
      if (geocode) {
        const location = _.get(geocode, 'results[0].geometry.location');
        if (location) {
          latitude = location.lat;
          longitude = location.lng;
        }
      }

      const state = await models.State.create({ name, latitude, longitude, countryId: country.id });
      return state;
    }

    return existingState;
  },
};
