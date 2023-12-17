import axios from 'axios';
import { clearLocalStorage } from './localstorage';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://api.digigarson.org/v1',
});

// Add an interceptor to include the token from localStorage in each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      clearLocalStorage();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
