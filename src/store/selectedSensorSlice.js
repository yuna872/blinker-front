import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const selectedSensorSlice = createSlice({
  name: "selectedSensor",
  initialState,
  reducers: {
    setSelectedSensorState: (_, action) => {
      return action.payload;
    },
    resetSelectedSensor: () => {
      return null
    }
  },
});

export const { setSelectedSensorState, resetSelectedSensor } = selectedSensorSlice.actions;

export default selectedSensorSlice.reducer;
