import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const putUser = async ({ appUserId, formData }) => {
  const response = await axiosInstance.put(`/auth/user/${appUserId}`, formData);
  return response.data;
};

export const usePutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "users"]);
    },
  });
};
