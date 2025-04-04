import axios from "axios";
import { BASE_URL } from "./baseUrl";


export const fetchShowByID = async (payload: any) => {
 
    const token = localStorage.getItem("token");
   
    try {
  
      const {eventId,eventShowDate}=payload
      console.log("",eventShowDate)
      if(eventId&&eventShowDate)
      {
       



        const response = await axios.get(`${BASE_URL}/shows/?eventId=${payload.eventId}&eventShowDate=${eventShowDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        return {response};
      }else {
        const response = await axios.get(`${BASE_URL}/shows/?eventId=${payload.eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        return {response};
      }
  
     
  
    
    } catch (error: any) {
      throw error.response?.data?.message || "Something went wrong";
    }
  }

  export const getSeatsApi=async(payload:any)=>{
    const id=payload;
    const token = localStorage.getItem("token");
   
    try{  
        const response=await axios.get(`${BASE_URL}/shows/${id}`,   {
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


  export const seatBookingApi=async(payload:any)=>{
    const  token = localStorage.getItem("token");
    try{
        const response=axios.post(`${BASE_URL}/shows`,payload ,{
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