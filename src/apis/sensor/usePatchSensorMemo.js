import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';

const patchSensorMemo = async ({ sensorId, appUserId, memo }) => {
  const response = await axiosInstance.patch(
    `/sensor/${sensorId}/memo?appUserId=${appUserId}`,
    {
      memo,
    }
  );
  return response.data;
};

export const usePatchSensorMemo = (sensorId, appUserId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchSensorMemo,
    onSuccess: () => {
      queryClient.invalidateQueries(['sensor', 'detail', sensorId, appUserId]);
    },
  });
};
