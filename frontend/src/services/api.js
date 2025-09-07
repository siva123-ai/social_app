import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust this to your backend URL

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('auth'))?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
