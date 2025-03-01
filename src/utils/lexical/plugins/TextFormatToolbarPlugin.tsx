import LexicalToolbarButton from '../components/LexicalToolbarButton';
import { ToolbarIcons } from '../types/toolbar.types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import type { TextFormat } from '../types/toolbar.types';

const TextFormatToolbarPlugin = ({ format, disabled }: { readonly format: TextFormat; readonly disabled?: boolean }) => {
  const [editor] = useLexicalComposerContext();

  const formatText = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return <LexicalToolbarButton onClick={formatText} icon={ToolbarIcons[format]} format={format} disabled={disabled} />;
};

export default TextFormatToolbarPlugin;
