import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@store/userSlice";
import selectedSensorReducer from "@store/selectedSensorSlice";
import mapPositionReducer from "@store/mapPositionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    selectedSensor: selectedSensorReducer,
    mapPosition: mapPositionReducer,
  },
});
