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

export const globalEvents = [

  // Clipboard Events
  "onCopy",
  "onCut",
  "onPaste",

  // Composition Events
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate",

  // Focus Events
  "onFocus",
  "onBlur",

  // Form Events
  "onFormData",
  "onChange",
  "onBeforeInput",
  "onInput",
  "onReset",
  "onSubmit",
  "onInvalid",

  // Image Events
  "onLoad",
  "onError",

  // Keyboard Events
  "onKeyDown",
  /** @deprecated */
  "onKeyPress",
  /** @deprecated */
  "onKeyUp",

  // Media Events
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onResize",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting",

  // MouseEvents
  "onAuxClick",
  "onClick",
  "onContextMenu",
  "onDoubleClick",
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",

  // Selection Events
  "onSelect",

  // Touch Events
  "onTouchCancel",
  "onTouchEnd",
  "onTouchMove",
  "onTouchStart",

  // Pointer Events
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut",

  // UI Events
  "onScroll",

  // Wheel Events
  "onWheel",

  // Animation Events
  "onAnimationStart",
  "onAnimationEnd",
  "onAnimationIteration",

  // Transition Events
  "onTransitionEnd",

] as const;