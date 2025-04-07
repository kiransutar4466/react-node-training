import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { lowStocksTypes } from "../../types/slice-state-types/lowStocksTypes";

const initialState: lowStocksTypes = {
  isLoading: false,
  error: null,
  lowStocks: null,
  details: null,
  isSuccess: false,
};
const lowStocksSlice = createSlice({
  name: "lowStocksSlice",
  initialState,

  reducers: {
    startLowStocksApiRequest: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.error = null;
    },

    successFetchAllLowStocks: (state, action) => {
      const { data, page, next, totalPages, prev } = action.payload;
      state.lowStocks = data;
      state.details = { page, next, totalPages, prev };
      state.isLoading = false;
      state.isSuccess = true;
    },

    failLowStocksApiRequest: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(state.error);
    },
  },
});

export default lowStocksSlice.reducer;
export const {
  startLowStocksApiRequest,
  successFetchAllLowStocks,
  failLowStocksApiRequest,
} = lowStocksSlice.actions;
