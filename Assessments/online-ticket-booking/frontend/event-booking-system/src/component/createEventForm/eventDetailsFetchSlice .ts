import { createSlice } from "@reduxjs/toolkit";

interface EventDetailsFetchState {
  isLoading: boolean;
  event: any | null;
  error: string | null;
}

const initialState: EventDetailsFetchState = {
  isLoading: false,
  event: null,
  error: null,
};

const eventDetailsFetchSlice = createSlice({
  name: "eventById",
  initialState,
  reducers: {
    startEventLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setEventDetailsSuccess: (state, action) => {
     
      state.isLoading = false;
      state.event = action.payload;
        

    },
    setEventDetailsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
  },
});

export const { startEventLoading, setEventDetailsSuccess, setEventDetailsError } =
  eventDetailsFetchSlice.actions;
export default eventDetailsFetchSlice.reducer;
