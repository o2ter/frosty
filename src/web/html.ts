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

export const HTMLElementTagNameMap = {
  "a": {
    type: HTMLAnchorElement,
  },
  "abbr": {
    type: HTMLElement,
  },
  "address": {
    type: HTMLElement,
  },
  "area": {
    type: HTMLAreaElement,
  },
  "article": {
    type: HTMLElement,
  },
  "aside": {
    type: HTMLElement,
  },
  "audio": {
    type: HTMLAudioElement,
  },
  "b": {
    type: HTMLElement,
  },
  "base": {
    type: HTMLBaseElement,
  },
  "bdi": {
    type: HTMLElement,
  },
  "bdo": {
    type: HTMLElement,
  },
  "blockquote": {
    type: HTMLQuoteElement,
  },
  "body": {
    type: HTMLBodyElement,
  },
  "br": {
    type: HTMLBRElement,
  },
  "button": {
    type: HTMLButtonElement,
  },
  "canvas": {
    type: HTMLCanvasElement,
  },
  "caption": {
    type: HTMLTableCaptionElement,
  },
  "cite": {
    type: HTMLElement,
  },
  "code": {
    type: HTMLElement,
  },
  "col": {
    type: HTMLTableColElement,
  },
  "colgroup": {
    type: HTMLTableColElement,
  },
  "data": {
    type: HTMLDataElement,
  },
  "datalist": {
    type: HTMLDataListElement,
  },
  "dd": {
    type: HTMLElement,
  },
  "del": {
    type: HTMLModElement,
  },
  "details": {
    type: HTMLDetailsElement,
  },
  "dfn": {
    type: HTMLElement,
  },
  "dialog": {
    type: HTMLDialogElement,
  },
  "div": {
    type: HTMLDivElement,
  },
  "dl": {
    type: HTMLDListElement,
  },
  "dt": {
    type: HTMLElement,
  },
  "em": {
    type: HTMLElement,
  },
  "embed": {
    type: HTMLEmbedElement,
  },
  "fieldset": {
    type: HTMLFieldSetElement,
  },
  "figcaption": {
    type: HTMLElement,
  },
  "figure": {
    type: HTMLElement,
  },
  "footer": {
    type: HTMLElement,
  },
  "form": {
    type: HTMLFormElement,
  },
  "h1": {
    type: HTMLHeadingElement,
  },
  "h2": {
    type: HTMLHeadingElement,
  },
  "h3": {
    type: HTMLHeadingElement,
  },
  "h4": {
    type: HTMLHeadingElement,
  },
  "h5": {
    type: HTMLHeadingElement,
  },
  "h6": {
    type: HTMLHeadingElement,
  },
  "head": {
    type: HTMLHeadElement,
  },
  "header": {
    type: HTMLElement,
  },
  "hgroup": {
    type: HTMLElement,
  },
  "hr": {
    type: HTMLHRElement,
  },
  "html": {
    type: HTMLHtmlElement,
  },
  "i": {
    type: HTMLElement,
  },
  "iframe": {
    type: HTMLIFrameElement,
  },
  "img": {
    type: HTMLImageElement,
  },
  "input": {
    type: HTMLInputElement,
  },
  "ins": {
    type: HTMLModElement,
  },
  "kbd": {
    type: HTMLElement,
  },
  "label": {
    type: HTMLLabelElement,
  },
  "legend": {
    type: HTMLLegendElement,
  },
  "li": {
    type: HTMLLIElement,
  },
  "link": {
    type: HTMLLinkElement,
  },
  "main": {
    type: HTMLElement,
  },
  "map": {
    type: HTMLMapElement,
  },
  "mark": {
    type: HTMLElement,
  },
  "menu": {
    type: HTMLMenuElement,
  },
  "meta": {
    type: HTMLMetaElement,
  },
  "meter": {
    type: HTMLMeterElement,
  },
  "nav": {
    type: HTMLElement,
  },
  "noscript": {
    type: HTMLElement,
  },
  "object": {
    type: HTMLObjectElement,
  },
  "ol": {
    type: HTMLOListElement,
  },
  "optgroup": {
    type: HTMLOptGroupElement,
  },
  "option": {
    type: HTMLOptionElement,
  },
  "output": {
    type: HTMLOutputElement,
  },
  "p": {
    type: HTMLParagraphElement,
  },
  "picture": {
    type: HTMLPictureElement,
  },
  "pre": {
    type: HTMLPreElement,
  },
  "progress": {
    type: HTMLProgressElement,
  },
  "q": {
    type: HTMLQuoteElement,
  },
  "rp": {
    type: HTMLElement,
  },
  "rt": {
    type: HTMLElement,
  },
  "ruby": {
    type: HTMLElement,
  },
  "s": {
    type: HTMLElement,
  },
  "samp": {
    type: HTMLElement,
  },
  "script": {
    type: HTMLScriptElement,
  },
  "search": {
    type: HTMLElement,
  },
  "section": {
    type: HTMLElement,
  },
  "select": {
    type: HTMLSelectElement,
  },
  "slot": {
    type: HTMLSlotElement,
  },
  "small": {
    type: HTMLElement,
  },
  "source": {
    type: HTMLSourceElement,
  },
  "span": {
    type: HTMLSpanElement,
  },
  "strong": {
    type: HTMLElement,
  },
  "style": {
    type: HTMLStyleElement,
  },
  "sub": {
    type: HTMLElement,
  },
  "summary": {
    type: HTMLElement,
  },
  "sup": {
    type: HTMLElement,
  },
  "table": {
    type: HTMLTableElement,
  },
  "tbody": {
    type: HTMLTableSectionElement,
  },
  "td": {
    type: HTMLTableCellElement,
  },
  "template": {
    type: HTMLTemplateElement,
  },
  "textarea": {
    type: HTMLTextAreaElement,
  },
  "tfoot": {
    type: HTMLTableSectionElement,
  },
  "th": {
    type: HTMLTableCellElement,
  },
  "thead": {
    type: HTMLTableSectionElement,
  },
  "time": {
    type: HTMLTimeElement,
  },
  "title": {
    type: HTMLTitleElement,
  },
  "tr": {
    type: HTMLTableRowElement,
  },
  "track": {
    type: HTMLTrackElement,
  },
  "u": {
    type: HTMLElement,
  },
  "ul": {
    type: HTMLUListElement,
  },
  "var": {
    type: HTMLElement,
  },
  "video": {
    type: HTMLVideoElement,
  },
  "wbr": {
    type: HTMLElement,
  },
} as const;

export const HTMLElementDeprecatedTagNameMap = {
  "acronym": {
    type: HTMLElement,
  },
  "applet": {
    type: HTMLUnknownElement,
  },
  "basefont": {
    type: HTMLElement,
  },
  "bgsound": {
    type: HTMLUnknownElement,
  },
  "big": {
    type: HTMLElement,
  },
  "blink": {
    type: HTMLUnknownElement,
  },
  "center": {
    type: HTMLElement,
  },
  "dir": {
    type: HTMLDirectoryElement,
  },
  "font": {
    type: HTMLFontElement,
  },
  "frame": {
    type: HTMLFrameElement,
  },
  "frameset": {
    type: HTMLFrameSetElement,
  },
  "isindex": {
    type: HTMLUnknownElement,
  },
  "keygen": {
    type: HTMLUnknownElement,
  },
  "listing": {
    type: HTMLPreElement,
  },
  "marquee": {
    type: HTMLMarqueeElement,
  },
  "menuitem": {
    type: HTMLElement,
  },
  "multicol": {
    type: HTMLUnknownElement,
  },
  "nextid": {
    type: HTMLUnknownElement,
  },
  "nobr": {
    type: HTMLElement,
  },
  "noembed": {
    type: HTMLElement,
  },
  "noframes": {
    type: HTMLElement,
  },
  "param": {
    type: HTMLParamElement,
  },
  "plaintext": {
    type: HTMLElement,
  },
  "rb": {
    type: HTMLElement,
  },
  "rtc": {
    type: HTMLElement,
  },
  "spacer": {
    type: HTMLUnknownElement,
  },
  "strike": {
    type: HTMLElement,
  },
  "tt": {
    type: HTMLElement,
  },
  "xmp": {
    type: HTMLPreElement,
  },
} as const;

