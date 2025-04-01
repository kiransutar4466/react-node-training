import { createSlice } from '@reduxjs/toolkit'


const createEventSlice = createSlice({
    name: "createEvent",
    initialState: {
        createEventloading: false,
        message: {},
        error: ''
    },
    reducers: {
        startLaoding: (state) => {
            state.createEventloading = true;

        },
        setCreateEventSuccess: (state, action) => {
            state.createEventloading = false
            state.message = action.payload
        },
        setEventCreatinError: (state) => {
            state.createEventloading = false
            
        }
    }
})

export const { startLaoding, setCreateEventSuccess, setEventCreatinError } = createEventSlice.actions

export default createEventSlice.reducer