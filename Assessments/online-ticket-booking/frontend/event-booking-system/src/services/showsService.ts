import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const fetchShowByID = async (payload: any) => {
 
    const token = localStorage.getItem("token");
   
    try {
  
  
  
      const response = await axios.get(`${BASE_URL}/shows/?eventId=${payload.eventId}&eventShowDate=${payload.eventShowDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
  
      return {response};
    } catch (error: any) {
      throw error.response?.data?.message || "Something went wrong";
    }
  }

  export const getSeatsApi=async(payload:any)=>{
    try{
      
    }catch(error){

    }
  }