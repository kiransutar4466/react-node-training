import { createSlice } from "@reduxjs/toolkit";
import { productsStateType } from "../../types/productsTypes";

const initialState: productsStateType = {
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    fetchProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.filteredProducts = state.products;
    },

    fetchProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    filterProducts: (state, action) => {
      state.filteredProducts = state.products.filter((item) => {
        if (item.title && item.description) {
          return (
            item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(action.payload.toLowerCase())
          );
        }
      });
    },
  },
});
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  filterProducts,
} = productSlice.actions;
export default productSlice.reducer;
