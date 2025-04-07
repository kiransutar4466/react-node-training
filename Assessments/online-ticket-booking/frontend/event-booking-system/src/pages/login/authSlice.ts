import { createSlice } from '@reduxjs/toolkit'
import { authTypes } from '../../types/types'



const initialState: authTypes = {
    loading: false,
    userDetails: {},
    error: null,
    token:""
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true
        },
        setLoginSuccess: (state, action) => {
            state.loading = false
            state.token=action?.payload?.data?.token

            state.userDetails = action.payload
        },
        setError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logoutAdmin:(state,action)=>{
            state.error=action.payload
            localStorage.removeItem('token')
            const naviagte=action.payload

            naviagte('/login')
            
        }
    }

})

export const { startLoading, setLoginSuccess, setError,logoutAdmin } = authSlice.actions
export default authSlice.reducer