import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";

const fetchData = async (endpoint) => {
  const { data } = await axiosInstance.get(endpoint);
  return data;
};

export const useFetchData = (key, endpoint) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchData(endpoint),
  });
};
