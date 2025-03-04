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
import { StyleProp } from '~/common/styles/types';
import * as CSS from 'csstype';
import { CSSProperties } from './css';

/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 */

const globalAttrs = {
  // Standard HTML Attributes
  accessKey: PropValue.string(),
  autoFocus: PropValue.boolean(),
  className: PropValue.className(),
  contentEditable: PropValue.oneOf([true, false, 'inherit', 'plaintext-only'] as const),
  contextMenu: PropValue.string(),
  dir: PropValue.string(),
  draggable: PropValue.boolean(),
  hidden: PropValue.boolean(),
  id: PropValue.string(),
  lang: PropValue.string(),
  nonce: PropValue.string(),
  slot: PropValue.string(),
  spellCheck: PropValue.boolean(),
  style: new PropValue<StyleProp<CSSProperties>>({}),
  tabIndex: PropValue.number(),
  title: PropValue.string(),
  translate: PropValue.oneOf(['yes', 'no'] as const),

  // Unknown
  radioGroup: PropValue.string(), // <command>, <menuitem>

  // WAI-ARIA
  role: PropValue.ariaRole(),

  // RDFa Attributes
  about: PropValue.string(),
  content: PropValue.string(),
  datatype: PropValue.string(),
  inlist: PropValue.any(),
  prefix: PropValue.string(),
  property: PropValue.string(),
  rel: PropValue.string(),
  resource: PropValue.string(),
  rev: PropValue.string(),
  typeof: PropValue.string(),
  vocab: PropValue.string(),

  // Non-standard Attributes
  autoCapitalize: PropValue.string(),
  autoCorrect: PropValue.string(),
  autoSave: PropValue.string(),
  color: PropValue.string(),
  itemProp: PropValue.string(),
  itemScope: PropValue.boolean(),
  itemType: PropValue.string(),
  itemID: PropValue.string(),
  itemRef: PropValue.string(),
  results: PropValue.number(),
  security: PropValue.string(),
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
  is: PropValue.string(),

  innerHTML: PropValue.string(),
};

export const HTMLElementTagNameMap = {
  "a": {
    type: HTMLAnchorElement,
    props: _.assign({}, globalAttrs, {
      download: PropValue.any(),
      href: PropValue.string(),
      hrefLang: PropValue.string(),
      media: PropValue.string(),
      ping: PropValue.string(),
      target: PropValue.string<
        | '_self'
        | '_blank'
        | '_parent'
        | '_top'
        | (string & {})>(),
      type: PropValue.string(),
      referrerPolicy: PropValue.oneOf(['', 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'] as const),
    }),
  },
  "abbr": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "address": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "area": {
    type: HTMLAreaElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "article": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "aside": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "audio": {
    type: HTMLAudioElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "b": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "base": {
    type: HTMLBaseElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "bdi": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "bdo": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "blockquote": {
    type: HTMLQuoteElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "body": {
    type: HTMLBodyElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "br": {
    type: HTMLBRElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "button": {
    type: HTMLButtonElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "canvas": {
    type: HTMLCanvasElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "caption": {
    type: HTMLTableCaptionElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "cite": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "code": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "col": {
    type: HTMLTableColElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "colgroup": {
    type: HTMLTableColElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "data": {
    type: HTMLDataElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "datalist": {
    type: HTMLDataListElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "dd": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "del": {
    type: HTMLModElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "details": {
    type: HTMLDetailsElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "dfn": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "dialog": {
    type: HTMLDialogElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "div": {
    type: HTMLDivElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "dl": {
    type: HTMLDListElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "dt": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "em": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "embed": {
    type: HTMLEmbedElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "fieldset": {
    type: HTMLFieldSetElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "figcaption": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "figure": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "footer": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "form": {
    type: HTMLFormElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "h1": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "h2": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "h3": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "h4": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "h5": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "h6": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "head": {
    type: HTMLHeadElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "header": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "hgroup": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "hr": {
    type: HTMLHRElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "html": {
    type: HTMLHtmlElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "i": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "iframe": {
    type: HTMLIFrameElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "img": {
    type: HTMLImageElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "input": {
    type: HTMLInputElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "ins": {
    type: HTMLModElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "kbd": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "label": {
    type: HTMLLabelElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "legend": {
    type: HTMLLegendElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "li": {
    type: HTMLLIElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "link": {
    type: HTMLLinkElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "main": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "map": {
    type: HTMLMapElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "mark": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "menu": {
    type: HTMLMenuElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "meta": {
    type: HTMLMetaElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "meter": {
    type: HTMLMeterElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "nav": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "noscript": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "object": {
    type: HTMLObjectElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "ol": {
    type: HTMLOListElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "optgroup": {
    type: HTMLOptGroupElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "option": {
    type: HTMLOptionElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "output": {
    type: HTMLOutputElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "p": {
    type: HTMLParagraphElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "picture": {
    type: HTMLPictureElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "pre": {
    type: HTMLPreElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "progress": {
    type: HTMLProgressElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "q": {
    type: HTMLQuoteElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "rp": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "rt": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "ruby": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "s": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "samp": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "script": {
    type: HTMLScriptElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "search": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "section": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "select": {
    type: HTMLSelectElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "slot": {
    type: HTMLSlotElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "small": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "source": {
    type: HTMLSourceElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "span": {
    type: HTMLSpanElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "strong": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "style": {
    type: HTMLStyleElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "sub": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "summary": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "sup": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "table": {
    type: HTMLTableElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "tbody": {
    type: HTMLTableSectionElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "td": {
    type: HTMLTableCellElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "template": {
    type: HTMLTemplateElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "textarea": {
    type: HTMLTextAreaElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "tfoot": {
    type: HTMLTableSectionElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "th": {
    type: HTMLTableCellElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "thead": {
    type: HTMLTableSectionElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "time": {
    type: HTMLTimeElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "title": {
    type: HTMLTitleElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "tr": {
    type: HTMLTableRowElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "track": {
    type: HTMLTrackElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "u": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "ul": {
    type: HTMLUListElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "var": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "video": {
    type: HTMLVideoElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "wbr": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
} as const;

export const HTMLElementDeprecatedTagNameMap = {
  "acronym": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "applet": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "basefont": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "bgsound": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "big": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "blink": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "center": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "dir": {
    type: HTMLDirectoryElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "font": {
    type: HTMLFontElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "frame": {
    type: HTMLFrameElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "frameset": {
    type: HTMLFrameSetElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "isindex": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "keygen": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "listing": {
    type: HTMLPreElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "marquee": {
    type: HTMLMarqueeElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "menuitem": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "multicol": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "nextid": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "nobr": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "noembed": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "noframes": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "param": {
    type: HTMLParamElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "plaintext": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "rb": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "rtc": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "spacer": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "strike": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "tt": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
  "xmp": {
    type: HTMLPreElement,
    props: _.assign({}, globalAttrs, {
    }),
  },
} as const;

