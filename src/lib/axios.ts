import axios from "axios";
import { BASE_API_URL } from "../config/constants";

const TIMEOUT = 20000;

const httpClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: TIMEOUT, // Response timout
});

httpClient.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response.status === 400 && error.response.data) {
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  },
);

export const setHeaderToken = (accessToken: string | null) => {
  if (!accessToken || !accessToken.length) return;
  httpClient.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
};

export default httpClient;
