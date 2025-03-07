import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const getSensorLogs = async (sensorId, year, month, day) => {
  const params = {};

  if (!isNaN(year)) params.year = year;
  if (!isNaN(month)) params.month = month;
  if (!isNaN(day)) params.day = day;

  const { data } = await axiosInstance.get(`/sensor/${sensorId}/logs`, {
    params,
  });
  return data.response;
};

export const useGetSensorLogs = (sensorId, year, month, day) => {
  return useQuery({
    queryKey: ["sensor", "logs", sensorId, year, month, day],
    queryFn: () => getSensorLogs(sensorId, year, month, day),
  });
};
