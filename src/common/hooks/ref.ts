//
//  memo.ts
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
import { _useEffect, _useMemo } from '../../reconciler/hooks';
import { Ref, RefObject } from '../types/common';

export function useRef<T>(initialValue: T): RefObject<T>;
export function useRef<T = undefined>(): RefObject<T | undefined>;

export function useRef(initialValue?: any) {
  return _useMemo('useRef', () => ({ current: initialValue }), null);
}

export const useRefHandle = <T, R extends T>(
  ref: Ref<T> | undefined,
  init: () => R,
  deps?: any
) => _useEffect('useRefHandle', () => {
  try {
    if (ref) {
      const _ref = init();
      if (typeof ref === 'function') ref(_ref);
      else if (typeof ref === 'object') ref.current = _ref;
    }
    return () => void 0;
  } catch (e) {
    console.error(e);
    return () => void 0;
  }
}, deps);