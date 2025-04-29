import { configureStore } from '@reduxjs/toolkit';
import selectedSensorReducer from '@store/selectedSensorSlice';
import mapPositionReducer from '@store/mapPositionSlice';
import selectedUserReducer from '@store/selectedUserSlice';
import UserTable from '@pages/Admin/Group/components/UserTable';

export const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
    selectedSensor: selectedSensorReducer,
    mapPosition: mapPositionReducer,
  },
});
