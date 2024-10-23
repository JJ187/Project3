


import axios from 'axios';

const API_BASE_URL = 'https://server-1-t93s.onrender.com';

export const signUp = (userData: { firstName: string, lastName: string, email: string, password: string }) => {
  return axios.post(`${API_BASE_URL}/api/user/signup`, userData);
};

export const login = (credentials: { email: string, password: string }) => {
  return axios.post(`${API_BASE_URL}/api/user/login`, credentials);
};


