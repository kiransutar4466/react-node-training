import { createSlice } from "@reduxjs/toolkit";

interface EventState {
    events: any[];
    loading: boolean;
    error: string | null;
}

const initialState: EventState = {
    events: [],
    loading: false,
    error: null,
};

const updateEventSlice = createSlice({
    name: "updateEvent",
    initialState,
    reducers: {

        updateEventRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        updateEventSuccess: (state, action: any) => {
      
            state.loading = false;
            state.events = action.payload
        },

        updateEventFailure: (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export const { updateEventRequest, updateEventSuccess, updateEventFailure } =
    updateEventSlice.actions;


export default updateEventSlice.reducer;
