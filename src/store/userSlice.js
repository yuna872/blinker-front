import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => {
      return action.payload;
    },
    resetUser: () => {
      return null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
