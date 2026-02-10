//
//  storage.ts
//
//  The MIT License
//  Copyright (c) 2021 - 2026 O2ter Limited. All rights reserved.
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

const storage = new WeakMap<any, Map<any, any>>();

/**
 * Returns a persistent storage Map associated with the current renderer instance.
 * This hook allows components to store and retrieve values that persist across renders,
 * scoped to the renderer. Must be called within a render function.
 *
 * @throws Error if called outside of a render function.
 * @returns {Map<any, any>} The storage map for the current renderer.
 */
export const useRendererStorage = (
  persist = true
) => {
  const state = reconciler.currentHookState;
  if (!state) throw Error('useRendererStorage must be used within a render function.');
  if (!persist) return state.renderer.renderStorage;
  const found = storage.get(state.renderer);
  const store = found ?? new Map<any, any>();
  if (!found) storage.set(state.renderer, store);
  return store;
};
