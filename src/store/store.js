import { configureStore } from "@reduxjs/toolkit";
import selectedSensorReducer from "@store/selectedSensorSlice";
import mapPositionReducer from "@store/mapPositionSlice";

export const store = configureStore({
  reducer: {
    selectedSensor: selectedSensorReducer,
    mapPosition: mapPositionReducer,
  },
});
