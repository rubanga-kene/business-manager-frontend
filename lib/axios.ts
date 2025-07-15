// lib/axios.ts
import axios from 'axios';

const API = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  baseURL:  'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // if you're using session auth or need cookies
});

// Optional: attach auth token if you have one
// API.interceptors.request.use(
//   (config) => {
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Global error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error (optional: send to error service)
    console.error('API Error:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      // Redirect to login page or refresh token logic here
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
