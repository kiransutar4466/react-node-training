import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { cartStateTypes } from "../../types/slice-state-types/cartStateTypes";

const initialState: cartStateTypes = {
  isLoading: false,
  error: null,
  cart: null,
  details: null,
  isSuccess: false,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,

  reducers: {
    startCartApiRequest: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
      state.error = null;
    },

    successFetchCart: (state, action) => {
      const { data, page, next, totalPages, prev, totalPrice } = action.payload;
      state.cart = data;
      state.details = { page, next, totalPages, prev, totalPrice };
      state.isLoading = false;
      state.isSuccess = true;
    },

    successEditCart: (state) => {
      state.isLoading = false;
      toast.success("Cart item edited successfully");
      state.isSuccess = true;
    },

    successAddToCart: (state) => {
      state.isLoading = false;
      toast.success("Item Added to Cart Successfully");
      state.isSuccess = true;
    },

    successDeleteCartItem: (state) => {
      state.isLoading = false;
      toast.success("Item Removed Successfully");
      state.isSuccess = true;
    },

    successEmptyCartItem: (state) => {
      state.isLoading = false;
      toast.success("Items Removed Successfully");
      state.isSuccess = true;
    },

    failCartApiRequest: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(state.error);
    },
  },
});

export default cartSlice.reducer;
export const {
  startCartApiRequest,
  successFetchCart,
  successEditCart,
  successAddToCart,
  successDeleteCartItem,
  failCartApiRequest,
  successEmptyCartItem,
} = cartSlice.actions;
