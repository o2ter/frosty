//
//  window.ts
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
import { useSyncExternalStore } from '../core/hooks/sync';
import { uniqueId } from '../core/utils';
import { reconciler } from '../core/reconciler/state';
import { _DOMRenderer } from '../renderer/common';

const colorSchemeDark = typeof window !== 'undefined' ? window.matchMedia?.('(prefers-color-scheme: dark)') : undefined;

export const useWindow = () => {
  const state = reconciler.currentHookState;
  if (!state) throw Error('useWindow must be used within a render function.');
  if (state.renderer instanceof _DOMRenderer) {
    return state.renderer.window;
  } else {
    throw Error('Unsupported renderer.');
  }
}

const emptyInsets = { top: 0, left: 0, right: 0, bottom: 0 };
const safeAreaInsets = () => {
  let support;
  if (!('CSS' in window) || typeof CSS.supports != 'function') {
    return emptyInsets;
  }
  if (CSS.supports('top: env(safe-area-inset-top)')) {
    support = 'env'
  } else if (CSS.supports('top: constant(safe-area-inset-top)')) {
    support = 'constant'
  } else {
    return emptyInsets;
  }
  const id = uniqueId();
  const style = document.createElement('style');
  style.textContent = `:root {
    --${id}-top: ${support}(safe-area-inset-top);
    --${id}-left: ${support}(safe-area-inset-left);
    --${id}-right: ${support}(safe-area-inset-right);
    --${id}-bottom: ${support}(safe-area-inset-bottom);
  }`;
  document.head.appendChild(style);
  const computedStyle = getComputedStyle(document.documentElement);
  const insets = {
    top: computedStyle.getPropertyValue(`--${id}-top`),
    left: computedStyle.getPropertyValue(`--${id}-left`),
    right: computedStyle.getPropertyValue(`--${id}-right`),
    bottom: computedStyle.getPropertyValue(`--${id}-bottom`),
  };
  style.remove();
  return _.mapValues(insets, v => parseFloat(v));
}

export const useWindowMetrics = () => useSyncExternalStore((onStoreChange) => {
  window.addEventListener('resize', onStoreChange);
  return () => {
    window.removeEventListener('resize', onStoreChange);
  };
}, () => ({
  safeAreaInsets: safeAreaInsets(),
  devicePixelRatio: window.devicePixelRatio,
  outerWidth: window.outerWidth,
  outerHeight: window.outerHeight,
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
}), () => ({
  safeAreaInsets: emptyInsets,
  devicePixelRatio: 1,
  outerWidth: 0,
  outerHeight: 0,
  innerWidth: 0,
  innerHeight: 0,
}));

export const useWindowScroll = () => useSyncExternalStore((onStoreChange) => {
  window.addEventListener('scroll', onStoreChange);
  return () => {
    window.removeEventListener('scroll', onStoreChange);
  };
}, () => ({
  scrollX: window.scrollX,
  scrollY: window.scrollY,
}), () => ({
  scrollX: 0,
  scrollY: 0,
}));

export const useColorScheme = () => useSyncExternalStore((onStoreChange) => {
  colorSchemeDark?.addEventListener('change', onStoreChange);
  return () => {
    colorSchemeDark?.removeEventListener('change', onStoreChange);
  };
}, () => colorSchemeDark?.matches ? 'dark' : 'light', () => 'light');
