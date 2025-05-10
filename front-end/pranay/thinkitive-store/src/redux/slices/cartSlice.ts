import { createSlice } from "@reduxjs/toolkit";
import { productType } from "../../types/productsTypes";
import { toast } from "react-toastify";

const initialState: { cartItems: productType[] } = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!localStorage.getItem("user")) {
        toast.warn("Please login to shop");
        return;
      }

      console.log(action, "action called");

      const itemExist = state.cartItems?.find(
        (item) => item.id === action.payload.id
      );

      if (itemExist) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, count: item.count ? item.count + 1 : 1 };
          } else {
            return { ...item };
          }
        });
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }
      toast.success("1 item added to cart");
      console.log(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      toast.success("item removed from cart");
    },

    decrementFromCart: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          return { ...item, count: item.count ? item.count - 1 : 0 };
        } else {
          return { ...item };
        }
      });
      toast.success("1 item removed from cart");
    },
  },
});

export const { addToCart, removeFromCart, decrementFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
