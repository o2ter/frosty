//
//  awaited.ts
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
import { reconciler } from '../reconciler';
import { _useMemo } from '../reconciler/hooks';

const resolved = new WeakMap<PromiseLike<any>, { result?: any; error?: any; }>();

/**
 * Eagerly resolves a promise returned by the factory function and caches its result or error.
 *
 * This hook ensures the promise settles before rendering completes. If the promise is still pending,
 * it returns `undefined` and schedules an immediate rerender of the current component. Once resolved, it returns the value.
 * If rejected, it throws the error.
 *
 * #### Usage
 * ```typescript
 * const data = useAwaited(() => fetchData(id), [id]);
 * ```
 *
 * #### Parameters
 * - `factory`: `() => PromiseLike<T>`  
 *   A function that returns a promise to resolve.
 * - `deps` (optional): `any`  
 *   Dependency array for memoization. The promise is recreated when dependencies change.
 *
 * #### Returns
 * - `T | undefined`  
 *   The resolved value, once available. Returns `undefined` while the promise is pending.
 * - Throws the rejection error if the promise fails.
 *
 * #### Throws
 * - Error if used outside a render function.
 * - The rejection error if the promise fails.
 *
 * @template T Type of the resolved value.
 */
export const useAwaited = <T>(
  factory: () => PromiseLike<T>,
  deps?: any,
): T | undefined => {
  const state = reconciler.currentHookState;
  if (!state) throw Error('useAwaited must be used within a render function.');
  const promise = _useMemo('useAwaited', () => factory(), deps ?? null);
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