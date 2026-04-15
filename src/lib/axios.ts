import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth.store";


const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

let isRedirecting = false;


api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = useAuthStore.getState();
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
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRedirecting) {
        isRedirecting = true;
        useAuthStore.getState().clearAuth();

        if (typeof window !== "undefined" && window.location) {
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;