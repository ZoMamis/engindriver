// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // envoie le cookie HttpOnly au /refresh
});

let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => (accessToken = t);

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

let isRefreshing = false;
let queue: ((t: string) => void)[] = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          );
          setAccessToken(data.accessToken);
          queue.forEach((cb) => cb(data.accessToken));
          queue = [];
          return api(original);
        } catch (e) {
          setAccessToken(null);
          queue = [];
          // rediriger vers /login si besoin
          return Promise.reject(e);
        } finally {
          isRefreshing = false;
        }
      }

      // Attendre que le refresh se termine
      return new Promise((resolve) => {
        queue.push((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        });
      });
    }
    return Promise.reject(error);
  }
);

export default api;
