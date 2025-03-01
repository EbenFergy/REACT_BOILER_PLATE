import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnackBar } from '../selectors/core.selectors';
import { setSnackbar } from '../reducers/coreSlice';

const SnackbarComponent = () => {
  // variables
  const dispatch = useDispatch();

  // selectors
  const snackBarAction = useSelector(selectSnackBar);

  // functions
  const onClose = () => dispatch(setSnackbar(undefined));

  if (snackBarAction) {
    const { type, message } = snackBarAction;

    return (
      <Snackbar
        open
        autoHideDuration={3000} // Automatically hide after 6 seconds
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning of the Snackbar
      >
        <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
  }

  return null;
};

export default SnackbarComponent;
