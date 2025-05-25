//
//  effect.ts
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
import { Awaitable } from '@o2ter/utils-js';
import { _useEffect } from '../reconciler/hooks';

/**
 * A hook that manages side effects with support for an `AbortSignal`.
 * It ensures proper cleanup logic and handles asynchronous operations effectively.
 *
 * @param effect - 
 *   A function that receives an `AbortSignal` and performs side effects. 
 *   It can optionally return a cleanup function or a promise that resolves to a cleanup function.
 *
 * @param deps - 
 *   An optional dependencies that determines when the effect should be re-executed.
 *
 * @example
 * useEffect((signal) => {
  *   fetch('/api/data', { signal })
 *     .then(response => response.json())
 *     .then(data => console.log(data))
 *     .catch(err => {
 *       if (err.name === 'AbortError') {
 *         console.log('Fetch aborted');
 *       } else {
 *         console.error(err);
 *       }
 *     });
 *   
 *   return () => {
 *     console.log('Cleanup logic here');
 *   };
 * }, []);
 */
export const useEffect = (
  effect: (
    signal: AbortSignal,
  ) => Awaitable<void | (() => Awaitable<void>)>,
  deps?: any,
) => _useEffect('useEffect', () => {
  const abort = new AbortController();
  try {
    const destructor = effect(abort.signal);
    return () => {
      abort.abort();
      (async () => {
        try {
          const _destructor = await destructor;
          if (_.isFunction(_destructor)) _destructor();
        } catch (e) {
          console.error(e);
        }
      })();
    };
  } catch (e) {
    console.error(e);
    return () => abort.abort();
  }
}, deps);