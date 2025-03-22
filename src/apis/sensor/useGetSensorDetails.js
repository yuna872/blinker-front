import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const getSensorDetail = async (sensorId, appUserId) => {
  const { data } = await axiosInstance.get(
    `/sensor/${sensorId}/detail?appUserId=${appUserId}`
  );
  return data.response;
};

export const useGetSensorDetail = (sensorId, appUserId) => {
  return useQuery({
    queryKey: ["sensor", "detail", sensorId, appUserId],
    queryFn: () => getSensorDetail(sensorId, appUserId),
  });
};
