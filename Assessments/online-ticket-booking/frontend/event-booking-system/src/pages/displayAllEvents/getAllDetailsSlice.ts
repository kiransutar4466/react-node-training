import { createSlice } from "@reduxjs/toolkit";

const getAllDetailsSlice = createSlice({
  name: "getAllEvents",
  initialState: {
    loading: false,
    data: [],
    error: "",
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    setGetAllEventsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    setGetAllEventsError: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    },
  },
});

export const { startLoading, setGetAllEventsSuccess, setGetAllEventsError } =
  getAllDetailsSlice.actions;

export default getAllDetailsSlice.reducer;
