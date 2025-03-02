import { createSlice } from "@reduxjs/toolkit";

const initialState = { lat: 37.2803, lng: 127.0181 };

export const mapPositionSlice = createSlice({
  name: "mapPosition",
  initialState,
  reducers: {
    setMapPosition: (_, action) => {
      return action.payload;
    },
  },
});

export const { setMapPosition } = mapPositionSlice.actions;

export default mapPositionSlice.reducer;
