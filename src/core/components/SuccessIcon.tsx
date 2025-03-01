import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import { COLORS } from '../styles/COLORS';

// Keyframes for the animation
const scaleUp = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Animated Success Icon Component
const SuccessIcon = ({ message = 'Success!' }: { message?: string }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={1}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
          borderRadius: '50%',
          height: 60,
          width: 60,
          background: COLORS.PaleBlue,
        }}
      >
        <CheckCircleRoundedIcon
          sx={{
            fontSize: 64,
            color: COLORS.LightBlue,
            animation: `${scaleUp} 0.6s ease-out`,
          }}
        />
      </Box>
      <Typography variant="h6" sx={{ color: COLORS.MainBlue, animation: `${scaleUp} 0.6s ease-out 0.2s` }}>
        {message}
      </Typography>
    </Box>
  );
};

export default SuccessIcon;
