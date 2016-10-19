import _ from 'lodash';
import { api } from '../../utils';
import models from '../models';

export default {
  findOrCreate: async function(name) {
    const existingCountry = await models.Country.findOne({ where: { name }});

    if (!existingCountry) {
      let latitude, longitude;

      const geocode = await api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${process.env.GOOGLE_MAP_KEY}`);
      if (geocode) {
        const location = _.get(geocode, 'results[0].geometry.location');
        if (location) {
          latitude = location.lat;
          longitude = location.lng;
        }
      }

      const country = await models.Country.create({ name, latitude, longitude });
      return country;
    }

    return existingCountry;
  },
};
