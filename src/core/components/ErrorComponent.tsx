import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import sleepy_bear from '../../assets/sleepy_bear.png';

const ErrorComponent = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box className="errorImage">
        <img src={sleepy_bear} alt="sleepy_bear" />
      </Box>
      <Box sx={{ width: '50%' }}>
        <Typography variant="h1">
          OOPS! PAGE <br /> NOT FOUND{' '}
        </Typography>
        <Typography sx={{ py: 2 }}>You must have navigated to the wrong link. </Typography>
        <Button onClick={() => navigate('/home')}>BACK TO HOME</Button>
      </Box>
    </Box>
  );
};

export default ErrorComponent;
