import axios from 'axios';

const backendUrl = $BACKEND_URL;

const api = axios.create({
  baseURL: `${backendUrl}/api/`,
  withCredentials: true,
});

export default api;
