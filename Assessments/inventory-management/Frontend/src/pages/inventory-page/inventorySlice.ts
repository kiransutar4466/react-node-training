import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { inventoryStateTypes } from "../../types/slice-state-types/inventoryStateTypes";

const initialState: inventoryStateTypes = {
  isLoading: false,
  error: null,
  inventories: null,
  details: null,
  selectedInventory: null,
  isSuccess: false,
};
const inventorySlice = createSlice({
  name: "inventorySlice",
  initialState,

  reducers: {
    startInventoryApiRequest: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.error = null;
    },

    successFetchAllInventories: (state, action) => {
      const { data, page, next, totalPages, prev } = action.payload;
      state.inventories = data;
      state.details = { page, next, totalPages, prev };
      state.isLoading = false;
      state.isSuccess = true;
    },

    successFetchInventoryById: (state, action) => {
      state.selectedInventory = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },

    successEditInventory: (state) => {
      state.isLoading = false;
      toast.success("Inventory edited successfully");
      state.isSuccess = true;
    },

    failInventoryApiRequest: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(state.error);
    },

    deselectInventory: (state) => {
      state.selectedInventory = null;
    },
  },
});

export default inventorySlice.reducer;
export const {
  startInventoryApiRequest,
  successFetchAllInventories,
  successFetchInventoryById,
  successEditInventory,
  failInventoryApiRequest,
  deselectInventory,
} = inventorySlice.actions;
