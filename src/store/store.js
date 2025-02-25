import { configureStore } from "@reduxjs/toolkit";
import selectedSensorReducer from "@store/selectedSensorSlice";
import mapPositionReducer from '@store/mapPosition'

export const store = configureStore({
  reducer: {
    selectedSensor: selectedSensorReducer,
    mapPosition : mapPositionReducer
  },
});
