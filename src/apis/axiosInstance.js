import axios from "axios";
import { removeAllCookies } from "./auth/cookie";
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { code, message } = error.response?.data;

    if (code === "A002" && message === "토큰이 만료되었습니다.") {
      removeAllCookies();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
