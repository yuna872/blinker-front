import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const putSensorLog = async ({ sensorGroupId }) => {
  const response = await axiosInstance.put(`/sensor/log/${sensorGroupId}`);
  return response.data;
};

export const usePutSensorLog = () => {
  return useMutation({
    mutationFn: putSensorLog,
    onSuccess: () => {},
  });
};
