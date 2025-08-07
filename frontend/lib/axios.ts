// lib/axios.ts
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true, // for cookie-based auth if needed
});

API.interceptors.request.use((config:any) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
