import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';

const patchSensorGroupsOrder = async ({ sensorGroupIds }) => {
  const response = await axiosInstance.patch(`/sensor/groups/order`, {
    sensorGroupIds,
  });
  return response.data;
};

export const usePatchSensorGroupsOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchSensorGroupsOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(['sensor', 'groups']);
    },
  });
};
