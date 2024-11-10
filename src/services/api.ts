import { getAuth } from '@/utils/auth';
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const auth = getAuth();
    console.log('🚀 ~ auth:', auth);
    if (auth) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const cepApi = axios.create({
  baseURL: import.meta.env.VITE_CEP_API_BASE_URL,
});
