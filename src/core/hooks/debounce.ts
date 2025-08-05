//
//  debounce.ts
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

const debounce = <T extends (...args: any) => any>(
  callback: T,
  settings: _.DebounceSettings & { wait?: number; },
) => {
  const { wait, ...options } = settings;
  return _.debounce(callback, wait, {
    ...options,
    leading: 'leading' in options ? !!options.leading : true,
    trailing: 'trailing' in options ? !!options.trailing : true,
  });
}

const asyncDebounce = <T extends (...args: any) => PromiseLike<any>>(
  func: T,
  settings: _.DebounceSettings & { wait?: number; },
) => {

  type R = T extends (...args: any) => PromiseLike<infer R> ? R : never;
  let preflight: Promise<R>;

  const debounced = debounce(async (
    resolve?: (value: PromiseLike<R>) => void,
    ...args: Parameters<T>
  ) => {
    const result = func(...args as any) as PromiseLike<R>;
    if (_.isFunction(resolve)) resolve(result);
    return result;
  }, settings);

  return (...args: Parameters<T>) => {
    if (_.isNil(preflight)) {
      preflight = new Promise<R>(r => debounced(r, ...args));
      return preflight;
    }
    return debounced(undefined, ...args) ?? preflight;
  };
};

/**
 * A hook that creates a debounced version of a function.
 * The debounced function delays invoking the callback until after
 * the specified wait time has elapsed since the last time it was called.
 * 
 * This is useful for optimizing performance in scenarios where frequent
 * function calls (e.g., during user input or window resizing) can be expensive.
 * 
 * @template T The type of the callback function.
 * @param callback The function to debounce.
 * @param settings Configuration options for debouncing, including:
 *   - `wait` (number): The number of milliseconds to delay.
 *   - Other lodash debounce options such as `leading` and `trailing`.
 * @returns A debounced version of the callback function.
 */
export const useDebounce = <T extends (...args: any) => any>(
  callback: T,
  settings: _.DebounceSettings & { wait?: number; },
) => {
  const store = _useMemo('useDebounce', () => {
    const store = {
      current: callback,
      stable: debounce((function (this: any, ...args) {
        return store.current.call(this, ...args);
      }) as T, settings),
    };
    return store;
  }, null);
  store.current = callback;
  return store.stable;
}

/**
 * A hook that creates a debounced version of an asynchronous function.
 * The debounced function delays invoking the callback until after
 * the specified wait time has elapsed since the last time it was called.
 * 
 * This is particularly useful for scenarios where frequent API calls
 * or other asynchronous operations need to be throttled to improve performance.
 * 
 * @template T The type of the asynchronous callback function.
 * @param callback The asynchronous function to debounce.
 * @param settings Configuration options for debouncing, including:
 *   - `wait` (number): The number of milliseconds to delay.
 *   - Other lodash debounce options such as `leading` and `trailing`.
 * @returns A debounced version of the asynchronous callback function.
 */
export const useAsyncDebounce = <T extends (...args: any) => PromiseLike<any>>(
  callback: T,
  settings: _.DebounceSettings & { wait?: number; },
) => {
  const store = _useMemo('useAsyncDebounce', () => {
    const store = {
      current: callback,
      stable: asyncDebounce((function (this: any, ...args) {
        return store.current.call(this, ...args);
      }) as T, settings),
    };
    return store;
  }, null);
  store.current = callback;
  return store.stable;
}
