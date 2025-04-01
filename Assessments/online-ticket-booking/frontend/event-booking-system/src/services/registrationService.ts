import axios from "axios"
import { BASE_URL } from "./baseUrl"
import { RegistrationType } from "../types/types"

export const registrationService=async(payload:RegistrationType)=>{
    try{
        console.log('payload',payload)
        const response =await axios.post(`${BASE_URL}/api/auth/signup`,payload)
        return {response}
    }catch(error:any){
        throw error.response?.data?.message || "Something went wrong. Please try again.";
    }
}