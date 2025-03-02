import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const getUnregisteredSensorGroups = async () => {
  const { data } = await axiosInstance.get("/sensor/groups/unregistered");
  return data.response;
};

export const useGetUnregisteredSensorGroups = () => {
  return useQuery({
    queryKey: ["sensor", "groups", "unregistered"],
    queryFn: getUnregisteredSensorGroups,
  });
};
