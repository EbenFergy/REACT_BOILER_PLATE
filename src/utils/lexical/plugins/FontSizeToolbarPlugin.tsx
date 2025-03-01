import { FONT_SIZE_COMMAND } from '../helpers/lexical.helpers';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import type { MiscFormat } from '../types/toolbar.types';

const FONT_SIZES = ['12', '14', '16', '18', '24', '32', '48'];

const FontSizeToolbarPlugin = ({ disabled }: { readonly format: MiscFormat; readonly disabled?: boolean }) => {
  const [value, setValue] = useState<string | null>(FONT_SIZES[2]);
  const [inputValue, setInputValue] = useState('');

  const [editor] = useLexicalComposerContext();

  const onChangeFontSize = (newValue: string | null) => {
    if (newValue) editor.dispatchCommand(FONT_SIZE_COMMAND, `${newValue}px`);
  };

  return (
    <Autocomplete
      value={value ?? ''}
      onChange={(event, newValue: string | null) => {
        setValue(newValue);
        onChangeFontSize(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={FONT_SIZES}
      sx={{ width: 80 }}
      renderInput={params => (
        <TextField
          {...params}
          label="font size"
          sx={{
            '& .MuiInputBase-root': {
              px: 1,
              py: 0,
              borderRadius: '5px',
            },
          }}
        />
      )}
      disableClearable
      disabled={disabled}
    />
  );
};

export default FontSizeToolbarPlugin;
