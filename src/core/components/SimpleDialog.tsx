import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { COLORS } from '../styles/COLORS';

const SimpleDialog = ({
  open,
  setOpen,
  title,
  content,
  onAccept,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  content: string;
  onAccept: () => void;
}) => {
  // variables
  const { MainBlue } = COLORS;

  // functions
  const handleClose = () => setOpen(false);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          width: 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        {content}
      </DialogContent>
      <Box sx={{ display: 'flex', gap: 2, p: 2, ml: 'auto' }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            border: `1px solid ${MainBlue}`,
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={onAccept} sx={{ background: MainBlue }}>
          Accept
        </Button>
      </Box>
    </Dialog>
  );
};

export default SimpleDialog;
