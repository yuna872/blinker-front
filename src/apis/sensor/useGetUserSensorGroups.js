import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const getUserSensorGroups = async (appUserId) => {
  const { data } = await axiosInstance.get(`/sensor/groups/${appUserId}`);
  return data.response;
};

export const useGetUserSensorGroups = (appUserId) => {
  return useQuery({
    queryKey: ["user", "sensor", "groups", `${appUserId}`],
    queryFn: () => getUserSensorGroups(appUserId),
    enabled: !!appUserId,
  });
};
