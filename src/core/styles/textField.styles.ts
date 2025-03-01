import { COLORS } from './COLORS';

export const darkBackgroundTextFieldStyles = {
  input: {
    color: 'white', // Text color
  },

  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white', // Border color
    border: `1px solid ${COLORS.MainBlue}`,
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white', // Border color on hover
    border: `1px solid ${COLORS.LightBlue}`,
  },
  '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white', // Border color when focused
  },

  width: '100%',
};
