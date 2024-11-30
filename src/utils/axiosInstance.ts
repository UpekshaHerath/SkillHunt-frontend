// src/utils/axiosInstance.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Replace with your backend URL
});

// Add token to headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Store JWT in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
