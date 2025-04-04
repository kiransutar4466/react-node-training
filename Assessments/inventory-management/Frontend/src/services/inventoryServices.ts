import axios from "axios"


export const getAllInventoryService = async(payload:{page:number, perPage:number, search:string})=>{

    const token = localStorage.getItem('token')
     
    try {
        
        const response = await axios.get( `${import.meta.env.VITE_SERVER_BASE_URL}inventory?page=${payload.page}&perPage=${payload.perPage}&search=${payload.search}`, { 
            headers: {"Authorization" : `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
            }
        })
        
       
        return response;

    } catch (error:any) {

        return error.response.data.message[0];
        
    }
}

export const getInventoryByIdService = async(payload:string)=>{

    const token = localStorage.getItem('token')
     
    try {
        
        const response = await axios.get( `${import.meta.env.VITE_SERVER_BASE_URL}inventory/${payload}`, { 
            headers: {"Authorization" : `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
            }
        })
        
       
        return response;

    } catch (error:any) {

        return error.response.data.message[0];
        
    }
}


export const putInventoryByIdService = async(payload:{id:string, formData:{}})=>{

    const token = localStorage.getItem('token')
     
    try {
        
        const response = await axios.patch( `${import.meta.env.VITE_SERVER_BASE_URL}inventory/${payload.id}` , payload.formData, { 
            headers: {"Authorization" : `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
            }
        })
        
       
        return response;

    } catch (error:any) {

        return error.response.data.message[0];
        
    }
}