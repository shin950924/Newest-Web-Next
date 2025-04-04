import axios, { AxiosInstance } from 'axios';
import { getSession } from "next-auth/react";

export const BASE_URL = 'https://www.shin1995seoul.com:9443';
export const MEDIA_BASE_URL = "https://www.shin1995seoul.com:8080/";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 타임아웃 설정(필요 시)
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.token = session.accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;