import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $isLinkNode } from '@lexical/link';
import { $getRoot, $getSelection, $insertNodes, $isRangeSelection, $isTextNode, $setSelection, createCommand } from 'lexical';
import type { ImagePayload } from '../nodes/ImageNode';
import type { LexicalEditor, LexicalCommand } from 'lexical';

/**
 * font size command for lexical editor
 */
export const FONT_SIZE_COMMAND = createCommand<string>();
export type InsertImagePayload = Readonly<ImagePayload>;
export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand('INSERT_IMAGE_COMMAND');
export const RIGHT_CLICK_IMAGE_COMMAND: LexicalCommand<MouseEvent> = createCommand('RIGHT_CLICK_IMAGE_COMMAND');

/**
 * Function to register the command to change font size
 * @param fontSize, string
 */
export const applyFontSize = (fontSize: string) => {
  const selection = $getSelection();

  if ($isRangeSelection(selection)) {
    // This extracts only the selected part
    const selectedNodes = selection.extract();

    selectedNodes.forEach(node => {
      if ($isTextNode(node)) {
        // Apply the font-size inline style only to the selected text
        node.setStyle(`font-size: ${fontSize}`);
      }
    });
  }
};

/**
 * function to extract the HTML element for the editor
 * @param editor
 * @returns, { selectedElement, elementURL }
 */
export const getSelectedHTMLElement = async (
  editor: LexicalEditor
): Promise<{
  selectedElement: HTMLElement | null;
  elementURL?: string;
}> => {
  let selectedElement: HTMLElement | null = null;
  let elementURL: string | undefined;

  await editor.update(() => {
    const selection = $getSelection();

    // Check if the selection is a range selection
    if ($isRangeSelection(selection)) {
      const nativeSelection = window.getSelection();

      const anchorNode = selection.anchor.getNode();
      const linkNode = anchorNode.getParent();

      // Check if selection contains a link
      if ($isLinkNode(linkNode)) {
        elementURL = linkNode.getURL();
      }

      if (nativeSelection !== null && nativeSelection.rangeCount > 0) {
        const range = nativeSelection.getRangeAt(0); // Get the selected range

        selectedElement = range.startContainer.parentElement; // Get the parent element of the selection
      }
    }
  });

  return { selectedElement, elementURL };
};

/**
 * converts the editor state to HTML string
 * @param editor
 * @returns Promise<string>
 */
export const convertEditorStateToHtmlString = async (editor: LexicalEditor): Promise<string> => {
  let htmlString = '';

  await editor.update(() => {
    // Convert the editor state to an HTML string using $generateHtmlFromNodes
    htmlString = $generateHtmlFromNodes(editor, null);
  });

  return htmlString;
};

/**
 * convert an HTML string to editor state
 * update the editor state
 * @param editor
 * @param htmlString
 */
export const convertHtmlStringToEditorState = (editor: LexicalEditor, htmlString: string): void => {
  editor.update(() => {
    // Create a temporary DOM element to hold the HTML content
    const parser = new DOMParser();
    const dom = parser.parseFromString(htmlString, 'text/html');

    // Generate Lexical nodes from the DOM
    const nodes = $generateNodesFromDOM(editor, dom);

    $getRoot().clear();

    $insertNodes(nodes);
  });
};

/**
 * clears the selection in the editor
 * @param editor
 */
export const clearEditorSelection = (editor: LexicalEditor) => {
  editor.update(() => {
    $setSelection(null);
  });
};
