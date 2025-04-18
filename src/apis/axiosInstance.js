import axios from "axios";
import { getCookies } from "./auth/cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 토큰 가져오기
    const token = getCookies("accessToken");
    if (token) {
      config.headers["access-token"] = `${token}`;
    }
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);
