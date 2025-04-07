import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { vendorStateType } from "../../types/slice-state-types/vendorStateTypes";

const initialState: vendorStateType = {
  isLoading: false,
  error: null,
  vendors: null,
  details: null,
  selectedVendor: null,
  isSuccess: false,
};

const vendorSlice = createSlice({
  name: "vendorSlice",
  initialState,
  reducers: {
    startVendorApiRequest: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.error = null;
    },

    successCreateVendor: (state) => {
      state.isLoading = false;
      toast.success("Vendor created successfully");
      state.isSuccess = true;
    },

    successFetchAllVendors: (state, action) => {
      const { data, page, next, totalPages, prev } = action.payload;
      state.vendors = data;
      state.details = { page, next, totalPages, prev };
      state.isLoading = false;
      state.isSuccess = true;
    },

    successFetchVendorById: (state, action) => {
      state.selectedVendor = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },

    successEditVendor: (state) => {
      state.isLoading = false;
      toast.success("Vendor details edited successfully");
      state.isSuccess = true;
    },

    successDeleteVendorById: (state) => {
      state.isLoading = false;
      toast.success("Vendor Deleted successfully");
      state.isSuccess = true;
    },

    deselectVendor: (state) => {
      state.selectedVendor = null;
    },

    failVendorApiRequest: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("inside vendor fail");
      console.log(state.error);
      toast.error(state.error);
    },
  },
});

export default vendorSlice.reducer;

export const {
  startVendorApiRequest,
  successCreateVendor,
  failVendorApiRequest,
  successFetchAllVendors,
  successFetchVendorById,
  successEditVendor,
  successDeleteVendorById,
  deselectVendor,
} = vendorSlice.actions;
