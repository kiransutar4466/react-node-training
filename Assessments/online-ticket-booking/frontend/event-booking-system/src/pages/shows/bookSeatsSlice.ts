import { createSlice } from "@reduxjs/toolkit";



interface BookSeats {
    loading:boolean
    seatsData:[]
  isBookSeatLoading:boolean;
  seatBookingError:null

}

const initialState: BookSeats = {
    loading:false,
    seatsData: [],
    isBookSeatLoading:false,
    seatBookingError:null

};

const bookSeatsSlice = createSlice({
  name: "bookSeats",
  initialState,
  reducers: {
    startSeatBookLoading: (state) => {
            state.isBookSeatLoading=true
    },
    setSeatBookingSuccess: (state, action:any) => {
       state.isBookSeatLoading=false
       state.seatsData=action.payload
    },
    setSeatBookingError: (state, action:any) => {
      state.isBookSeatLoading=false
      state.seatBookingError=action.payload
    },
 
  },
});

export const { startSeatBookLoading, setSeatBookingSuccess, setSeatBookingError } = bookSeatsSlice.actions;
export default bookSeatsSlice.reducer;
