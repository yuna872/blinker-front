import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const putSensor = async ({ sensorGroupId, formData }) => {
  const response = await axiosInstance.put(
    `/sensor/${sensorGroupId}`,
    formData
  );
  console.log(response, '여기야')
  return response.data;
};

export const usePutSensor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putSensor,
    onSuccess: () => {
      queryClient.invalidateQueries(["sensor", "groups"]);
    },
  });
};
