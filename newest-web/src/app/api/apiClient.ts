import axios, { AxiosInstance } from 'axios';

// const BASE_URL = 'http://192.168.0.21:8000';
const BASE_URL = 'https://www.shin1995seoul.com:9443';
export const MEDIA_BASE_URL = "https://www.shin1995seoul.com:8080/"

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 타임아웃 설정(필요 시)
  headers: {
    'Content-Type': 'application/json',
  },
});


export default apiClient;