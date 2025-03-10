//
//  index.ts
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
import { reconciler } from '../../reconciler/state';
import { SetStateAction } from './basic';

export type Signal<Value> = ReturnType<typeof _createSignal<Value>>;
export type SignalType<S extends Signal<any>> = S extends Signal<infer T> ? T : never;

const _createSignal = <T>(initialValue: T) => {
  const listeners = new Set<(oldVal: T, newVal: T) => void>();
  let current = initialValue;
  const write = (value: SetStateAction<T>) => {
    const oldVal = current;
    current = _.isFunction(value) ? value(current) : value;
    listeners.forEach(listener => void listener(oldVal, current));
  };
  const subscribe = (callback: (oldVal: T, newVal: T) => void) => {
    listeners.add(callback);
    return () => void listeners.delete(callback);
  };
  const signal = {
    get value() { return current; },
    get setValue() { return write; },
    get subscribe() { return subscribe; },
  };
  reconciler.registry.set(signal, 'SIGNAL');
  return signal;
}

export function createSignal<Value>(initialValue: Value): Signal<Value>;
export function createSignal<Value = undefined>(): Signal<Value | undefined>;

export function createSignal(initialValue?: any) {
  return _createSignal(initialValue);
}
