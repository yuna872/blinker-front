import { configureStore } from "@reduxjs/toolkit";
import selectedSensorReducer from "@store/selectedSensorSlice";
import mapPositionReducer from "@store/mapPositionSlice";
import selectedUserReducer from "@store/selectedUserSlice";

export const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
    selectedSensor: selectedSensorReducer,
    mapPosition: mapPositionReducer,
  },
});
