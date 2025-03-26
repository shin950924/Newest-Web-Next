// services/apiClient.ts
import { store } from '@/redux/store/store';
import axios, { AxiosInstance } from 'axios';
import { RootState } from '../../../types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.shin1995seoul.com:9443';
export const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || 'https://www.shin1995seoul.com:8080/';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState() as RootState;
    const token = state.user?.access_token;
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const createApiClient = (token?: string): AxiosInstance => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  client.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.token = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return client;
};

export default apiClient;