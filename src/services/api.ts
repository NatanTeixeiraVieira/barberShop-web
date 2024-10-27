import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const cepApi = axios.create({
  baseURL: import.meta.env.VITE_CEP_API_BASE_URL,
});
