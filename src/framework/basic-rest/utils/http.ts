import axios from 'axios';
import { getToken } from './get-token';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    let authToken = '';
    const token = sessionStorage.getItem('token');
    if (token) {
      const parsedToken = JSON.parse(token);
      if (parsedToken.expires_in > Date.now()) {
        authToken = parsedToken.value;
      }
    }
    // const token = getToken();
    // config.headers.Authorization = {
    //   ...config.headers,
    //   Authorization: `Bearer ${token ? token : ''}`,
    // };
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
