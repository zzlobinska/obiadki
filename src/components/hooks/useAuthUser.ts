import { useAppSelector } from 'components';

const useAuthUser = () => {
  return useAppSelector((state) => state.auth.user);
};

export default useAuthUser;
