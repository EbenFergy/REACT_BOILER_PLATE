import { Outlet, useBlocker } from 'react-router-dom';
import { setPreviousPage } from '../reducers/coreSlice';
import { useDispatch } from 'react-redux';
import useAuthCheck from '../hooks/useAuthCheck';
import SnackbarComponent from './Snackbar';

const RootComponent = () => {
  const dispatch = useDispatch();

  // set previous page path
  useBlocker(({ currentLocation }) => {
    dispatch(setPreviousPage(currentLocation.pathname));

    return false;
  });

  // custom hooks
  useAuthCheck();

  return (
    <>
      <Outlet />
      <SnackbarComponent />
    </>
  );
};

export default RootComponent;
