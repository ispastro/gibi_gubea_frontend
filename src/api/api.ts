// src/api/api.ts
import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  withCredentials: true,  // for cookies / sessions
  headers: {
    'Content-Type': 'application/json',
    

  },
});

export const getRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const postRequest = async <T, D = any>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

export const putRequest = async <T, D = any>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.put<T>(url, data, config);
  return response.data;
};

export const deleteRequest = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.delete<T>(url, config);
  return response.data;
};
