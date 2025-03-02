import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const selectedSensorSlice = createSlice({
  name: "selectedSensor",
  initialState,
  reducers: {
    setSelectedSensorState: (_, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedSensorState } = selectedSensorSlice.actions;

export default selectedSensorSlice.reducer;
