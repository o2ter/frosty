//
//  event.ts
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

export const globalEventHandlersEventMap = {

  // Clipboard Events
  onCopy: null as ClipboardEvent | null,
  onCut: null as ClipboardEvent | null,
  onPaste: null as ClipboardEvent | null,

  // Composition Events
  onCompositionEnd: null as CompositionEvent | null,
  onCompositionStart: null as CompositionEvent | null,
  onCompositionUpdate: null as CompositionEvent | null,

  // Focus Events
  onFocus: null as FocusEvent | null,
  onBlur: null as FocusEvent | null,

  // Form Events
  onFormData: null as FormDataEvent | null,
  onChange: null as Event | null,
  onBeforeInput: null as InputEvent | null,
  onInput: null as Event | null,
  onReset: null as Event | null,
  onSubmit: null as SubmitEvent | null,
  onInvalid: null as Event | null,

  // Image Events
  onLoad: null as Event | null,
  onError: null as Event | null,

  // Keyboard Events
  onKeyDown: null as KeyboardEvent | null,
  /** @deprecated */
  onKeyPress: null as KeyboardEvent | null,
  /** @deprecated */
  onKeyUp: null as KeyboardEvent | null,

  // Media Events
  onAbort: null as Event | null,
  onCanPlay: null as Event | null,
  onCanPlayThrough: null as Event | null,
  onDurationChange: null as Event | null,
  onEmptied: null as Event | null,
  onEncrypted: null as Event | null,
  onEnded: null as Event | null,
  onLoadedData: null as Event | null,
  onLoadedMetadata: null as Event | null,
  onLoadStart: null as Event | null,
  onPause: null as Event | null,
  onPlay: null as Event | null,
  onPlaying: null as Event | null,
  onProgress: null as Event | null,
  onRateChange: null as Event | null,
  onResize: null as Event | null,
  onSeeked: null as Event | null,
  onSeeking: null as Event | null,
  onStalled: null as Event | null,
  onSuspend: null as Event | null,
  onTimeUpdate: null as Event | null,
  onVolumeChange: null as Event | null,
  onWaiting: null as Event | null,

  // MouseEvents
  onAuxClick: null as MouseEvent | null,
  onClick: null as MouseEvent | null,
  onContextMenu: null as MouseEvent | null,
  onDoubleClick: null as MouseEvent | null,
  onDrag: null as DragEvent | null,
  onDragEnd: null as DragEvent | null,
  onDragEnter: null as DragEvent | null,
  onDragExit: null as DragEvent | null,
  onDragLeave: null as DragEvent | null,
  onDragOver: null as DragEvent | null,
  onDragStart: null as DragEvent | null,
  onDrop: null as DragEvent | null,
  onMouseDown: null as MouseEvent | null,
  onMouseEnter: null as MouseEvent | null,
  onMouseLeave: null as MouseEvent | null,
  onMouseMove: null as MouseEvent | null,
  onMouseOut: null as MouseEvent | null,
  onMouseOver: null as MouseEvent | null,
  onMouseUp: null as MouseEvent | null,

  // Selection Events
  onSelect: null as Event | null,

  // Touch Events
  onTouchCancel: null as TouchEvent | null,
  onTouchEnd: null as TouchEvent | null,
  onTouchMove: null as TouchEvent | null,
  onTouchStart: null as TouchEvent | null,

  // Pointer Events
  onPointerDown: null as PointerEvent | null,
  onPointerMove: null as PointerEvent | null,
  onPointerUp: null as PointerEvent | null,
  onPointerCancel: null as PointerEvent | null,
  onPointerEnter: null as PointerEvent | null,
  onPointerLeave: null as PointerEvent | null,
  onPointerOver: null as PointerEvent | null,
  onPointerOut: null as PointerEvent | null,

  // UI Events
  onScroll: null as UIEvent | null,

  // Wheel Events
  onWheel: null as WheelEvent | null,

  // Animation Events
  onAnimationStart: null as AnimationEvent | null,
  onAnimationEnd: null as AnimationEvent | null,
  onAnimationIteration: null as AnimationEvent | null,

  // Transition Events
  onTransitionEnd: null as TransitionEvent | null,

};
