//
//  asyncEager.ts
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
import { reconciler } from '../reconciler/state';
import { _useMemo } from '../reconciler/hooks';

const resolved = new WeakMap<PromiseLike<any>, { result?: any; error?: any; }>();

/**
 * Eagerly resolves a promise returned by the factory function and caches its result or error.
 *
 * - If the promise resolves, returns the resolved value.
 * - If the promise rejects, throws the error.
 * - If the promise is still pending, schedules its resolution and returns `undefined`.
 * - The renderer will wait for the promise to settle within a single render cycle,
 *   ensuring that the result or error is available before the next render.
 *
 * **Usage Notes:**
 * - Must be called inside a render function (e.g., within a component).
 * - The promise is memoized based on the provided dependencies.
 * - The result or error is cached for the lifetime of the promise instance.
 *
 * @template T Type of the resolved value.
 * @param factory Function returning a Promise-like object to resolve.
 * @param deps Optional dependencies array for memoization. The promise is recreated if dependencies change.
 * @returns The resolved value of the promise, or throws the error if rejected.
 *          Returns `undefined` while the promise is pending.
 * @throws Error if used outside a render function, or if the promise rejects.
 */
export const useAsyncEager = <T>(
  factory: () => PromiseLike<T>,
  deps?: any,
) => {
  const state = reconciler.currentHookState;
  if (!state) throw Error('useAsyncEager must be used within a render function.');
  const promise = _useMemo('useAsyncEager', () => factory(), deps);
  if (resolved.has(promise)) {
    const { result, error } = resolved.get(promise) ?? {};
    if (error) throw error;
    return result;
  }
  state.tasks.push((async () => {
    try {
      const result = await promise;
      resolved.set(promise, { result });
    } catch (error) {
      resolved.set(promise, { error });
    }
  })());
}