import { axiosInstance } from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const refreshSensorGroup = async (sensorGroupId) => {
  const { data } = await axiosInstance.delete(`/sensor/log/${sensorGroupId}`);
  return data.response;
};

export const useRefreshSensorGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: refreshSensorGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "sensor", "groups"]);
    },
  });
};
