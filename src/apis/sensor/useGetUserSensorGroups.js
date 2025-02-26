import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const getUserSensorGroups = async (appUserId, onlyFaulty = false) => {
  const { data } = await axiosInstance.get(
    `/sensor/groups/${appUserId}?onlyFaulty=${onlyFaulty}`
  );
  return data.response;
};

export const useGetUserSensorGroups = (appUserId, onlyFaulty) => {
  return useQuery({
    queryKey: ["user", "sensor", "groups", `${appUserId}`, `${onlyFaulty}`],
    queryFn: () => getUserSensorGroups(appUserId, onlyFaulty),
    enabled: !!appUserId,
  });
};
