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

import { Context } from '../common/types/context';

class ReconcilerContext {

  dispose: (() => void)[] = [];
  context = new WeakMap<Context<any>, any>();

  subscriber: () => void;

  constructor(subscriber: () => void) {
    this.subscriber = subscriber;
  }
}
class Reconciler {

  private _registry = new WeakMap<any, string>();
  private _contextDefaultValue = new WeakMap<Context<any>, any>();

  private _currentContext: ReconcilerContext | undefined;

  get registry() {
    return this._registry;
  }

  get contextDefaultValue() {
    return this._contextDefaultValue;
  }

  get currentContext() {
    return this._currentContext;
  }
}

export const reconciler = new Reconciler;

export const _effect = (
  callback: (onStoreChange: () => void) => () => void
) => {
  if (!reconciler.currentContext) return;
  const { subscriber, dispose } = reconciler.currentContext;
  dispose.push(callback(subscriber));
};

export const _useEffect = (
  effect: () => () => void,
  deps?: any[]
) => {
  if (!reconciler.currentContext) throw Error('Hook must be used within a render function.');
};
