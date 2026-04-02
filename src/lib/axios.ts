import axios, { AxiosInstance } from "axios";
import { navigateTo } from "@/utils/navigateTo";

/*
-------------------------------------------------------------------------
| Token Storage Key
-------------------------------------------------------------------------
*/
const TOKEN_KEY = "jwt_token";



export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};


export const setStoredToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};


export const clearStoredToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};


export const logout = (): void => {
  clearStoredToken();
  navigateTo("/login");
};


const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);


export default api;