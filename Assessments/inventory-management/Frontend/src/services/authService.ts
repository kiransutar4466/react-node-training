import axios from "axios";
import { loginFormType } from "../types/slice-state-types/authStateTypes";

export const authService = async (payload: loginFormType) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}auth/login`,
      payload,
    );

    return { data: response.data };
  } catch (error: any) {
    return { error: error.response.data.message };
  }
};
