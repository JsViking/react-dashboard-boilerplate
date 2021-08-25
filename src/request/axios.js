/* eslint-disable no-param-reassign */
import axios from 'axios';
import { store } from '../store.js';

console.log('process.env.API_URL', process.env.API_URL);
console.log('process.env.BASE_URL', process.env.BASE_URL);
export const baseURL = process.env.API_URL;
export const baseSiteURL = process.env.BASE_URL;

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    config.headers = {
      Authorization: `Bearer ${auth.access}`,
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data.detail === 'Given token not valid for any token type'
    ) {
      if (!originalRequest.retry) {
        originalRequest.retry = true;
        const access_token = await store.dispatch.auth.refreshAccessToken();
        axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        return axios(originalRequest);
      }
      store.dispatch.auth.logOut();
    }

    if (error.response.status === 401) {
      store.dispatch.auth.logOut();
    }
    return Promise.reject(error);
  }
);

export default axios;
