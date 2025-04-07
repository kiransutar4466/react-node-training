import axios from "axios"
import { BASE_URL } from "./baseUrl";

export const postReviewApi=async(payload:any)=>{
     
    const token = localStorage.getItem("token");
    try{
        const response=await axios.post(`${BASE_URL}/reviews`,payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          })

        return {response}
    }catch(error:any){
        throw error.response?.data?.message || "Something went wrong";
    }
}

export const getReviewsApi = async (payload: any) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${BASE_URL}/reviews/?eventId=${payload?.eventId}`,
  
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    return { response };
  } catch (error: any) {
    throw error.response?.data?.message || "Something went wrong";
  }
};