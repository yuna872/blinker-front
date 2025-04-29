import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';

const patchSensorLocation = async ({ sensorId, latitude, longitude }) => {
  const response = await axiosInstance.patch(`/sensor/${sensorId}/relocate`, {
    latitude,
    longitude,
  });

  return response.data;
};

export const usePatchSensorLocation = (sensorId, appUserId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchSensorLocation,
    onSuccess: () => {
      queryClient.invalidateQueries(['sensor', 'groups']);
      queryClient.invalidateQueries(['sensor', 'detail', sensorId, appUserId]);
    },
  });
};
