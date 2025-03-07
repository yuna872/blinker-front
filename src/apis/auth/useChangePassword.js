import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const changePassword = async (credentials) => {
  const response = await axiosInstance.patch("/auth/user/password", credentials);
  return response.data;
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
    },
  });
};
