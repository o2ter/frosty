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
import { _useMemo } from '../reconciler/hooks';

/**
 * A hook that memoizes a callback function, ensuring that it only changes
 * if its dependencies change. This is useful for optimizing performance by preventing
 * unnecessary re-creations of functions.
 *
 * @template T - The type of the callback function.
 * @param callback - The callback function to be memoized.
 * @param deps - An optional dependencies. If provided, the callback
 *               will only be updated when one of these dependencies changes.
 *               If not provided, the callback will remain stable.
 * @returns - A stable version of the callback function that will not change unless
 *            its dependencies change.
 *
 * @example
 * const memoizedCallback = useCallback(() => {
 *   console.log('This function is memoized!');
 * }, [dependency]);
 */

export function useCallback<T extends (...args: any) => any>(
  callback: T,
  deps?: any
): T;

export function useCallback<T extends ((...args: any) => any) | _.Falsey>(
  callback: T,
  deps?: any
): T;

export function useCallback<T extends ((...args: any) => any) | _.Falsey>(
  callback: T,
  deps?: any
): T {
  if (!_.isUndefined(deps)) return _useMemo('useCallback', () => callback, deps);
  const store = _useMemo('useCallback', () => {
    const store = {
      current: callback,
      stable: (...args: any) => {
        if (store.current) return store.current(...args);
      },
    };
    return store;
  }, null);
  if (callback) store.current = callback;
  return callback && (store.stable as T);
}
