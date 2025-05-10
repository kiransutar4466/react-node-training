import { createSlice } from "@reduxjs/toolkit";
import { userStateType } from "../../types/userTypes";
import { toast } from "react-toastify";

const initialState: userStateType = {
  user: {},
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    postUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    postUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      toast.success("Registered Sccessfully! Now you an login ");
    },
    postUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error("Registeration failed ! " + state.error);
    },
  },
});

export default userSlice.reducer;
export const { postUserStart, postUserSuccess, postUserFailure } =
  userSlice.actions;
