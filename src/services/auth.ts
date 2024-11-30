// src/services/auth.js
import { CredentialsType } from '@/types/Credentials';
import API from '../utils/axiosInstance';

export const register = async (userData: unknown) => {
  const response = await API.post('/auth/register', userData);
  console.table(userData);
  return response.data;
};

export const login = async (credentials: CredentialsType) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};
