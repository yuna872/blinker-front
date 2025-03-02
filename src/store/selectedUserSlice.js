import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setSelectedUser: (_, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
