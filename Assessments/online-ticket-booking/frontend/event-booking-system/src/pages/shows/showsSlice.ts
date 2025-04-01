import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Show {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

interface ShowsState {
    loading:boolean
  shows: Show[];
  isSeatLoading:boolean;
  seats:[]
}

const initialState: ShowsState = {
    loading:false,
  shows: [],
  isSeatLoading:false,
  seats:[]
};

const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    startShowsLoading: (state) => {
            state.loading=true
    },
    showSuccess: (state, action:any) => {
        state.loading=false,
        state.shows=action.payload
    },
    showError: (state, action:any) => {
      state.loading=false
    },
    startSeatLoading:(state)=>{
      state.isSeatLoading=true
    },
    setFetchSeatSuccess:(state,action:any)=>{
        state.isSeatLoading=false
        state.seats=action.payload
    },setFetchError:(state,action:any)=>{
      state.isSeatLoading=false
      
    }
  },
});

export const { startShowsLoading, showSuccess, showError ,setFetchError,setFetchSeatSuccess,startSeatLoading} = showsSlice.actions;
export default showsSlice.reducer;
