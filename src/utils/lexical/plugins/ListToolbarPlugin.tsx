import LexicalToolbarButton from '../components/LexicalToolbarButton';
import { ListFormat, ToolbarIcons } from '../types/toolbar.types';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

const ListToolbarPlugin = ({ format, disabled }: { readonly format: ListFormat; readonly disabled?: boolean }) => {
  const [editor] = useLexicalComposerContext();

  const formatText = () => {
    if (format === ListFormat.ORDERED_LIST) editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    else editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  return (
    <>
      <LexicalToolbarButton onClick={formatText} icon={ToolbarIcons[format]} format={format} disabled={disabled} />
      <ListPlugin />
    </>
  );
};

export default ListToolbarPlugin;
