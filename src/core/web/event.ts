//
//  event.ts
//
//  The MIT License
//  Copyright (c) 2021 - 2026 O2ter Limited. All rights reserved.
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

export const globalEvents = {

  // Clipboard Events
  "onCopy": "copy",
  "onCut": "cut",
  "onPaste": "paste",

  // Composition Events
  "onCompositionEnd": "compositionend",
  "onCompositionStart": "compositionstart",
  "onCompositionUpdate": "compositionupdate",

  // Focus Events
  "onFocus": "focus",
  "onBlur": "blur",

  // Form Events
  "onFormData": "formdata",
  "onChange": "change",
  "onBeforeInput": "beforeinput",
  "onInput": "input",
  "onReset": "reset",
  "onSubmit": "submit",
  "onInvalid": "invalid",

  // Image Events
  "onLoad": "load",
  "onError": "error",

  // Keyboard Events
  "onKeyDown": "keydown",
  /** @deprecated */
  "onKeyPress": "keypress",
  /** @deprecated */
  "onKeyUp": "keyup",

  // Media Events
  "onAbort": "abort",
  "onCanPlay": "canplay",
  "onCanPlayThrough": "canplaythrough",
  "onDurationChange": "durationchange",
  "onEmptied": "emptied",
  "onEncrypted": "encrypted",
  "onEnded": "ended",
  "onLoadedData": "loadeddata",
  "onLoadedMetadata": "loadedmetadata",
  "onLoadStart": "loadstart",
  "onPause": "pause",
  "onPlay": "play",
  "onPlaying": "playing",
  "onProgress": "progress",
  "onRateChange": "ratechange",
  "onResize": "resize",
  "onSeeked": "seeked",
  "onSeeking": "seeking",
  "onStalled": "stalled",
  "onSuspend": "suspend",
  "onTimeUpdate": "timeupdate",
  "onVolumeChange": "volumechange",
  "onWaiting": "waiting",

  // MouseEvents
  "onAuxClick": "auxclick",
  "onClick": "click",
  "onContextMenu": "contextmenu",
  "onDoubleClick": "dblclick",
  "onDrag": "drag",
  "onDragEnd": "dragend",
  "onDragEnter": "dragenter",
  "onDragExit": "dragexit",
  "onDragLeave": "dragleave",
  "onDragOver": "dragover",
  "onDragStart": "dragstart",
  "onDrop": "drop",
  "onMouseDown": "mousedown",
  "onMouseEnter": "mouseenter",
  "onMouseLeave": "mouseleave",
  "onMouseMove": "mousemove",
  "onMouseOut": "mouseout",
  "onMouseOver": "mouseover",
  "onMouseUp": "mouseup",

  // Selection Events
  "onSelect": "select",

  // Touch Events
  "onTouchCancel": "touchcancel",
  "onTouchEnd": "touchend",
  "onTouchMove": "touchmove",
  "onTouchStart": "touchstart",

  // Pointer Events
  "onPointerDown": "pointerdown",
  "onPointerMove": "pointermove",
  "onPointerUp": "pointerup",
  "onPointerCancel": "pointercancel",
  "onPointerEnter": "pointerenter",
  "onPointerLeave": "pointerleave",
  "onPointerOver": "pointerover",
  "onPointerOut": "pointerout",

  // UI Events
  "onScroll": "scroll",

  // Wheel Events
  "onWheel": "wheel",

  // Animation Events
  "onAnimationStart": "animationstart",
  "onAnimationEnd": "animationend",
  "onAnimationIteration": "animationiteration",

  // Transition Events
  "onTransitionEnd": "transitionend",

} as const;

export const globalEventKeys = _.keys(globalEvents);