// src/api/api.ts
import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

const handleRequestError = (error: any) => {
  if (error.response) {
    throw new Error(error.response.data?.message || 'Request failed');
  } else if (error.request) {
    throw new Error('Network error - no response received');
  } else {
    throw new Error('Request setup error');
  }
};

export const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.get<T>(url, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export const postRequest = async <T, D = any>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export const putRequest = async <T, D = any>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

export const deleteRequest = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.delete<T>(url, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};