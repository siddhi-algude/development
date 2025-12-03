// src/api/axiosClient.ts
import axios from "axios";
import { getAuthSession, setAuthSession, clearAuthSession } from "./session";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // important: send cookies (refresh token)
});

// Attach access token to every request
axiosClient.interceptors.request.use((config) => {
  const session = getAuthSession();
  if (session?.accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: ((token: string | null) => void)[] = [];

// Helper to process queued requests when refresh finishes
const processQueue = (token: string | null) => {
  pendingRequests.forEach((cb) => cb(token));
  pendingRequests = [];
};

// Interceptor to handle 401 and try refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and not retrying refresh itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/register")
    ) {
      if (isRefreshing) {
        // Wait until refresh finishes
        return new Promise((resolve, reject) => {
          pendingRequests.push((token) => {
            if (!token) {
              reject(error);
              return;
            }
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axiosClient.post("/auth/refresh");
        const { accessToken, user } = {
          accessToken: refreshResponse.data.tokens.accessToken,
          user: refreshResponse.data.user,
        };

        // Update session storage
        const newSession = { accessToken, user };
        setAuthSession(newSession);

        isRefreshing = false;
        processQueue(accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(null);
        clearAuthSession();
        // Optionally: redirect to login via window.location
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
