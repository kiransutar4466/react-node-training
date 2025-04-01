import {createSlice} from '@reduxjs/toolkit'

const registerSlice=createSlice({
    name:"register",
    initialState:{
        loading:false,
        registerData:{},
        error:null
    },
    reducers:{
        startResisterloading:(state)=>{
                state.loading=true
        },
        setLoaginSuccess:(state,action)=>{
            state.loading=false
            state.registerData=action.payload
        },
        setRegisterFailed:(state,action)=>{
                state.loading=false
                state.error=action.payload
        }

    }
})

export const {startResisterloading,setRegisterFailed,setLoaginSuccess} =registerSlice.actions
export default registerSlice.reducer
