import { createBrowserRouter } from 'react-router-dom';
import ErrorComponent from '../components/ErrorComponent';
import RootComponent from '../components/RootComponent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootComponent />,
    children: [{ path: '*', element: <ErrorComponent /> }],
  },
]);

export default router;
