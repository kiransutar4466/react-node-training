import { createSlice } from "@reduxjs/toolkit";
import {
  authStateType,
  jwtPayloadType,
} from "../../types/slice-state-types/authStateTypes";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const initialState: authStateType = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    authSuccess: (state, action) => {
      state.isLoading = false;

      state.isLoggedIn = true;

      state.userDetails = jwtDecode<jwtPayloadType>(action.payload.token);

      localStorage.setItem("token", action.payload.token);

      toast.success(
        "Logged In Successfully! Welcome " + state.userDetails.firstName + " !",
      );
    },
    authFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload[0];
      toast.error(state.error);
    },

    setLogin: (state) => {
      state.isLoggedIn = true;
      const token = localStorage.getItem("token");
      if (localStorage.getItem("token")) {
        state.userDetails = jwtDecode<jwtPayloadType>(token ? token : "");
      }
    },

    logoutUser: (state, action) => {
      state.isLoggedIn = false;
      state.userDetails = null;
      localStorage.removeItem("token");
      action.payload.navigate("/login");

      toast.success("Logged Out Successfully!!");
    },
  },
});

export default authSlice.reducer;

export const { authStart, authSuccess, authFailure, setLogin, logoutUser } =
  authSlice.actions;
