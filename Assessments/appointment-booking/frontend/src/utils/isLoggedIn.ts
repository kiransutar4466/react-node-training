import { getCookie } from "./cookies";

export const isLoggedIn = () => {
  return getCookie("authToken");
};
