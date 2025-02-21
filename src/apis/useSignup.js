import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

const signup = async (credentials) => {
  const response = await axiosInstance.post("/auth/sign-up", credentials);
  return response.data;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("회원가입 성공");
    },
    // TODO: 실패할 경우 500 에러 예외처리
  });
};
