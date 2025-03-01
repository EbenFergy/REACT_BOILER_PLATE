import LexicalToolbarButton from '../components/LexicalToolbarButton';
import { clearEditorSelection, getSelectedHTMLElement } from '../helpers/lexical.helpers';
import { ToolbarIcons } from '../types/toolbar.types';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { Box, Popper, TextField, Typography, useTheme } from '@mui/material';
import { $getSelection, $isRangeSelection } from 'lexical';
import React, { useEffect, useState } from 'react';
import type { MiscFormat } from '../types/toolbar.types';
import { validateAndCorrectUrlWithProtocol } from '../../string.helpers';

const LinkToolbarPlugin = ({ format, disabled }: { readonly format: MiscFormat; readonly disabled?: boolean }) => {
  const theme = useTheme();
  const [editor] = useLexicalComposerContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [urlCopied, setUrlCopied] = React.useState<boolean>(false);
  const [nodeURL, setNodeURL] = useState<string | undefined>();
  const open = Boolean(anchorEl);

  // show floating url editor when a link is clicked
  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(() => {
      getSelectedHTMLElement(editor).then(({ selectedElement, elementURL }) => {
        if (elementURL) setAnchorEl(selectedElement);
        if (!elementURL) setAnchorEl(null);
        setNodeURL(elementURL);
        setUrlCopied(false);
      });
    });

    // Clean up the listener when the component un-mounts
    return () => {
      removeUpdateListener();
    };
  }, [editor]);

  const openLinkEditor = () => {
    getSelectedHTMLElement(editor).then(({ selectedElement }) => setAnchorEl(selectedElement));
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setNodeURL(e.target.value);

  const handleUrlSubmit = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection) && nodeURL) {
        const linkAttributes = {
          target: '_blank',
          rel: 'noopener noreferrer',
        };
        const validatedURL = validateAndCorrectUrlWithProtocol(nodeURL);
        const urlToUse = validatedURL ? validatedURL : nodeURL;

        editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
          url: urlToUse,
          ...linkAttributes,
        });
      }

      // clear selection to remove floating link editor
      clearEditorSelection(editor);
    });
  };

  const handleRemoveLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  };

  const handleCopyLink = () =>
    nodeURL &&
    navigator.clipboard.writeText(nodeURL).then(() => {
      setUrlCopied(true);
      setTimeout(() => clearEditorSelection(editor), 500);
    });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'Enter':
        handleUrlSubmit();
        break;
      case 'Escape':
        clearEditorSelection(editor);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <LexicalToolbarButton onClick={openLinkEditor} icon={ToolbarIcons[format]} format={format} disabled={disabled} />

      <Popper open={open} anchorEl={anchorEl} sx={{ zIndex: 100000000 }}>
        <Box
          className="floating-link-editor"
          sx={{
            backgroundColor: 'white',
            p: 1,
            borderRadius: '5px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            display: 'flex',
          }}
        >
          <TextField
            type="text"
            value={nodeURL}
            onChange={handleUrlChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter URL"
            size="small"
            sx={{ borderRadius: '5px' }}
          />
          <LexicalToolbarButton onClick={handleUrlSubmit} format="apply" icon="done" />
          <LexicalToolbarButton onClick={handleRemoveLink} format="remove link" icon="link_off" />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LexicalToolbarButton onClick={handleCopyLink} format="copy" icon="content_copy" />
            {urlCopied && (
              <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
                copied
              </Typography>
            )}
          </Box>
        </Box>
      </Popper>

      <LinkPlugin />
    </>
  );
};

export default LinkToolbarPlugin;
