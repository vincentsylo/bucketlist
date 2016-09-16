import createAxios from 'axios';

function initializeAxios() {
  const axios = createAxios.create();

  axios.defaults.baseURL = '/api';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return axios;
}

const axios = initializeAxios();

export default {
  async get(url, params) {
    const response = await axios.get(url, { params });
    return response.data;
  },

  async post(url, params) {
    const response = await axios.post(url, params);
    return response.data;
  },
};