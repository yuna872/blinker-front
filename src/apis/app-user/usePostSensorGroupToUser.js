import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const postSensorGroupToUser = async ({ appUserId, sensorGroupId }) => {
  const response = await axiosInstance.post(
    `/app-user/${appUserId}/${sensorGroupId}`
  );
  return response.data;
};

export const usePostSensorGroupToUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSensorGroupToUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["sensor", "groups", "unregistered"]);
    },
  });
};
