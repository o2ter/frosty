//
//  index.ts
//
//  The MIT License
//  Copyright (c) 2021 - 2025 O2ter Limited. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import _ from 'lodash';
import { PropValue } from './props';

/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 */

// All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
type AriaRole =
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "button"
  | "cell"
  | "checkbox"
  | "columnheader"
  | "combobox"
  | "complementary"
  | "contentinfo"
  | "definition"
  | "dialog"
  | "directory"
  | "document"
  | "feed"
  | "figure"
  | "form"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "timer"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem"
  | (string & {});

const globalAttrs = {
  // Standard HTML Attributes
  accessKey: PropValue.string,
  autoFocus: PropValue.boolean,
  className: PropValue.string,
  contentEditable: PropValue.oneOf([true, false, 'inherit', 'plaintext-only'] as const),
  contextMenu: PropValue.string,
  dir: PropValue.string,
  draggable: PropValue.boolean,
  hidden: PropValue.boolean,
  id: PropValue.string,
  lang: PropValue.string,
  nonce: PropValue.string,
  slot: PropValue.string,
  spellCheck: PropValue.boolean,
  style: PropValue.style,
  tabIndex: PropValue.number,
  title: PropValue.string,
  translate: PropValue.oneOf(['yes', 'no'] as const),

  // Unknown
  radioGroup: PropValue.string, // <command>, <menuitem>

  // WAI-ARIA
  role: new PropValue<AriaRole>({
    varify: _.isString,
    encode: x => x,
  }),

  // RDFa Attributes
  about: PropValue.string,
  content: PropValue.string,
  datatype: PropValue.string,
  inlist: PropValue.any,
  prefix: PropValue.string,
  property: PropValue.string,
  rel: PropValue.string,
  resource: PropValue.string,
  rev: PropValue.string,
  typeof: PropValue.string,
  vocab: PropValue.string,

  // Non-standard Attributes
  autoCapitalize: PropValue.string,
  autoCorrect: PropValue.string,
  autoSave: PropValue.string,
  color: PropValue.string,
  itemProp: PropValue.string,
  itemScope: PropValue.boolean,
  itemType: PropValue.string,
  itemID: PropValue.string,
  itemRef: PropValue.string,
  results: PropValue.number,
  security: PropValue.string,
  unselectable: PropValue.oneOf(['on', 'off'] as const),

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see {@link https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute}
   */
  inputMode: PropValue.oneOf(['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'] as const),
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is}
   */
  is: PropValue.string,
};

export const HTMLElementTagNameMap = {
  "a": {
    type: HTMLAnchorElement,
    props: {
      ...globalAttrs,
      href: PropValue.string,
    },
  },
  "abbr": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "address": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "area": {
    type: HTMLAreaElement,
    props: {
      ...globalAttrs,
    },
  },
  "article": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "aside": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "audio": {
    type: HTMLAudioElement,
    props: {
      ...globalAttrs,
    },
  },
  "b": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "base": {
    type: HTMLBaseElement,
    props: {
      ...globalAttrs,
    },
  },
  "bdi": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "bdo": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "blockquote": {
    type: HTMLQuoteElement,
    props: {
      ...globalAttrs,
    },
  },
  "body": {
    type: HTMLBodyElement,
    props: {
      ...globalAttrs,
    },
  },
  "br": {
    type: HTMLBRElement,
    props: {
      ...globalAttrs,
    },
  },
  "button": {
    type: HTMLButtonElement,
    props: {
      ...globalAttrs,
    },
  },
  "canvas": {
    type: HTMLCanvasElement,
    props: {
      ...globalAttrs,
    },
  },
  "caption": {
    type: HTMLTableCaptionElement,
    props: {
      ...globalAttrs,
    },
  },
  "cite": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "code": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "col": {
    type: HTMLTableColElement,
    props: {
      ...globalAttrs,
    },
  },
  "colgroup": {
    type: HTMLTableColElement,
    props: {
      ...globalAttrs,
    },
  },
  "data": {
    type: HTMLDataElement,
    props: {
      ...globalAttrs,
    },
  },
  "datalist": {
    type: HTMLDataListElement,
    props: {
      ...globalAttrs,
    },
  },
  "dd": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "del": {
    type: HTMLModElement,
    props: {
      ...globalAttrs,
    },
  },
  "details": {
    type: HTMLDetailsElement,
    props: {
      ...globalAttrs,
    },
  },
  "dfn": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "dialog": {
    type: HTMLDialogElement,
    props: {
      ...globalAttrs,
    },
  },
  "div": {
    type: HTMLDivElement,
    props: {
      ...globalAttrs,
    },
  },
  "dl": {
    type: HTMLDListElement,
    props: {
      ...globalAttrs,
    },
  },
  "dt": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "em": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "embed": {
    type: HTMLEmbedElement,
    props: {
      ...globalAttrs,
    },
  },
  "fieldset": {
    type: HTMLFieldSetElement,
    props: {
      ...globalAttrs,
    },
  },
  "figcaption": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "figure": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "footer": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "form": {
    type: HTMLFormElement,
    props: {
      ...globalAttrs,
    },
  },
  "h1": {
    type: HTMLHeadingElement,
    props: {
      ...globalAttrs,
    },
  },
  "h2": {
    type: HTMLHeadingElement,
    props: {
      ...globalAttrs,
    },
  },
  "h3": {
    type: HTMLHeadingElement,
    props: {
      ...globalAttrs,
    },
  },
  "h4": {
    type: HTMLHeadingElement,
    props: {
      ...globalAttrs,
    },
  },
  "h5": {
    type: HTMLHeadingElement,
    props: {
      ...globalAttrs,
    },
  },
  "h6": {
    type: HTMLHeadingElement,
    props: {
      ...globalAttrs,
    },
  },
  "head": {
    type: HTMLHeadElement,
    props: {
      ...globalAttrs,
    },
  },
  "header": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "hgroup": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "hr": {
    type: HTMLHRElement,
    props: {
      ...globalAttrs,
    },
  },
  "html": {
    type: HTMLHtmlElement,
    props: {
      ...globalAttrs,
    },
  },
  "i": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "iframe": {
    type: HTMLIFrameElement,
    props: {
      ...globalAttrs,
    },
  },
  "img": {
    type: HTMLImageElement,
    props: {
      ...globalAttrs,
    },
  },
  "input": {
    type: HTMLInputElement,
    props: {
      ...globalAttrs,
    },
  },
  "ins": {
    type: HTMLModElement,
    props: {
      ...globalAttrs,
    },
  },
  "kbd": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "label": {
    type: HTMLLabelElement,
    props: {
      ...globalAttrs,
    },
  },
  "legend": {
    type: HTMLLegendElement,
    props: {
      ...globalAttrs,
    },
  },
  "li": {
    type: HTMLLIElement,
    props: {
      ...globalAttrs,
    },
  },
  "link": {
    type: HTMLLinkElement,
    props: {
      ...globalAttrs,
    },
  },
  "main": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "map": {
    type: HTMLMapElement,
    props: {
      ...globalAttrs,
    },
  },
  "mark": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "menu": {
    type: HTMLMenuElement,
    props: {
      ...globalAttrs,
    },
  },
  "meta": {
    type: HTMLMetaElement,
    props: {
      ...globalAttrs,
    },
  },
  "meter": {
    type: HTMLMeterElement,
    props: {
      ...globalAttrs,
    },
  },
  "nav": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "noscript": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "object": {
    type: HTMLObjectElement,
    props: {
      ...globalAttrs,
    },
  },
  "ol": {
    type: HTMLOListElement,
    props: {
      ...globalAttrs,
    },
  },
  "optgroup": {
    type: HTMLOptGroupElement,
    props: {
      ...globalAttrs,
    },
  },
  "option": {
    type: HTMLOptionElement,
    props: {
      ...globalAttrs,
    },
  },
  "output": {
    type: HTMLOutputElement,
    props: {
      ...globalAttrs,
    },
  },
  "p": {
    type: HTMLParagraphElement,
    props: {
      ...globalAttrs,
    },
  },
  "picture": {
    type: HTMLPictureElement,
    props: {
      ...globalAttrs,
    },
  },
  "pre": {
    type: HTMLPreElement,
    props: {
      ...globalAttrs,
    },
  },
  "progress": {
    type: HTMLProgressElement,
    props: {
      ...globalAttrs,
    },
  },
  "q": {
    type: HTMLQuoteElement,
    props: {
      ...globalAttrs,
    },
  },
  "rp": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "rt": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "ruby": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "s": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "samp": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "script": {
    type: HTMLScriptElement,
    props: {
      ...globalAttrs,
    },
  },
  "search": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "section": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "select": {
    type: HTMLSelectElement,
    props: {
      ...globalAttrs,
    },
  },
  "slot": {
    type: HTMLSlotElement,
    props: {
      ...globalAttrs,
    },
  },
  "small": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "source": {
    type: HTMLSourceElement,
    props: {
      ...globalAttrs,
    },
  },
  "span": {
    type: HTMLSpanElement,
    props: {
      ...globalAttrs,
    },
  },
  "strong": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "style": {
    type: HTMLStyleElement,
    props: {
      ...globalAttrs,
    },
  },
  "sub": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "summary": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "sup": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "table": {
    type: HTMLTableElement,
    props: {
      ...globalAttrs,
    },
  },
  "tbody": {
    type: HTMLTableSectionElement,
    props: {
      ...globalAttrs,
    },
  },
  "td": {
    type: HTMLTableCellElement,
    props: {
      ...globalAttrs,
    },
  },
  "template": {
    type: HTMLTemplateElement,
    props: {
      ...globalAttrs,
    },
  },
  "textarea": {
    type: HTMLTextAreaElement,
    props: {
      ...globalAttrs,
    },
  },
  "tfoot": {
    type: HTMLTableSectionElement,
    props: {
      ...globalAttrs,
    },
  },
  "th": {
    type: HTMLTableCellElement,
    props: {
      ...globalAttrs,
    },
  },
  "thead": {
    type: HTMLTableSectionElement,
    props: {
      ...globalAttrs,
    },
  },
  "time": {
    type: HTMLTimeElement,
    props: {
      ...globalAttrs,
    },
  },
  "title": {
    type: HTMLTitleElement,
    props: {
      ...globalAttrs,
    },
  },
  "tr": {
    type: HTMLTableRowElement,
    props: {
      ...globalAttrs,
    },
  },
  "track": {
    type: HTMLTrackElement,
    props: {
      ...globalAttrs,
    },
  },
  "u": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "ul": {
    type: HTMLUListElement,
    props: {
      ...globalAttrs,
    },
  },
  "var": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "video": {
    type: HTMLVideoElement,
    props: {
      ...globalAttrs,
    },
  },
  "wbr": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
} as const;

export const HTMLElementDeprecatedTagNameMap = {
  "acronym": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "applet": {
    type: HTMLUnknownElement,
    props: {
      ...globalAttrs,
    },
  },
  "basefont": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "bgsound": {
    type: HTMLUnknownElement,
    props: {
      ...globalAttrs,
    },
  },
  "big": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "blink": {
    type: HTMLUnknownElement,
    props: {
      ...globalAttrs,
    },
  },
  "center": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "dir": {
    type: HTMLDirectoryElement,
    props: {
      ...globalAttrs,
    },
  },
  "font": {
    type: HTMLFontElement,
    props: {
      ...globalAttrs,
    },
  },
  "frame": {
    type: HTMLFrameElement,
    props: {
      ...globalAttrs,
    },
  },
  "frameset": {
    type: HTMLFrameSetElement,
    props: {
      ...globalAttrs,
    },
  },
  "isindex": {
    type: HTMLUnknownElement,
    props: {
      ...globalAttrs,
    },
  },
  "keygen": {
    type: HTMLUnknownElement,
    props: {
      ...globalAttrs,
    },
  },
  "listing": {
    type: HTMLPreElement,
    props: {
      ...globalAttrs,
    },
  },
  "marquee": {
    type: HTMLMarqueeElement,
    props: {
      ...globalAttrs,
    },
  },
  "menuitem": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "multicol": {
    type: HTMLUnknownElement,
    props: {
      ...globalAttrs,
    },
  },
  "nextid": {
    type: HTMLUnknownElement,
    props: {
      ...globalAttrs,
    },
  },
  "nobr": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "noembed": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "noframes": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "param": {
    type: HTMLParamElement,
    props: {
      ...globalAttrs,
    },
  },
  "plaintext": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "rb": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "rtc": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "spacer": {
    type: HTMLUnknownElement,
    props: {
      ...globalAttrs,
    },
  },
  "strike": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "tt": {
    type: HTMLElement,
    props: {
      ...globalAttrs,
    },
  },
  "xmp": {
    type: HTMLPreElement,
    props: {
      ...globalAttrs,
    },
  },
} as const;

