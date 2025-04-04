import { useNavigate } from "react-router-dom"
import { registrationInputs, registrationState } from "../../constant/login_register_inputs"
import { useState } from "react"
import loginBackGround from '../../assets/loginBackGround.png'
import { useDispatch, useSelector } from "react-redux"

import { toast } from "react-toastify"
import { RegistrationType } from "../../types/types"
import { registerUser } from "./registerSaga"
import { registerFormValidation } from "../../utils/formValidation"
import { CircularProgress } from "@mui/material"

const RegistrationPage = () => {
  const [data,setData]=useState<RegistrationType>(registrationState)
  const {loading}=useSelector((state:any)=>state.register)
  const naviagte=useNavigate()
  const dispatch=useDispatch()

  const handleChange=(e:any)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }
  const handleSubmit=(e:any)=>{
    e.preventDefault()
    if(!registerFormValidation(data))
    {
       return 
    }else{
      // const { confirmPassword, ...filteredData } = data;
      const payload={
        data:data,
        navigate:naviagte
      }
      dispatch(registerUser(payload))
    }
  }



  return (
  <div className="h-[100vh] w-[100%] bg-red-500 flex justify-center  items-center" style={{background:`url(${loginBackGround})`}}>
          <div className="login-form  w-[500px]  p-10">
                <h1 className="text-center text-white text-2xl font-bold ">Register</h1>
              <form action="" className="mt-6" onSubmit={handleSubmit}>
                {registrationInputs.map((items,index)=>(
                  <div key={index} className="mt-2">
                  <label htmlFor="" className="text-white">{items.label}</label><br />
                     <input type={items.type} name={items.name} onChange={handleChange} placeholder={items.placeholder}/><br />
                  </div>
               
                ))}
              <button className="w-[100%] p-2 bg-red-500 text-white mt-4 cursor-pointer">{loading?<CircularProgress size="20px" />:"Register"}</button>
              </form>
              <p className="underline cursor-pointer text-[13px] mt-4 text-white" onClick={() => naviagte('/login')}>
  Already have an account? Log in here.
</p>
          </div>    
      </div>
  )
}

export default RegistrationPage