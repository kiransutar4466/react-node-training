import { createSlice } from "@reduxjs/toolkit";

const initialState: { isSidebarOpen: boolean } = {
  isSidebarOpen: true,
};

const navSlice = createSlice({
  name: "navs",
  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export default navSlice.reducer;

export const { toggleSidebar } = navSlice.actions;
