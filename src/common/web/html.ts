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

import { PropValue } from './props';

/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 */

export const HTMLElementTagNameMap = {
  "a": {
    type: HTMLAnchorElement,
    props: {
      href: PropValue.string,
    },
  },
  "abbr": {
    type: HTMLElement,
    props: {},
  },
  "address": {
    type: HTMLElement,
    props: {},
  },
  "area": {
    type: HTMLAreaElement,
    props: {},
  },
  "article": {
    type: HTMLElement,
    props: {},
  },
  "aside": {
    type: HTMLElement,
    props: {},
  },
  "audio": {
    type: HTMLAudioElement,
    props: {},
  },
  "b": {
    type: HTMLElement,
    props: {},
  },
  "base": {
    type: HTMLBaseElement,
    props: {},
  },
  "bdi": {
    type: HTMLElement,
    props: {},
  },
  "bdo": {
    type: HTMLElement,
    props: {},
  },
  "blockquote": {
    type: HTMLQuoteElement,
    props: {},
  },
  "body": {
    type: HTMLBodyElement,
    props: {},
  },
  "br": {
    type: HTMLBRElement,
    props: {},
  },
  "button": {
    type: HTMLButtonElement,
    props: {},
  },
  "canvas": {
    type: HTMLCanvasElement,
    props: {},
  },
  "caption": {
    type: HTMLTableCaptionElement,
    props: {},
  },
  "cite": {
    type: HTMLElement,
    props: {},
  },
  "code": {
    type: HTMLElement,
    props: {},
  },
  "col": {
    type: HTMLTableColElement,
    props: {},
  },
  "colgroup": {
    type: HTMLTableColElement,
    props: {},
  },
  "data": {
    type: HTMLDataElement,
    props: {},
  },
  "datalist": {
    type: HTMLDataListElement,
    props: {},
  },
  "dd": {
    type: HTMLElement,
    props: {},
  },
  "del": {
    type: HTMLModElement,
    props: {},
  },
  "details": {
    type: HTMLDetailsElement,
    props: {},
  },
  "dfn": {
    type: HTMLElement,
    props: {},
  },
  "dialog": {
    type: HTMLDialogElement,
    props: {},
  },
  "div": {
    type: HTMLDivElement,
    props: {},
  },
  "dl": {
    type: HTMLDListElement,
    props: {},
  },
  "dt": {
    type: HTMLElement,
    props: {},
  },
  "em": {
    type: HTMLElement,
    props: {},
  },
  "embed": {
    type: HTMLEmbedElement,
    props: {},
  },
  "fieldset": {
    type: HTMLFieldSetElement,
    props: {},
  },
  "figcaption": {
    type: HTMLElement,
    props: {},
  },
  "figure": {
    type: HTMLElement,
    props: {},
  },
  "footer": {
    type: HTMLElement,
    props: {},
  },
  "form": {
    type: HTMLFormElement,
    props: {},
  },
  "h1": {
    type: HTMLHeadingElement,
    props: {},
  },
  "h2": {
    type: HTMLHeadingElement,
    props: {},
  },
  "h3": {
    type: HTMLHeadingElement,
    props: {},
  },
  "h4": {
    type: HTMLHeadingElement,
    props: {},
  },
  "h5": {
    type: HTMLHeadingElement,
    props: {},
  },
  "h6": {
    type: HTMLHeadingElement,
    props: {},
  },
  "head": {
    type: HTMLHeadElement,
    props: {},
  },
  "header": {
    type: HTMLElement,
    props: {},
  },
  "hgroup": {
    type: HTMLElement,
    props: {},
  },
  "hr": {
    type: HTMLHRElement,
    props: {},
  },
  "html": {
    type: HTMLHtmlElement,
    props: {},
  },
  "i": {
    type: HTMLElement,
    props: {},
  },
  "iframe": {
    type: HTMLIFrameElement,
    props: {},
  },
  "img": {
    type: HTMLImageElement,
    props: {},
  },
  "input": {
    type: HTMLInputElement,
    props: {},
  },
  "ins": {
    type: HTMLModElement,
    props: {},
  },
  "kbd": {
    type: HTMLElement,
    props: {},
  },
  "label": {
    type: HTMLLabelElement,
    props: {},
  },
  "legend": {
    type: HTMLLegendElement,
    props: {},
  },
  "li": {
    type: HTMLLIElement,
    props: {},
  },
  "link": {
    type: HTMLLinkElement,
    props: {},
  },
  "main": {
    type: HTMLElement,
    props: {},
  },
  "map": {
    type: HTMLMapElement,
    props: {},
  },
  "mark": {
    type: HTMLElement,
    props: {},
  },
  "menu": {
    type: HTMLMenuElement,
    props: {},
  },
  "meta": {
    type: HTMLMetaElement,
    props: {},
  },
  "meter": {
    type: HTMLMeterElement,
    props: {},
  },
  "nav": {
    type: HTMLElement,
    props: {},
  },
  "noscript": {
    type: HTMLElement,
    props: {},
  },
  "object": {
    type: HTMLObjectElement,
    props: {},
  },
  "ol": {
    type: HTMLOListElement,
    props: {},
  },
  "optgroup": {
    type: HTMLOptGroupElement,
    props: {},
  },
  "option": {
    type: HTMLOptionElement,
    props: {},
  },
  "output": {
    type: HTMLOutputElement,
    props: {},
  },
  "p": {
    type: HTMLParagraphElement,
    props: {},
  },
  "picture": {
    type: HTMLPictureElement,
    props: {},
  },
  "pre": {
    type: HTMLPreElement,
    props: {},
  },
  "progress": {
    type: HTMLProgressElement,
    props: {},
  },
  "q": {
    type: HTMLQuoteElement,
    props: {},
  },
  "rp": {
    type: HTMLElement,
    props: {},
  },
  "rt": {
    type: HTMLElement,
    props: {},
  },
  "ruby": {
    type: HTMLElement,
    props: {},
  },
  "s": {
    type: HTMLElement,
    props: {},
  },
  "samp": {
    type: HTMLElement,
    props: {},
  },
  "script": {
    type: HTMLScriptElement,
    props: {},
  },
  "search": {
    type: HTMLElement,
    props: {},
  },
  "section": {
    type: HTMLElement,
    props: {},
  },
  "select": {
    type: HTMLSelectElement,
    props: {},
  },
  "slot": {
    type: HTMLSlotElement,
    props: {},
  },
  "small": {
    type: HTMLElement,
    props: {},
  },
  "source": {
    type: HTMLSourceElement,
    props: {},
  },
  "span": {
    type: HTMLSpanElement,
    props: {},
  },
  "strong": {
    type: HTMLElement,
    props: {},
  },
  "style": {
    type: HTMLStyleElement,
    props: {},
  },
  "sub": {
    type: HTMLElement,
    props: {},
  },
  "summary": {
    type: HTMLElement,
    props: {},
  },
  "sup": {
    type: HTMLElement,
    props: {},
  },
  "table": {
    type: HTMLTableElement,
    props: {},
  },
  "tbody": {
    type: HTMLTableSectionElement,
    props: {},
  },
  "td": {
    type: HTMLTableCellElement,
    props: {},
  },
  "template": {
    type: HTMLTemplateElement,
    props: {},
  },
  "textarea": {
    type: HTMLTextAreaElement,
    props: {},
  },
  "tfoot": {
    type: HTMLTableSectionElement,
    props: {},
  },
  "th": {
    type: HTMLTableCellElement,
    props: {},
  },
  "thead": {
    type: HTMLTableSectionElement,
    props: {},
  },
  "time": {
    type: HTMLTimeElement,
    props: {},
  },
  "title": {
    type: HTMLTitleElement,
    props: {},
  },
  "tr": {
    type: HTMLTableRowElement,
    props: {},
  },
  "track": {
    type: HTMLTrackElement,
    props: {},
  },
  "u": {
    type: HTMLElement,
    props: {},
  },
  "ul": {
    type: HTMLUListElement,
    props: {},
  },
  "var": {
    type: HTMLElement,
    props: {},
  },
  "video": {
    type: HTMLVideoElement,
    props: {},
  },
  "wbr": {
    type: HTMLElement,
    props: {},
  },
} as const;

export const HTMLElementDeprecatedTagNameMap = {
  "acronym": {
    type: HTMLElement,
    props: {},
  },
  "applet": {
    type: HTMLUnknownElement,
    props: {},
  },
  "basefont": {
    type: HTMLElement,
    props: {},
  },
  "bgsound": {
    type: HTMLUnknownElement,
    props: {},
  },
  "big": {
    type: HTMLElement,
    props: {},
  },
  "blink": {
    type: HTMLUnknownElement,
    props: {},
  },
  "center": {
    type: HTMLElement,
    props: {},
  },
  "dir": {
    type: HTMLDirectoryElement,
    props: {},
  },
  "font": {
    type: HTMLFontElement,
    props: {},
  },
  "frame": {
    type: HTMLFrameElement,
    props: {},
  },
  "frameset": {
    type: HTMLFrameSetElement,
    props: {},
  },
  "isindex": {
    type: HTMLUnknownElement,
    props: {},
  },
  "keygen": {
    type: HTMLUnknownElement,
    props: {},
  },
  "listing": {
    type: HTMLPreElement,
    props: {},
  },
  "marquee": {
    type: HTMLMarqueeElement,
    props: {},
  },
  "menuitem": {
    type: HTMLElement,
    props: {},
  },
  "multicol": {
    type: HTMLUnknownElement,
    props: {},
  },
  "nextid": {
    type: HTMLUnknownElement,
    props: {},
  },
  "nobr": {
    type: HTMLElement,
    props: {},
  },
  "noembed": {
    type: HTMLElement,
    props: {},
  },
  "noframes": {
    type: HTMLElement,
    props: {},
  },
  "param": {
    type: HTMLParamElement,
    props: {},
  },
  "plaintext": {
    type: HTMLElement,
    props: {},
  },
  "rb": {
    type: HTMLElement,
    props: {},
  },
  "rtc": {
    type: HTMLElement,
    props: {},
  },
  "spacer": {
    type: HTMLUnknownElement,
    props: {},
  },
  "strike": {
    type: HTMLElement,
    props: {},
  },
  "tt": {
    type: HTMLElement,
    props: {},
  },
  "xmp": {
    type: HTMLPreElement,
    props: {},
  },
} as const;

