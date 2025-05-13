import axios from 'axios';

const api = axios.create({
  // baseURL: `${process.env.BACKEND_URL}/api/`,
  baseURL: 'https://blissful-amazement-production.up.railway.app/api/',
});

export default api;
