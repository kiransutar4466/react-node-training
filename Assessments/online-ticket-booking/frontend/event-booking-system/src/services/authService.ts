import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { loginTypes } from "../types/types";

export const authApi = async (payload: loginTypes) => {
  try {
  
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, payload);

    return {response}; 
  } catch (error: any) {
 

    throw error.response?.data?.message || "Something went wrong. Please try again.";
  }
};
