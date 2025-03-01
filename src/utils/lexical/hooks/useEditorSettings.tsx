import { convertHtmlStringToEditorState } from '../helpers/lexical.helpers';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';

const useEditorSettings = (value?: string) => {
  const theme = useTheme();
  const [editor] = useLexicalComposerContext();

  // sets the link color
  useEffect(() => {
    document.documentElement.style.setProperty('--link-color', theme.palette.primary.main);
  }, [theme.palette.primary.main]);

  // clears the editor when value is an empty string
  useEffect(() => {
    if (value === '') convertHtmlStringToEditorState(editor, value);
  }, [editor, value]);
};

export default useEditorSettings;
