import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const deleteUser = async (appUserId) => {
  const response = await axiosInstance.delete(`/auth/user/${appUserId}`);
  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["auth", "users"]);
    },
  });
};
