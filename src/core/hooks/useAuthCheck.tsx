import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setUser } from '../reducers/coreSlice';
import { axiosWrapper } from '../../utils/auth/axiosInstance';
import { User } from '../types/core.state.types';

const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await axiosWrapper({ method: 'POST', url: '/authenticate/check-auth', data: {} });
      const user: User | undefined = data;

      if (user) {
        // User is authenticated
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(data));
      }
      if (error) {
        // Handle error or assume user is not authenticated
        dispatch(setIsAuthenticated(false));
        dispatch(setUser(undefined));
      }
    };

    checkAuth();
  }, [dispatch]);
};

export default useAuthCheck;
