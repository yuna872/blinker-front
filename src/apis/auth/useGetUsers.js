import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';

const getUsers = async () => {
  const { data } = await axiosInstance.get(`/auth/users`);
  return data.response;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['auth', 'users'],
    queryFn: getUsers,
  });
};
