//
//  signal.ts
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
import { reconciler } from '../../reconciler/reconciler';
import { Signal } from '../types/signal';
import { _useEffect } from '../../reconciler/hooks';

export const useSignal = <T, R = T>(
  signal: Signal<T>,
  selector: (state: T) => R = v => v as any
) => {
  if (reconciler.registry.get(signal) !== 'SIGNAL') throw Error(`Invalid type of ${signal}`);
  const state = reconciler.currentHookState;
  if (!state) throw Error('useSignal must be used within a render function.');
  const { onStateChange } = state;
  _useEffect('useSignal', () => signal.subscribe((oldVal, newVal) => {
    if (_.isEqual(selector(oldVal), selector(newVal))) onStateChange();
  }), null);
  return selector(signal.value);
}
