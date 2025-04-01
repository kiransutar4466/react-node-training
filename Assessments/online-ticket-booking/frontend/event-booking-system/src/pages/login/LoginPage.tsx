import { useNavigate } from "react-router-dom"
import { loginInputs } from "../../constant/login_register_inputs"
import { useState } from "react"
import {  loginTypes } from "../../types/types"
import { useDispatch } from "react-redux"
import { logInUser } from "./authSaga"
import loginBackGround from '../../assets/loginBackGround.png'

import { validateLoginData } from "../../utils/formValidation"


const LoginPage = () => {
    const navigate=useNavigate()

    const dispatch=useDispatch()
    const [loginData,setLoginData]=useState<loginTypes>({
        email:'',
        password:'',
       
    })
    const handleChange=(e:any)=>{
      const {name,value}=e.target
      setLoginData({...loginData,[name]:value})
    }

    const handleSubmit=(e:any)=>{
      e.preventDefault()
      if(!validateLoginData(loginData))
      {
        return
      }
      const payload={
        data:loginData,
        navigate:navigate
      }
      dispatch(logInUser(payload))

    }

  return (
    <div className="h-[100vh] w-[100%]  flex justify-center  items-center" style={{background:`url(${loginBackGround})`}}>
               
        <div className="login-form h-100  w-[400px] bg-[#2b2727d4] p-8">
              <h1 className="text-center text-white text-2xl font-bold ">Login</h1>
            <form action="" className="mt-6" onSubmit={handleSubmit}>
              {loginInputs.map((items,index)=>(
                <div key={index}  className="mt-2">
                   <label  htmlFor="" className="text-white">{items.label}</label><br />
                   <input className="mt-2"  name={items.name} type={items.type} placeholder={items.placeholder}  onChange={handleChange} /><br />
                </div>
             
              ))}
            <button className="w-[100%] text-[18px] p-2 bg-red-500 text-white mt-8 cursor-pointer">Login</button>
            </form>
    
        </div>    
    </div>
  )
}

export default LoginPage