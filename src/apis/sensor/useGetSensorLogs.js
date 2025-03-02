import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const getSensorLogs = async (id) => {
  const { data } = await axiosInstance.get(`/sensor/${id}/logs`);
  return data.response;
};

export const useGetSensorLogs = (id) => {
  return useQuery({
    queryKey: ["sensor", "logs", `${id}`],
    queryFn: () => getSensorLogs(id),
  });
};
