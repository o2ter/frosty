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

type EventHandler<T extends Event> = (event: T) => any;

export const globalEventHandlersEventMap = {

  // Clipboard Events
  onCopy: (() => {}) as EventHandler<ClipboardEvent>,
  onCut: (() => {}) as EventHandler<ClipboardEvent>,
  onPaste: (() => {}) as EventHandler<ClipboardEvent>,

  // Composition Events
  onCompositionEnd: (() => {}) as EventHandler<CompositionEvent>,
  onCompositionStart: (() => {}) as EventHandler<CompositionEvent>,
  onCompositionUpdate: (() => {}) as EventHandler<CompositionEvent>,

  // Focus Events
  onFocus: (() => {}) as EventHandler<FocusEvent>,
  onBlur: (() => {}) as EventHandler<FocusEvent>,

  // Form Events
  onFormData: (() => {}) as EventHandler<FormDataEvent>,
  onChange: (() => {}) as EventHandler<Event>,
  onBeforeInput: (() => {}) as EventHandler<InputEvent>,
  onInput: (() => {}) as EventHandler<Event>,
  onReset: (() => {}) as EventHandler<Event>,
  onSubmit: (() => {}) as EventHandler<SubmitEvent>,
  onInvalid: (() => {}) as EventHandler<Event>,

  // Image Events
  onLoad: (() => {}) as EventHandler<Event>,
  onError: (() => {}) as EventHandler<Event>,

  // Keyboard Events
  onKeyDown: (() => {}) as EventHandler<KeyboardEvent>,
  /** @deprecated */
  onKeyPress: (() => {}) as EventHandler<KeyboardEvent>,
  /** @deprecated */
  onKeyUp: (() => {}) as EventHandler<KeyboardEvent>,

  // Media Events
  onAbort: (() => {}) as EventHandler<Event>,
  onCanPlay: (() => {}) as EventHandler<Event>,
  onCanPlayThrough: (() => {}) as EventHandler<Event>,
  onDurationChange: (() => {}) as EventHandler<Event>,
  onEmptied: (() => {}) as EventHandler<Event>,
  onEncrypted: (() => {}) as EventHandler<Event>,
  onEnded: (() => {}) as EventHandler<Event>,
  onLoadedData: (() => {}) as EventHandler<Event>,
  onLoadedMetadata: (() => {}) as EventHandler<Event>,
  onLoadStart: (() => {}) as EventHandler<Event>,
  onPause: (() => {}) as EventHandler<Event>,
  onPlay: (() => {}) as EventHandler<Event>,
  onPlaying: (() => {}) as EventHandler<Event>,
  onProgress: (() => {}) as EventHandler<Event>,
  onRateChange: (() => {}) as EventHandler<Event>,
  onResize: (() => {}) as EventHandler<Event>,
  onSeeked: (() => {}) as EventHandler<Event>,
  onSeeking: (() => {}) as EventHandler<Event>,
  onStalled: (() => {}) as EventHandler<Event>,
  onSuspend: (() => {}) as EventHandler<Event>,
  onTimeUpdate: (() => {}) as EventHandler<Event>,
  onVolumeChange: (() => {}) as EventHandler<Event>,
  onWaiting: (() => {}) as EventHandler<Event>,

  // MouseEvents
  onAuxClick: (() => {}) as EventHandler<MouseEvent>,
  onClick: (() => {}) as EventHandler<MouseEvent>,
  onContextMenu: (() => {}) as EventHandler<MouseEvent>,
  onDoubleClick: (() => {}) as EventHandler<MouseEvent>,
  onDrag: (() => {}) as EventHandler<DragEvent>,
  onDragEnd: (() => {}) as EventHandler<DragEvent>,
  onDragEnter: (() => {}) as EventHandler<DragEvent>,
  onDragExit: (() => {}) as EventHandler<DragEvent>,
  onDragLeave: (() => {}) as EventHandler<DragEvent>,
  onDragOver: (() => {}) as EventHandler<DragEvent>,
  onDragStart: (() => {}) as EventHandler<DragEvent>,
  onDrop: (() => {}) as EventHandler<DragEvent>,
  onMouseDown: (() => {}) as EventHandler<MouseEvent>,
  onMouseEnter: (() => {}) as EventHandler<MouseEvent>,
  onMouseLeave: (() => {}) as EventHandler<MouseEvent>,
  onMouseMove: (() => {}) as EventHandler<MouseEvent>,
  onMouseOut: (() => {}) as EventHandler<MouseEvent>,
  onMouseOver: (() => {}) as EventHandler<MouseEvent>,
  onMouseUp: (() => {}) as EventHandler<MouseEvent>,

  // Selection Events
  onSelect: (() => {}) as EventHandler<Event>,

  // Touch Events
  onTouchCancel: (() => {}) as EventHandler<TouchEvent>,
  onTouchEnd: (() => {}) as EventHandler<TouchEvent>,
  onTouchMove: (() => {}) as EventHandler<TouchEvent>,
  onTouchStart: (() => {}) as EventHandler<TouchEvent>,

  // Pointer Events
  onPointerDown: (() => {}) as EventHandler<PointerEvent>,
  onPointerMove: (() => {}) as EventHandler<PointerEvent>,
  onPointerUp: (() => {}) as EventHandler<PointerEvent>,
  onPointerCancel: (() => {}) as EventHandler<PointerEvent>,
  onPointerEnter: (() => {}) as EventHandler<PointerEvent>,
  onPointerLeave: (() => {}) as EventHandler<PointerEvent>,
  onPointerOver: (() => {}) as EventHandler<PointerEvent>,
  onPointerOut: (() => {}) as EventHandler<PointerEvent>,

  // UI Events
  onScroll: (() => {}) as EventHandler<UIEvent>,

  // Wheel Events
  onWheel: (() => {}) as EventHandler<WheelEvent>,

  // Animation Events
  onAnimationStart: (() => {}) as EventHandler<AnimationEvent>,
  onAnimationEnd: (() => {}) as EventHandler<AnimationEvent>,
  onAnimationIteration: (() => {}) as EventHandler<AnimationEvent>,

  // Transition Events
  onTransitionEnd: (() => {}) as EventHandler<TransitionEvent>,

};
