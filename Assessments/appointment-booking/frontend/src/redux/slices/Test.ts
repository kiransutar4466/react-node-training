import { createSlice } from "@reduxjs/toolkit";
import { error } from "console";

const testSlice = createSlice({
  name: "test",
  initialState: { data: { name: "Aditya" }, isLoading: false, error: null },
  reducers: {
    getData: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },
    deleteData: (state, action) => {
      state.data = action.payload;
    },
    isloading: (state) => {
      state.isLoading = true;
    },
    getUserErrorAction: (state, action) => {
      (state.data = []), (state.error = { message: "error occured" });
    },
  },
});

export const { getData, getUserErrorAction, isloading } = testSlice.actions;
export default testSlice.reducer;
