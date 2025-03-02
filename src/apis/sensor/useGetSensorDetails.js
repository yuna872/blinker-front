import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const getSensorDetail = async (id) => {
  const { data } = await axiosInstance.get(`/sensor/${id}/detail`);
  return data.response;
};

export const useGetSensorDetail = (id) => {
  return useQuery({
    queryKey: ["sensor", "detail", `${id}`],
    queryFn: () => getSensorDetail(id),
  });
};
