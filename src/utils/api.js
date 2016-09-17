import createAxios from 'axios';
import _ from 'lodash';
import reactCookie from 'react-cookie';
import isClient from '../utils/isClient';

function plugCookies(axios) {
  if (!isClient()) {
    const cookies = reactCookie.select();
    const cookiesString = _.keys(cookies).map(k => `${k}=${cookies[k]}`).join('; ');
    if (cookiesString) {
      axios.defaults.headers.common['Cookie'] = cookiesString;
    }
  }
  return axios;
}

function initializeAxios() {
  const axios = createAxios.create();

  axios.defaults.baseURL = isClient() ? '/api' : process.env.API_URL;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return axios;
}

const createApi = initializeAxios();

export default {
  async get(url) {
    const api = plugCookies(createApi);
    const response = await api.get(url);
    return response.data;
  },

  async post(url, params) {
    const api = plugCookies(createApi);
    const response = await api.post(url, params);
    return response.data;
  },
};