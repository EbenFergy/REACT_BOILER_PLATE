import { Icon, IconButton, Tooltip, Typography } from '@mui/material';

const LexicalToolbarButton = ({
  icon,
  onClick,
  format,
  disabled,
}: {
  readonly icon?: string;
  readonly onClick: () => void;
  readonly format: string;
  readonly disabled?: boolean;
}) => (
  <Tooltip title={format}>
    <IconButton
      onClick={onClick}
      className="lexical-toolbar-button"
      disabled={disabled}
      sx={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {icon && <Icon>{icon}</Icon>}
      {!icon && <Typography>{format.toUpperCase()}</Typography>}
    </IconButton>
  </Tooltip>
);

export default LexicalToolbarButton;
