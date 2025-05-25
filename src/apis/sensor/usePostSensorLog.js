import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const postSensorLog = async ({ sensorGroupId }) => {
  const response = await axiosInstance.post(`/sensor/log/${sensorGroupId}`);
  return response.data;
};

export const usePostSensorLog = () => {
  return useMutation({
    mutationFn: postSensorLog,
    onSuccess: () => {},
  });
};
