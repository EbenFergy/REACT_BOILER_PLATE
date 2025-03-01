import { SxProps, Typography } from '@mui/material';

const Label = ({ title, sx, required }: { title: string; sx?: SxProps; required?: boolean }) => {
  return (
    <Typography sx={sx}>
      {title} {required && <span style={{ color: 'red' }}>*</span>}{' '}
    </Typography>
  );
};

export default Label;
