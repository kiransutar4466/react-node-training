import axios from "axios";
import { createVendorPayloadType, fetchVendorsPayloadType } from "../types/slice-state-types/vendorStateTypes";

export const postVendorService = async (payload: createVendorPayloadType) => {
  const token = localStorage.getItem("token");
   
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}vendors?`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  
    return response;
  } catch (error: any) {
    
    console.log(error);

    return error.response.data.message[0];
  }
};


export const getAllVendorsService = async(payload:fetchVendorsPayloadType)=>{

  const token = localStorage.getItem('token')
   
  try {
    console.log("serives called")

      const response = await axios.get( `${import.meta.env.VITE_SERVER_BASE_URL}vendors?page=${payload.page}&perPage=${payload.perPage}&search=${payload.searchQuery}`, { 
          headers: {"Authorization" : `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
          }
      })

  
      return response;

  } catch (error:any) {

      return error.response.data.message[0];
      
  }
}




export const getVendorByIdService = async(payload:string)=>{

  const token = localStorage.getItem('token')

   
  try {

      const response = await axios.get( `${import.meta.env.VITE_SERVER_BASE_URL}vendors/${payload}`, { 
          headers: {"Authorization" : `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
          }
      })

      return response;

  } catch (error:any) {

      return error.response.data.message[0];
      
  }
}



export const patchVendorService = async(payload:{id:string, formData:createVendorPayloadType})=>{

  const token = localStorage.getItem('token')
   
  try {


      const response = await axios.patch( `${import.meta.env.VITE_SERVER_BASE_URL}vendors/${payload.id}`, payload.formData ,{ 
          headers: {"Authorization" : `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
          }
      })

      return response;

  } catch (error:any) {

      return error.response.data.message[0];
      
  }
}


export const deleteVendorByIdService = async(payload:string)=>{

  const token = localStorage.getItem('token')


  try {

      const response = await axios.delete( `${import.meta.env.VITE_SERVER_BASE_URL}vendors/${payload}`, { 
          headers: {"Authorization" : `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
          }
      })

      return response;

  } catch (error:any) {

      return error.response.data.message[0];
      
  }
}