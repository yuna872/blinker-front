import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setSelectedUser: (_, action) => {
      return action.payload;
    },
    resetSelectedUser: () => {
      return null;
    },
  },
});

export const { setSelectedUser, resetSelectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
