import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { setCookies } from "./cookie";

const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/sign-in", credentials);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // cookie 저장하기
      if (data.code === "SUCCESS") {
        setCookies("accessToken", data.response.accessToken);
        setCookies("role", data.response.roles[0]);
      }
    },
  });
};
