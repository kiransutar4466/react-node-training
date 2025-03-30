import axios from "axios";
const baseURL =
  "https://fbe3-2409-40c2-8017-27d8-d23b-1b7e-99c-e145.ngrok-free.app/api";
export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});
