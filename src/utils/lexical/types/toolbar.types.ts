export enum ListFormat {
    UNORDERED_LIST = 'ul',
    ORDERED_LIST = 'ol',
  }
  
  export enum HeadingFormat {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
  }
  
  export enum ElementFormat {
    LEFT = 'left',
    START = 'start',
    CENTER = 'center',
    RIGHT = 'right',
    END = 'end',
    JUSTIFY = 'justify',
  }
  
  export enum TextFormat {
    BOLD = 'bold',
    UNDERLINE = 'underline',
    STRIKETHROUGH = 'strikethrough',
    ITALIC = 'italic',
    HIGHLIGHT = 'highlight',
    CODE = 'code',
    SUBSCRIPT = 'subscript',
    SUPERSCRIPT = 'superscript',
  }
  
  export enum MiscFormat {
    FONT_SIZE = 'fontSize',
    LINK = 'link',
    GIF = 'gif',
  }
  
  export const ToolbarButtonIcons = {
    ...ListFormat,
    ...HeadingFormat,
    ...ElementFormat,
    ...TextFormat,
    ...MiscFormat,
  } as const;
  
  export type ToolbarIconsType =
    | ListFormat
    | HeadingFormat
    | ElementFormat
    | TextFormat
    | MiscFormat;

    export const allToolbarIcons = Object.values(ToolbarButtonIcons)

  
  // all lexical toolbar icons
  export const ToolbarIcons: { [K in ToolbarIconsType]: string | undefined } = {
    [ListFormat.UNORDERED_LIST]: 'format_list_bulleted_icon',
    [ListFormat.ORDERED_LIST]: 'format_list_numbered_icon',
    [HeadingFormat.H1]: undefined,
    [HeadingFormat.H2]: undefined,
    [HeadingFormat.H3]: undefined,
    [ElementFormat.START]: 'format_indent_decrease_icon',
    [ElementFormat.END]: 'format_indent_increase_icon',
    [ElementFormat.CENTER]: 'format_align_center_icon',
    [ElementFormat.LEFT]: 'format_align_left_icon',
    [ElementFormat.RIGHT]: 'format_align_right_icon',
    [ElementFormat.JUSTIFY]: 'format_align_justify_icon',
    [TextFormat.BOLD]: 'format_bold_icon',
    [TextFormat.UNDERLINE]: 'format_underlined_icon',
    [TextFormat.STRIKETHROUGH]: 'strikethrough_s_icon',
    [TextFormat.ITALIC]: 'format_italic_icon',
    [TextFormat.HIGHLIGHT]: 'brush',
    [TextFormat.CODE]: 'code_icon',
    [TextFormat.SUBSCRIPT]: 'subscript_icon',
    [TextFormat.SUPERSCRIPT]: 'superscript_icon',
    [MiscFormat.FONT_SIZE]: undefined,
    [MiscFormat.LINK]: 'link',
    [MiscFormat.GIF]: 'gif',
  };
  