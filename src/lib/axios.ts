import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://giftly-server-side.vercel.app/api/v1',
  withCredentials: true,
});
