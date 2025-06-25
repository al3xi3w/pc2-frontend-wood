import axios from 'axios';

const api = axios.create({
  baseURL: 'http://pc2-matricula-alb-2123051620.us-east-1.elb.amazonaws.com/',
});

// Interceptor para añadir la API key a cada petición
api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('apiKey');
  if (apiKey) {
    config.headers['x-api-key'] = apiKey;
  }
  return config;
});

export default api;