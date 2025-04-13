import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const patchSensorLocation = async ({ sensorId, latitude, longitude }) => {
  console.log("gg");
  const response = await axiosInstance.patch(`/sensor/${sensorId}/relocate`, {
    latitude,
    longitude,
  });

  console.log(response);
  return response.data;
};

export const usePatchSensorLocation = (sensorId, appUserId) => {
  console.log(sensorId, appUserId);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchSensorLocation,
    onSuccess: () => {
      queryClient.invalidateQueries(["sensor", "detail", sensorId, appUserId]);
    },
  });
};
