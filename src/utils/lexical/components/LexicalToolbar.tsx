import { isEnumValue } from '../../enumTypeguard.helpers';
import ElementToolbarPlugin from '../plugins/ElementToolbarPlugin';
import FontSizeToolbarPlugin from '../plugins/FontSizeToolbarPlugin';
import HeadingToolbarPlugin from '../plugins/HeadingToolbarPlugin';
import LinkToolbarPlugin from '../plugins/LinkToolbarPlugin';
import ListToolbarPlugin from '../plugins/ListToolbarPlugin';
import TextFormatToolbarPlugin from '../plugins/TextFormatToolbarPlugin';
import { ElementFormat, HeadingFormat, ListFormat, MiscFormat, TextFormat } from '../types/toolbar.types';
import { Box } from '@mui/material';
import type { SxProps } from '@mui/material';

const LexicalToolbar = ({
  toolbarButtons,
  toolbarSx,
  disabled,
}: {
  readonly toolbarButtons: string[];
  readonly toolbarSx?: SxProps;
  readonly disabled?: boolean;
}) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', ...toolbarSx }}>
    {toolbarButtons.map(format => (
      <Box key={format}>
        {isEnumValue(TextFormat, format) && <TextFormatToolbarPlugin format={format} disabled={disabled} />}
        {isEnumValue(ListFormat, format) && <ListToolbarPlugin format={format} disabled={disabled} />}
        {isEnumValue(HeadingFormat, format) && <HeadingToolbarPlugin format={format} disabled={disabled} />}
        {isEnumValue(ElementFormat, format) && <ElementToolbarPlugin format={format} disabled={disabled} />}
        {format === MiscFormat.FONT_SIZE && <FontSizeToolbarPlugin format={format} disabled={disabled} />}
        {format === MiscFormat.LINK && <LinkToolbarPlugin format={format} disabled={disabled} />}
      </Box>
    ))}
  </Box>
);

export default LexicalToolbar;
