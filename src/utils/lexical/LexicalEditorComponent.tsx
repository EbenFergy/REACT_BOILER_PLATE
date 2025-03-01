import { FONT_SIZE_COMMAND, INSERT_IMAGE_COMMAND, applyFontSize, convertHtmlStringToEditorState } from './helpers/lexical.helpers';
import { $createImageNode, ImageNode } from './nodes/ImageNode';
import LexicalPluginWrapper from './plugins/LexicalPluginWrapper';
import { LexicalEditorTheme } from './types/LexicalTheme';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HeadingNode } from '@lexical/rich-text';
import { $wrapNodeInElement } from '@lexical/utils';
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_LOW,
  type LexicalEditor,
} from 'lexical';
import type { InsertImagePayload } from './helpers/lexical.helpers';
import type { LexicalInitialConfig } from './types/lexical.types';
import type { SxProps } from '@mui/material';
import type { CSSProperties } from 'react';
import './styles/LexicalEditorStyles.css';

const LexicalEditorComponent = ({
  toolbarButtons,
  onChange,
  placeholder,
  value,
  editorStyles,
  toolbarSx,
  disabled,
  readOnly,
  clearEditor,
}: {
  readonly toolbarButtons: string[];
  readonly onChange: (editorState: string) => void;
  readonly placeholder?: string;
  readonly value?: string;
  readonly editorStyles?: CSSProperties;
  readonly toolbarSx?: SxProps;
  readonly clearEditor?: (editor: LexicalEditor) => void;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
}) => {
  const onError = (error: Error) => {
    console.error(error);
  };

  const initialConfig: LexicalInitialConfig = {
    namespace: 'MyEditor',
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode, LinkNode, AutoLinkNode, ImageNode],
    theme: LexicalEditorTheme,
    editable: !disabled && !readOnly,
    editorState: (editor: LexicalEditor) => {
      if (value) {
        convertHtmlStringToEditorState(editor, value);
      }

      if (clearEditor) clearEditor(editor);

      // Register the font size command
      editor.registerCommand(
        FONT_SIZE_COMMAND,
        (fontSize: string) => {
          applyFontSize(fontSize);

          return true;
        },
        COMMAND_PRIORITY_LOW
      );

      // register the image command
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        payload => {
          const imageNode = $createImageNode(payload);

          $insertNodes([imageNode]);

          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR
      );
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalPluginWrapper
        toolbarButtons={toolbarButtons}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        editorStyles={editorStyles}
        toolbarSx={toolbarSx}
        disabled={disabled}
        readOnly={readOnly}
      />
    </LexicalComposer>
  );
};

export default LexicalEditorComponent;
