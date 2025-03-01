import LexicalToolbarButton from '../components/LexicalToolbarButton';
import { ToolbarIcons } from '../types/toolbar.types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';

import type { HeadingFormat } from '../types/toolbar.types';

const HeadingToolbarPlugin = ({ format, disabled }: { readonly format: HeadingFormat; readonly disabled?: boolean }) => {
  const [editor] = useLexicalComposerContext();

  const formatText = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(format));
      }
    });
  };

  return <LexicalToolbarButton onClick={formatText} icon={ToolbarIcons[format]} format={format} disabled={disabled} />;
};

export default HeadingToolbarPlugin;
