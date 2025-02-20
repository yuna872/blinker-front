import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/sign-in", credentials);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
