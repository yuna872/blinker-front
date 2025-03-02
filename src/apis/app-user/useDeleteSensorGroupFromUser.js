import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const deleteSensorGroupFromUser = async ({ appUserId, sensorGroupId }) => {
  const response = await axiosInstance.delete(
    `/app-user/${appUserId}/${sensorGroupId}`
  );
  return response.data;
};

export const useDeleteSensorGroupFromUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSensorGroupFromUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["sensor", "groups", "unregistered"]);
    },
  });
};
