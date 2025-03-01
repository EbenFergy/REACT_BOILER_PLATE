import LexicalToolbar from '../components/LexicalToolbar';
import useEditorSettings from '../hooks/useEditorSettings';
import { $generateHtmlFromNodes } from '@lexical/html';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { Box, useTheme } from '@mui/material';
import type { SxProps } from '@mui/material';
import type { EditorState, LexicalEditor } from 'lexical';
import type { CSSProperties } from 'react';

const LexicalPluginWrapper = ({
  toolbarButtons,
  onChange,
  placeholder,
  value,
  editorStyles,
  toolbarSx,
  disabled,
  readOnly,
}: {
  readonly toolbarButtons: string[];
  readonly onChange: (editorState: string) => void;
  readonly placeholder?: string;
  readonly value?: string;
  readonly editorStyles?: CSSProperties;
  readonly toolbarSx?: SxProps;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
}) => {
  const theme = useTheme();

  // hooks
  useEditorSettings(value);

  const onEditorChange = (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => {
    editor.update(() => {
      // Convert the editor state to an HTML string using $generateHtmlFromNodes
      const htmlString = $generateHtmlFromNodes(editor, null);

      onChange(htmlString);
    });
  };

  return (
    <>
      {!readOnly && <LexicalToolbar toolbarButtons={toolbarButtons} toolbarSx={toolbarSx} disabled={disabled} />}
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            style={{
              borderRadius: '5px',
              border: `${readOnly ? 'none' : `1px solid ${theme.palette.text.primary}`}`,
              height: `${readOnly ? 'fit-content' : '300px'}`,
              padding: 0,
              paddingLeft: '10px',
              width: '100%',
              outline: 'none',
              overflowY: 'auto',
              position: 'relative',
              ...editorStyles,
            }}
          />
        }
        placeholder={<Box sx={{ position: 'absolute', top: 68, left: 20 }}>{placeholder}</Box>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={onEditorChange} />
    </>
  );
};

export default LexicalPluginWrapper;
