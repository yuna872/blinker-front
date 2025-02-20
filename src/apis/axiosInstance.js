import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://blinker-backend-155354731251.asia-northeast3.run.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 토큰 가져오기
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJhcHBVc2VySWQiOiIyIiwiaWF0IjoxNzQwMDUyOTIxLCJleHAiOjE3NDAxMzkzMjF9.ClnRo_P6i-Ve9TiETr1WGjV68sOZfBV9KUSqNPlUKZlPrw9X5Ewh1D_3Kzo6BNFevSI1QoA31In7YQ_bRHvWyA";
    if (token) config.headers.Authorization = `access-token ${token}`;
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);
