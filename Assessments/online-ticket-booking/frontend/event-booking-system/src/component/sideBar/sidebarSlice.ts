
import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isExpanded: false,
  },
  reducers: {
    expandSidebar: (state) => {
      state.isExpanded = true;
    },
    collapseSidebar: (state) => {
      state.isExpanded = false;
    },
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
});

export const { expandSidebar, collapseSidebar, toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
