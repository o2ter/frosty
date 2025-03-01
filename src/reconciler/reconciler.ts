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
import { ComponentNode } from '../common/types/component';
import _ from 'lodash';

class ReconcilerContext {

  dispose: (() => void)[] = [];
  context = new WeakMap<Context<any>, any>();

  subscriber: () => void;

  constructor(subscriber: () => void) {
    this.subscriber = subscriber;
  }
}

class VNode {

  _component: ComponentNode;

  _parent?: VNode;
  _children: VNode[] = [];

  constructor(component: ComponentNode) {
    this._component = component;
  }
}

export const reconciler = new class {

  /** @internal */
  _registry = new WeakMap<any, string>();

  /** @internal */
  _contextDefaultValue = new WeakMap<Context<any>, any>();

  /** @internal */
  _currentContext: ReconcilerContext | undefined;

  get registry() {
    return this._registry;
  }

  get contextDefaultValue() {
    return this._contextDefaultValue;
  }

  get currentContext() {
    return this._currentContext;
  }

  static equal(a: any, b: any) {
    return _.isEqualWith(a, b, (a, b) => {
      const _a = _.isFunction(a);
      const _b = _.isFunction(b);
      return _a || _b ? _a && _b : undefined
    })
  }
};
