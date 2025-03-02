import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const getSensorGroups = async () => {
  const { data } = await axiosInstance.get("/sensor/groups");
  return data.response;
};

export const useGetSensorGroups = () => {
  return useQuery({
    queryKey: ["sensor", "groups"],
    queryFn: getSensorGroups,
  });
};
