import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../../store';
import { setIsAuthenticated, setUser } from '../../core/reducers/coreSlice';
import { getVariable } from '../misc/env.misc';
import router from '../../core/routes/routes';

const currentPath = window.location.pathname;

const axiosInstance = axios.create({
  baseURL: getVariable('BASE_URL'),
  withCredentials: true, // If you're dealing with cookies or sessions
  headers: {
    'Cache-Control': 'no-cache',
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Modify config (e.g., add auth token)
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error(error.message);

    // Prevent propagation of the error
    return; // Simply return to handle the error within the interceptor
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    if (error.response?.status === 401) {
      console.log('Unauthorized! Redirecting to login...');
      store.dispatch(setIsAuthenticated(false));
      store.dispatch(setUser(undefined));

      if (currentPath.includes('admin/dashboard')) router.navigate('/admin/login');
    }

    console.log('...can see error');

    console.error(error.message);

    // Prevent propagation of the error
    throw error; // Simply return to handle the error within the interceptor
  }
);

/**
 * extracts the data from the response or error from the axios request
 * @param config
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const axiosWrapper = async (config: AxiosRequestConfig): Promise<{ data?: any; error?: AxiosError | Error }> => {
  try {
    const response: AxiosResponse = await axiosInstance.request(config);
    return { data: response.data, error: undefined };
  } catch (error) {
    console.error('error', error);

    if (error) {
      if (error instanceof AxiosError)
        return { data: undefined, error: { ...error, message: error?.response?.data?.message ?? error.message } };

      if (error instanceof Error) return { data: undefined, error };
    }

    return { data: undefined, error: undefined };
  }
};

// export default axiosInstance;
