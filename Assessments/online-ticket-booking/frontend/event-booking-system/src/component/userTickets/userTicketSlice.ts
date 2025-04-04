import { createSlice } from "@reduxjs/toolkit";



interface UserTickets {
    userTicketloading:boolean
    ticketData:[],
    ticketError:null

}

const initialState: UserTickets = {
    userTicketloading:false,
    ticketData:[],
    ticketError:null

};

const userTicketSlice = createSlice({
  name: "userTickets",
  initialState,
  reducers: {
    startTicketLoading: (state) => {
            state.userTicketloading=true
    },
    setTicketsSuccess: (state, action:any) => {
       state.userTicketloading=false
       state.ticketData=action.payload
    },
    setTicketError: (state, action:any) => {
      state.userTicketloading=false
      state.ticketError=action.payload
    },
 
  },
});

export const { startTicketLoading, setTicketsSuccess, setTicketError } = userTicketSlice.actions;
export default userTicketSlice.reducer;
