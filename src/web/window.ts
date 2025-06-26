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

const prefersColorScheme = typeof window !== 'undefined' ? window.matchMedia?.('(prefers-color-scheme: dark)') : undefined;

export const useWindowMetrics = () => useSyncExternalStore((onStoreChange) => {
  window.addEventListener('resize', onStoreChange);
  window.addEventListener('scroll', onStoreChange);
  prefersColorScheme?.addEventListener('change', onStoreChange);
  return () => {
    window.removeEventListener('resize', onStoreChange);
    window.removeEventListener('scroll', onStoreChange);
    prefersColorScheme?.removeEventListener('change', onStoreChange);
  };
}, () => ({
  colorScheme: prefersColorScheme?.matches ? 'dark' : 'light',
  devicePixelRatio: window.devicePixelRatio,
  outerWidth: window.outerWidth,
  outerHeight: window.outerHeight,
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  screenX: window.screenX,
  screenY: window.screenY,
  scrollX: window.scrollX,
  scrollY: window.scrollY,
}), () => ({
  colorScheme: 'light',
  devicePixelRatio: 1,
  outerWidth: 0,
  outerHeight: 0,
  innerWidth: 0,
  innerHeight: 0,
  screenX: 0,
  screenY: 0,
  scrollX: 0,
  scrollY: 0,
}));