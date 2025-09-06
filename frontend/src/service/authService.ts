// authService.ts
import api, { setAccessToken } from "../api/api";
import axios from "axios";

export async function login(email: string, password: string) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    { email, password },
    { withCredentials: true } // reçoit le cookie refresh
  );
  setAccessToken(data.accessToken); // stocké en mémoire
}

export async function logout() {
  await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/logout`,
    {},
    { withCredentials: true }
  );
  setAccessToken(null);
}
