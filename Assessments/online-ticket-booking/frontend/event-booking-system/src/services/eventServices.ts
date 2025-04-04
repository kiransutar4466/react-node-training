import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const createEventApi = async (payload: any) => {


    console.log("eveny data",payload)
  try {
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.post(`${BASE_URL}/api/events`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,

      },
    });

    return {response};
  } catch (error: any) {
    throw error.response?.data?.message || "Something went wrong";
  }
};

export const getEventDetailsApi = async (id: any) => {
 
  const token = localStorage.getItem("token");

  try {



    const response = await axios.get(`${BASE_URL}/api/events/${id}`,
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

export const deleteEventApi = async (id: number) => {
  const token = localStorage.getItem("token");
  try{
    const response = await axios.delete(`${BASE_URL}/api/events/${id}` ,{
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return { response }
  }catch(error:any){
    
  }

};






// export const getAllEventsApi = async (payloay:any) => {
//   const token = localStorage.getItem("token");

//   try {
//     const response = await axios.get(`${BASE_URL}/api/events/?eventName=${payloay}&eventCategory=${payloay}&eventStartDate=${payloay}&eventEndDate=${payloay}`, {
//       headers: {
    
//         Authorization: `Bearer ${token}`,
//         "ngrok-skip-browser-warning": "69420"
//       },
//     });

   

//     return {response}
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || "Something went wrong");
//   }
// };




export const getAllEventsApi = async (payload: any) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${BASE_URL}/api/events/?eventName=${payload.eventName}&eventCategory=${payload.eventCategory}&eventStartDate=${payload.eventStartDate}&eventEndDate=${payload.eventStartDate}&limit=${12}&page=${payload.nextPage}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    return {response};
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};


export const updateEventApi =async (payload: any)=>{
  console.log("payload",payload)
  try {
    const token = localStorage.getItem("token");
 

    const response = await axios.patch(`${BASE_URL}/api/events/${payload.id}`, payload.data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    return response;
  } catch (error: any) {
    throw error.response?.data?.message || "Something went wrong";
  }
}

