import { createSlice } from "@reduxjs/toolkit";
import { currentProductStateType } from "../../types/productsTypes";

const initialState: currentProductStateType = {
  currentProduct: {},
  isLoading: false,
  error: null,
};

const currentProductSlice = createSlice({
  name: "currentProduct",
  initialState,
  reducers: {
    fetchCurrentProductsStart: (state) => {
      state.currentProduct = {};
      state.isLoading = true;
      state.error = null;
      console.log("inside slice fetchCurrentProductsStart");
    },
    fetchCurrentProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.currentProduct = action.payload;
      console.log("inside slice fetchCurrentProductsSuccess");
    },

    fetchCurrentProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("inside slice fetchCurrentProductsFailure");
    },
  },
});

export const {
  fetchCurrentProductsStart,
  fetchCurrentProductsSuccess,
  fetchCurrentProductsFailure,
} = currentProductSlice.actions;
export default currentProductSlice.reducer;
