import { createSlice } from "@reduxjs/toolkit";
import { authStateType } from "../../types/userTypes";
import { toast } from "react-toastify";

const initialState: authStateType = {
  isLoading: false,
  error: null,
  isLoggedIn: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    checkAuthSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
      toast.success("Logged In Successfully!!!");
      const user = JSON.stringify(state.user);
      localStorage.setItem("user", user);
    },

    checkAuthFaliure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
      toast.error(state.error);
    },

    setLogIn: (state, action) => {
      state.isLoggedIn = action.payload.status;
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      localStorage.removeItem("user");
      toast.success("Logged Out Successfully!!!");
    },
  },
});
export const {
  checkAuthStart,
  checkAuthFaliure,
  checkAuthSuccess,
  setLogIn,
  setLogout,
} = authSlice.actions;
export default authSlice.reducer;
