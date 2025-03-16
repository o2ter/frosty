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
import { StyleProp } from '../common/styles/types';
import { CSSProperties } from './css';

/**
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 */

export const globalAttrs = {
  // Standard HTML Attributes
  accessKey: PropValue.string({ attr: 'accesskey' }),
  autoFocus: PropValue.boolean({ attr: 'autofocus' }),
  className: PropValue.className(),
  contentEditable: PropValue.oneOf([true, false, 'inherit', 'plaintext-only'] as const, { attr: 'contenteditable' }),
  dir: PropValue.string({ attr: 'dir' }),
  draggable: PropValue.boolean({ attr: 'draggable' }),
  hidden: PropValue.boolean({ attr: 'hidden' }),
  id: PropValue.string({ attr: 'id' }),
  lang: PropValue.string({ attr: 'lang' }),
  nonce: PropValue.string({ attr: 'nonce' }),
  slot: PropValue.string({ attr: 'slot' }),
  spellCheck: PropValue.boolean({ attr: 'spellcheck' }),
  style: new PropValue<StyleProp<CSSProperties>>({ attr: 'style' }),
  tabIndex: PropValue.number({ attr: 'tabindex' }),
  title: PropValue.string({ attr: 'title' }),
  translate: PropValue.oneOf(['yes', 'no'] as const, { attr: 'translate' }),

  // WAI-ARIA
  role: PropValue.ariaRole(),

  // RDFa Attributes
  about: PropValue.string({ attr: 'about' }),
  content: PropValue.string({ attr: 'content' }),
  datatype: PropValue.string({ attr: 'datatype' }),
  inlist: PropValue.any({ attr: 'inlist' }),
  prefix: PropValue.string({ attr: 'prefix' }),
  property: PropValue.string({ attr: 'property' }),
  rel: PropValue.string({ attr: 'rel' }),
  resource: PropValue.string({ attr: 'resource' }),
  rev: PropValue.string({ attr: 'rev' }),
  typeof: PropValue.string({ attr: 'typeof' }),
  vocab: PropValue.string({ attr: 'vocab' }),

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see {@link https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute}
   */
  inputMode: PropValue.oneOf(['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'] as const, { attr: 'inputmode' }),
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is}
   */
  is: PropValue.string({ attr: 'is' }),

  innerHTML: PropValue.string({ attr: 'innerHTML' }),

};

type EventHandler<T extends Event> = (event: T) => any;

export const globalEventHandlersEventMap = {

  // Clipboard Events
  onCopy: PropValue.function<EventHandler<ClipboardEvent>>({ attr: 'oncopy' }),
  onCut: PropValue.function<EventHandler<ClipboardEvent>>({ attr: 'oncut' }),
  onPaste: PropValue.function<EventHandler<ClipboardEvent>>({ attr: 'onpaste' }),

  // Composition Events
  onCompositionEnd: PropValue.function<EventHandler<CompositionEvent>>({ attr: 'oncompositionend' }),
  onCompositionStart: PropValue.function<EventHandler<CompositionEvent>>({ attr: 'oncompositionstart' }),
  onCompositionUpdate: PropValue.function<EventHandler<CompositionEvent>>({ attr: 'oncompositionupdate' }),

  // Focus Events
  onFocus: PropValue.function<EventHandler<FocusEvent>>({ attr: 'onfocus' }),
  onBlur: PropValue.function<EventHandler<FocusEvent>>({ attr: 'onblur' }),

  // Form Events
  onFormData: PropValue.function<EventHandler<FormDataEvent>>({ attr: 'onformdata' }),
  onChange: PropValue.function<EventHandler<Event>>({ attr: 'onchange' }),
  onBeforeInput: PropValue.function<EventHandler<InputEvent>>({ attr: 'onbeforeinput' }),
  onInput: PropValue.function<EventHandler<Event>>({ attr: 'oninput' }),
  onReset: PropValue.function<EventHandler<Event>>({ attr: 'onreset' }),
  onSubmit: PropValue.function<EventHandler<SubmitEvent>>({ attr: 'onsubmit' }),
  onInvalid: PropValue.function<EventHandler<Event>>({ attr: 'oninvalid' }),

  // Image Events
  onLoad: PropValue.function<EventHandler<Event>>({ attr: 'onload' }),
  onError: PropValue.function<EventHandler<Event>>({ attr: 'onerror' }),

  // Keyboard Events
  onKeyDown: PropValue.function<EventHandler<KeyboardEvent>>({ attr: 'onkeydown' }),
  /** @deprecated */
  onKeyPress: PropValue.function<EventHandler<KeyboardEvent>>({ attr: 'onkeypress' }),
  /** @deprecated */
  onKeyUp: PropValue.function<EventHandler<KeyboardEvent>>({ attr: 'onkeyup' }),

  // Media Events
  onAbort: PropValue.function<EventHandler<Event>>({ attr: 'onabort' }),
  onCanPlay: PropValue.function<EventHandler<Event>>({ attr: 'oncanplay' }),
  onCanPlayThrough: PropValue.function<EventHandler<Event>>({ attr: 'oncanplaythrough' }),
  onDurationChange: PropValue.function<EventHandler<Event>>({ attr: 'ondurationchange' }),
  onEmptied: PropValue.function<EventHandler<Event>>({ attr: 'onemptied' }),
  onEncrypted: PropValue.function<EventHandler<Event>>({ attr: 'onencrypted' }),
  onEnded: PropValue.function<EventHandler<Event>>({ attr: 'onended' }),
  onLoadedData: PropValue.function<EventHandler<Event>>({ attr: 'onloadeddata' }),
  onLoadedMetadata: PropValue.function<EventHandler<Event>>({ attr: 'onloadedmetadata' }),
  onLoadStart: PropValue.function<EventHandler<Event>>({ attr: 'onloadstart' }),
  onPause: PropValue.function<EventHandler<Event>>({ attr: 'onpause' }),
  onPlay: PropValue.function<EventHandler<Event>>({ attr: 'onplay' }),
  onPlaying: PropValue.function<EventHandler<Event>>({ attr: 'onplaying' }),
  onProgress: PropValue.function<EventHandler<Event>>({ attr: 'onprogress' }),
  onRateChange: PropValue.function<EventHandler<Event>>({ attr: 'onratechange' }),
  onResize: PropValue.function<EventHandler<Event>>({ attr: 'onresize' }),
  onSeeked: PropValue.function<EventHandler<Event>>({ attr: 'onseeked' }),
  onSeeking: PropValue.function<EventHandler<Event>>({ attr: 'onseeking' }),
  onStalled: PropValue.function<EventHandler<Event>>({ attr: 'onstalled' }),
  onSuspend: PropValue.function<EventHandler<Event>>({ attr: 'onsuspend' }),
  onTimeUpdate: PropValue.function<EventHandler<Event>>({ attr: 'ontimeupdate' }),
  onVolumeChange: PropValue.function<EventHandler<Event>>({ attr: 'onvolumechange' }),
  onWaiting: PropValue.function<EventHandler<Event>>({ attr: 'onwaiting' }),

  // MouseEvents
  onAuxClick: PropValue.function<EventHandler<MouseEvent>>({ attr: 'onauxclick' }),
  onClick: PropValue.function<EventHandler<MouseEvent>>({ attr: 'onclick' }),
  onContextMenu: PropValue.function<EventHandler<MouseEvent>>({ attr: 'oncontextmenu' }),
  onDoubleClick: PropValue.function<EventHandler<MouseEvent>>({ attr: 'ondoubleclick' }),
  onDrag: PropValue.function<EventHandler<DragEvent>>({ attr: 'ondrag' }),
  onDragEnd: PropValue.function<EventHandler<DragEvent>>({ attr: 'ondragend' }),
  onDragEnter: PropValue.function<EventHandler<DragEvent>>({ attr: 'ondragenter' }),
  onDragExit: PropValue.function<EventHandler<DragEvent>>({ attr: 'ondragexit' }),
  onDragLeave: PropValue.function<EventHandler<DragEvent>>({ attr: 'ondragleave' }),
  onDragOver: PropValue.function<EventHandler<DragEvent>>({ attr: 'ondragover' }),
  onDragStart: PropValue.function<EventHandler<DragEvent>>({ attr: 'ondragstart' }),
  onDrop: PropValue.function<EventHandler<DragEvent>>({ attr: 'ondrop' }),
  onMouseDown: PropValue.function<EventHandler<MouseEvent>>({ attr: 'onmousedown' }),
  onMouseEnter: PropValue.function<EventHandler<MouseEvent>>({ attr: 'onmouseenter' }),
  onMouseLeave: PropValue.function<EventHandler<MouseEvent>>({ attr: 'onmouseleave' }),
  onMouseMove: PropValue.function<EventHandler<MouseEvent>>({ attr: 'onmousemove' }),
  onMouseOut: PropValue.function<EventHandler<MouseEvent>>({ attr: 'onmouseout' }),
  onMouseOver: PropValue.function<EventHandler<MouseEvent>>({ attr: 'onmouseover' }),
  onMouseUp: PropValue.function<EventHandler<MouseEvent>>({ attr: 'onmouseup' }),

  // Selection Events
  onSelect: PropValue.function<EventHandler<Event>>({ attr: 'onselect' }),

  // Touch Events
  onTouchCancel: PropValue.function<EventHandler<TouchEvent>>({ attr: 'ontouchcancel' }),
  onTouchEnd: PropValue.function<EventHandler<TouchEvent>>({ attr: 'ontouchend' }),
  onTouchMove: PropValue.function<EventHandler<TouchEvent>>({ attr: 'ontouchmove' }),
  onTouchStart: PropValue.function<EventHandler<TouchEvent>>({ attr: 'ontouchstart' }),

  // Pointer Events
  onPointerDown: PropValue.function<EventHandler<PointerEvent>>({ attr: 'onpointerdown' }),
  onPointerMove: PropValue.function<EventHandler<PointerEvent>>({ attr: 'onpointermove' }),
  onPointerUp: PropValue.function<EventHandler<PointerEvent>>({ attr: 'onpointerup' }),
  onPointerCancel: PropValue.function<EventHandler<PointerEvent>>({ attr: 'onpointercancel' }),
  onPointerEnter: PropValue.function<EventHandler<PointerEvent>>({ attr: 'onpointerenter' }),
  onPointerLeave: PropValue.function<EventHandler<PointerEvent>>({ attr: 'onpointerleave' }),
  onPointerOver: PropValue.function<EventHandler<PointerEvent>>({ attr: 'onpointerover' }),
  onPointerOut: PropValue.function<EventHandler<PointerEvent>>({ attr: 'onpointerout' }),

  // UI Events
  onScroll: PropValue.function<EventHandler<UIEvent>>({ attr: 'onscroll' }),

  // Wheel Events
  onWheel: PropValue.function<EventHandler<WheelEvent>>({ attr: 'onwheel' }),

  // Animation Events
  onAnimationStart: PropValue.function<EventHandler<AnimationEvent>>({ attr: 'onanimationstart' }),
  onAnimationEnd: PropValue.function<EventHandler<AnimationEvent>>({ attr: 'onanimationend' }),
  onAnimationIteration: PropValue.function<EventHandler<AnimationEvent>>({ attr: 'onanimationiteration' }),

  // Transition Events
  onTransitionEnd: PropValue.function<EventHandler<TransitionEvent>>({ attr: 'ontransitionend' }),

};

export const HTMLElementTagNameMap = {
  "a": {
    type: HTMLAnchorElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
      download: PropValue.any({ attr: 'download' }),
      href: PropValue.string({ attr: 'href' }),
      hrefLang: PropValue.string({ attr: 'hreflang' }),
      media: PropValue.string({ attr: 'media' }),
      ping: PropValue.string({ attr: 'ping' }),
      target: PropValue.string<
        | '_self'
        | '_blank'
        | '_parent'
        | '_top'
        | (string & {})>({ attr: 'target' }),
      type: PropValue.string({ attr: 'type' }),
      referrerPolicy: PropValue.oneOf(['', 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'] as const, { attr: 'referrerpolicy' }),
    }),
  },
  "abbr": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "address": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "area": {
    type: HTMLAreaElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "article": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "aside": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "audio": {
    type: HTMLAudioElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "b": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "base": {
    type: HTMLBaseElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "bdi": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "bdo": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "blockquote": {
    type: HTMLQuoteElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "body": {
    type: HTMLBodyElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "br": {
    type: HTMLBRElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "button": {
    type: HTMLButtonElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "canvas": {
    type: HTMLCanvasElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "caption": {
    type: HTMLTableCaptionElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "cite": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "code": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "col": {
    type: HTMLTableColElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "colgroup": {
    type: HTMLTableColElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "data": {
    type: HTMLDataElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "datalist": {
    type: HTMLDataListElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "dd": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "del": {
    type: HTMLModElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "details": {
    type: HTMLDetailsElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "dfn": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "dialog": {
    type: HTMLDialogElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "div": {
    type: HTMLDivElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "dl": {
    type: HTMLDListElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "dt": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "em": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "embed": {
    type: HTMLEmbedElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "fieldset": {
    type: HTMLFieldSetElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "figcaption": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "figure": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "footer": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "form": {
    type: HTMLFormElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "h1": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "h2": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "h3": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "h4": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "h5": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "h6": {
    type: HTMLHeadingElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "head": {
    type: HTMLHeadElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "header": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "hgroup": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "hr": {
    type: HTMLHRElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "html": {
    type: HTMLHtmlElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "i": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "iframe": {
    type: HTMLIFrameElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "img": {
    type: HTMLImageElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "input": {
    type: HTMLInputElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "ins": {
    type: HTMLModElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "kbd": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "label": {
    type: HTMLLabelElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "legend": {
    type: HTMLLegendElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "li": {
    type: HTMLLIElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "link": {
    type: HTMLLinkElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "main": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "map": {
    type: HTMLMapElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "mark": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "menu": {
    type: HTMLMenuElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "meta": {
    type: HTMLMetaElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "meter": {
    type: HTMLMeterElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "nav": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "noscript": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "object": {
    type: HTMLObjectElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "ol": {
    type: HTMLOListElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "optgroup": {
    type: HTMLOptGroupElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "option": {
    type: HTMLOptionElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "output": {
    type: HTMLOutputElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "p": {
    type: HTMLParagraphElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "picture": {
    type: HTMLPictureElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "pre": {
    type: HTMLPreElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "progress": {
    type: HTMLProgressElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "q": {
    type: HTMLQuoteElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "rp": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "rt": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "ruby": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "s": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "samp": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "script": {
    type: HTMLScriptElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "search": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "section": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "select": {
    type: HTMLSelectElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "slot": {
    type: HTMLSlotElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "small": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "source": {
    type: HTMLSourceElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "span": {
    type: HTMLSpanElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "strong": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "style": {
    type: HTMLStyleElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "sub": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "summary": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "sup": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "table": {
    type: HTMLTableElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "tbody": {
    type: HTMLTableSectionElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "td": {
    type: HTMLTableCellElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "template": {
    type: HTMLTemplateElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "textarea": {
    type: HTMLTextAreaElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "tfoot": {
    type: HTMLTableSectionElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "th": {
    type: HTMLTableCellElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "thead": {
    type: HTMLTableSectionElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "time": {
    type: HTMLTimeElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "title": {
    type: HTMLTitleElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "tr": {
    type: HTMLTableRowElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "track": {
    type: HTMLTrackElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "u": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "ul": {
    type: HTMLUListElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "var": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "video": {
    type: HTMLVideoElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "wbr": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
} as const;

export const HTMLElementDeprecatedTagNameMap = {
  "acronym": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "applet": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "basefont": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "bgsound": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "big": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "blink": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "center": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "dir": {
    type: HTMLDirectoryElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "font": {
    type: HTMLFontElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "frame": {
    type: HTMLFrameElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "frameset": {
    type: HTMLFrameSetElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "isindex": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "keygen": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "listing": {
    type: HTMLPreElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "marquee": {
    type: HTMLMarqueeElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "menuitem": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "multicol": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "nextid": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "nobr": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "noembed": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "noframes": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "param": {
    type: HTMLParamElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "plaintext": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "rb": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "rtc": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "spacer": {
    type: HTMLUnknownElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "strike": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "tt": {
    type: HTMLElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
  "xmp": {
    type: HTMLPreElement,
    props: _.assign({}, globalAttrs, globalEventHandlersEventMap, {
    }),
  },
} as const;

