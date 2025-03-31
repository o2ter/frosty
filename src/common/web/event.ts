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
  onCopy: ClipboardEvent,
  onCut: ClipboardEvent,
  onPaste: ClipboardEvent,

  // Composition Events
  onCompositionEnd: CompositionEvent,
  onCompositionStart: CompositionEvent,
  onCompositionUpdate: CompositionEvent,

  // Focus Events
  onFocus: FocusEvent,
  onBlur: FocusEvent,

  // Form Events
  onFormData: FormDataEvent,
  onChange: Event,
  onBeforeInput: InputEvent,
  onInput: Event,
  onReset: Event,
  onSubmit: SubmitEvent,
  onInvalid: Event,

  // Image Events
  onLoad: Event,
  onError: Event,

  // Keyboard Events
  onKeyDown: KeyboardEvent,
  /** @deprecated */
  onKeyPress: KeyboardEvent,
  /** @deprecated */
  onKeyUp: KeyboardEvent,

  // Media Events
  onAbort: Event,
  onCanPlay: Event,
  onCanPlayThrough: Event,
  onDurationChange: Event,
  onEmptied: Event,
  onEncrypted: Event,
  onEnded: Event,
  onLoadedData: Event,
  onLoadedMetadata: Event,
  onLoadStart: Event,
  onPause: Event,
  onPlay: Event,
  onPlaying: Event,
  onProgress: Event,
  onRateChange: Event,
  onResize: Event,
  onSeeked: Event,
  onSeeking: Event,
  onStalled: Event,
  onSuspend: Event,
  onTimeUpdate: Event,
  onVolumeChange: Event,
  onWaiting: Event,

  // MouseEvents
  onAuxClick: MouseEvent,
  onClick: MouseEvent,
  onContextMenu: MouseEvent,
  onDoubleClick: MouseEvent,
  onDrag: DragEvent,
  onDragEnd: DragEvent,
  onDragEnter: DragEvent,
  onDragExit: DragEvent,
  onDragLeave: DragEvent,
  onDragOver: DragEvent,
  onDragStart: DragEvent,
  onDrop: DragEvent,
  onMouseDown: MouseEvent,
  onMouseEnter: MouseEvent,
  onMouseLeave: MouseEvent,
  onMouseMove: MouseEvent,
  onMouseOut: MouseEvent,
  onMouseOver: MouseEvent,
  onMouseUp: MouseEvent,

  // Selection Events
  onSelect: Event,

  // Touch Events
  onTouchCancel: TouchEvent,
  onTouchEnd: TouchEvent,
  onTouchMove: TouchEvent,
  onTouchStart: TouchEvent,

  // Pointer Events
  onPointerDown: PointerEvent,
  onPointerMove: PointerEvent,
  onPointerUp: PointerEvent,
  onPointerCancel: PointerEvent,
  onPointerEnter: PointerEvent,
  onPointerLeave: PointerEvent,
  onPointerOver: PointerEvent,
  onPointerOut: PointerEvent,

  // UI Events
  onScroll: UIEvent,

  // Wheel Events
  onWheel: WheelEvent,

  // Animation Events
  onAnimationStart: AnimationEvent,
  onAnimationEnd: AnimationEvent,
  onAnimationIteration: AnimationEvent,

  // Transition Events
  onTransitionEnd: TransitionEvent,

} as const;
